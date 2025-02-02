import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Homeworld from './Homeworld';
import useGetHomeworld from '../../hooks/useGetHomeworld';

jest.mock('../../hooks/useGetHomeworld');

describe('Homeworld Component', () => {
  const mockHomeworld = {
    name: 'Tatooine',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders a loading spinner when homeworld data is loading', () => {
    (useGetHomeworld as jest.Mock).mockReturnValue({
      homeworld: null,
      isError: false,
      isLoading: true,
    });

    render(<Homeworld url="url1" />);

    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
  });

  test('renders an error badge when there is an error loading homeworld data', () => {
    (useGetHomeworld as jest.Mock).mockReturnValue({
      homeworld: null,
      isError: true,
      isLoading: false,
    });

    render(<Homeworld url="url1" />);

    expect(screen.getByText(/Error loading homeworld/i)).toBeInTheDocument();
  });

  test('renders homeworld name when data is successfully loaded', async () => {
    (useGetHomeworld as jest.Mock).mockReturnValue({
      homeworld: mockHomeworld,
      isError: false,
      isLoading: false,
    });

    render(<Homeworld url="url1" />);

    await waitFor(() => {
      expect(screen.getByText(mockHomeworld.name)).toBeInTheDocument();
    });
  });

  test('renders "Unknown" when homeworld name is not available', async () => {
    (useGetHomeworld as jest.Mock).mockReturnValue({
      homeworld: {},
      isError: false,
      isLoading: false,
    });

    render(<Homeworld url="url1" />);

    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });
});
