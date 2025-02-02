import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import CharacterNotFound from './CharacterNotFound';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('CharacterNotFound', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders error message and button', () => {
    render(
      <MemoryRouter>
        <CharacterNotFound />
      </MemoryRouter>,
    );

    expect(screen.getByText('Character not found')).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /go back home/i }),
    ).toBeInTheDocument();
  });

  test('navigates home when button is clicked', () => {
    render(
      <MemoryRouter>
        <CharacterNotFound />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole('button', { name: /go back home/i }));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
