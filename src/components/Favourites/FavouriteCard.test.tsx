import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import FavouriteCard from './FavouriteCard';

jest.mock('../Homeworld', () => ({
  __esModule: true,
  default: ({ url }: { url: string }) => (
    <div data-testid="homeworld">{url}</div>
  ),
}));

describe('FavouriteCard', () => {
  const mockOnRemove = jest.fn();
  const mockProps = {
    name: 'Luke Skywalker',
    height: '172',
    gender: 'male',
    homeworld: 'https://swapi.dev/api/planets/1/',
    onRemove: mockOnRemove,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders character details correctly', () => {
    render(<FavouriteCard {...mockProps} />);

    expect(screen.getByText('Luke Skywalker')).toBeVisible();
    expect(screen.getByText('Gender:')).toBeVisible();
    expect(screen.getByText('Male')).toBeVisible();
    expect(screen.getByText('Height:')).toBeVisible();
    expect(screen.getByText(`5'8" (172cm)`)).toBeVisible();
    expect(screen.getByText('Homeworld:')).toBeVisible();
    expect(screen.getByTestId('homeworld')).toBeVisible();
  });

  test('calls onRemove when the remove button is clicked', () => {
    render(<FavouriteCard {...mockProps} />);
    fireEvent.click(
      screen.getByRole('button', { name: /remove from favourites/i }),
    );
    expect(mockOnRemove).toHaveBeenCalledTimes(1);
  });
});
