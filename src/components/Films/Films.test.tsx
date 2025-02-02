import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Films from './Films';
import useGetFilms from '../../hooks/useGetFilms';

jest.mock('../../hooks/useGetFilms');

describe('Films Component', () => {
  const mockFilms = [
    'A New Hope',
    'The Empire Strikes Back',
    'Return of the Jedi',
    'Revenge of the Sith',
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders a loading spinner when film data is loading', () => {
    (useGetFilms as jest.Mock).mockReturnValue({
      films: null,
      isError: false,
      isLoading: true,
    });
    render(<Films urls={['url1', 'url2']} />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('renders an error badge when there is an error loading film data', () => {
    (useGetFilms as jest.Mock).mockReturnValue({
      films: null,
      isError: true,
      isLoading: false,
    });
    render(<Films urls={['url1', 'url2']} />);

    expect(screen.getByText(/Error loading films/i)).toBeInTheDocument();
  });

  test('renders a list of films when films are successfully loaded', async () => {
    (useGetFilms as jest.Mock).mockReturnValue({
      films: mockFilms,
      isError: false,
      isLoading: false,
    });
    render(<Films urls={['url1', 'url2']} />);

    await waitFor(() => {
      expect(screen.getByText('A New Hope')).toBeInTheDocument();
      expect(screen.getByText('The Empire Strikes Back')).toBeInTheDocument();
      expect(screen.getByText('Return of the Jedi')).toBeInTheDocument();
      expect(screen.getByText('Revenge of the Sith')).toBeInTheDocument();
    });
  });

  test('does not render films when films array is empty', () => {
    (useGetFilms as jest.Mock).mockReturnValue({
      films: [],
      isError: false,
      isLoading: false,
    });
    render(<Films urls={['url1', 'url2']} />);

    expect(screen.queryByText('A New Hope')).not.toBeInTheDocument();
  });
});
