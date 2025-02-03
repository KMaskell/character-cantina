import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Starships from './Starships';
import useGetStarships from '../../hooks/useGetStarships';

jest.mock('../../hooks/useGetStarships');

describe('Starships Component', () => {
  const mockStarships = [
    'Millennium Falcon',
    'X-Wing Starfighter',
    'TIE Fighter',
    'Death Star',
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders a loading spinner when starships data is loading', () => {
    (useGetStarships as jest.Mock).mockReturnValue({
      starships: null,
      isError: false,
      isLoading: true,
    });

    render(<Starships urls={['url1', 'url2']} />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('renders an error badge when there is an error loading starships data', () => {
    (useGetStarships as jest.Mock).mockReturnValue({
      starships: null,
      isError: true,
      isLoading: false,
    });

    render(<Starships urls={['url1', 'url2']} />);

    expect(screen.getByText(/Error loading starships/i)).toBeInTheDocument();
  });

  test('renders a list of starships when starships data is successfully loaded', async () => {
    (useGetStarships as jest.Mock).mockReturnValue({
      starships: mockStarships,
      isError: false,
      isLoading: false,
    });

    render(<Starships urls={['url1', 'url2']} />);

    await waitFor(() => {
      expect(screen.getByText('Millennium Falcon')).toBeInTheDocument();
      expect(screen.getByText('X-Wing Starfighter')).toBeInTheDocument();
      expect(screen.getByText('TIE Fighter')).toBeInTheDocument();
      expect(screen.getByText('Death Star')).toBeInTheDocument();
    });
  });

  test('does not render starships when the starships array is empty', () => {
    (useGetStarships as jest.Mock).mockReturnValue({
      starships: [],
      isError: false,
      isLoading: false,
    });

    render(<Starships urls={['url1', 'url2']} />);

    expect(screen.queryByText('Millennium Falcon')).not.toBeInTheDocument();
  });
});
