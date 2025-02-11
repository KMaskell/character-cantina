import {
  MemoryRouter,
  MemoryRouterProps,
  Route,
  Routes,
} from 'react-router-dom';
import CharacterDetails from './CharacterDetails';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FC, PropsWithChildren, ReactNode } from 'react';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import Character from '../../tests/mockData/Character.json';

const CharacterUrl = 'https://swapi.dev/api/people/1';
const handlers = [
  http.get(CharacterUrl, () => {
    return HttpResponse.json(Character[0]);
  }),
];
export const server = setupServer(...handlers);
console.warn = jest.fn(); // for the missing handlers

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

type Props = {
  memoryProps: MemoryRouterProps;
};
const ProviderWrapper: FC<PropsWithChildren<Props>> = ({
  children,
  memoryProps,
}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter {...memoryProps}>{children}</MemoryRouter>
    </QueryClientProvider>
  );
};

export const buildProvider =
  (props: Props) =>
  ({ children }: { children: ReactNode | undefined }) => (
    <ProviderWrapper {...props}>{children}</ProviderWrapper>
  );

const renderComponent = () =>
  render(
    <Routes>
      <Route path="/character-details/:id" element={<CharacterDetails />} />
    </Routes>,
    {
      wrapper: buildProvider({
        memoryProps: { initialEntries: ['/character-details/1'] },
      }),
    },
  );
beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
});
afterAll(() => server.close());

describe('CharacterDetails', () => {
  it('should render Loading when the API request has been made', async () => {
    renderComponent();

    expect(screen.getByText(/Loading character details.../i)).toBeVisible();
  });

  it('should render CharacterNotFound when the api request errors', async () => {
    server.use(
      http.get(
        CharacterUrl,
        async () =>
          new HttpResponse(null, {
            status: 404,
            statusText: 'Server Error',
          }),
      ),
    );

    renderComponent();

    expect(await screen.findByText(/Character not found/i)).toBeVisible();
    expect(
      await screen.findByRole('button', { name: 'Go Back Home' }),
    ).toBeVisible();
  });

  it('should render the character details when the API request is successful', async () => {
    renderComponent();

    expect(
      await screen.findByRole('heading', { level: 1, name: 'Luke Skywalker' }),
    ).toBeVisible();
  });

  it('should render CharacterNotFound when the character is not found', async () => {
    server.use(
      http.get(
        CharacterUrl,
        async () =>
          new HttpResponse(null, {
            status: 404,
            statusText: 'Character not found',
          }),
      ),
    );

    renderComponent();

    // add async expect here for character not found
  });
});
