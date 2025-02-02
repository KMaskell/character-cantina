import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CharacterTable from './CharacterTable';
import mockCharacters from '../../tests/mockData/Character.json';

jest.mock('../Homeworld/Homeworld', () => ({
  __esModule: true,
  default: ({ url }: { url: string }) => (
    <div data-testid="homeworld">{url}</div>
  ),
}));

describe('CharacterTable', () => {
  const mockOnCharacterClick = jest.fn();
  const characters = mockCharacters;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders table headers correctly', () => {
    render(
      <CharacterTable
        characters={characters}
        onCharacterClick={mockOnCharacterClick}
      />,
    );

    expect(screen.getByText('Name')).toBeVisible();
    expect(screen.getByText('Gender')).toBeVisible();
    expect(screen.getByText('Homeworld')).toBeVisible();
  });

  test('renders character data correctly', () => {
    render(
      <CharacterTable
        characters={characters}
        onCharacterClick={mockOnCharacterClick}
      />,
    );

    expect(screen.getByText('Luke Skywalker')).toBeVisible();
    expect(screen.getByText('Male')).toBeVisible();
    expect(screen.getByTestId('homeworld')).toBeVisible();
  });

  test('calls onCharacterClick with correct URL when row is clicked', () => {
    render(
      <CharacterTable
        characters={characters}
        onCharacterClick={mockOnCharacterClick}
      />,
    );

    fireEvent.click(screen.getByText('Luke Skywalker'));
    expect(mockOnCharacterClick).toHaveBeenCalledWith(characters[0].url);
  });

  test('does not render table when no characters provided', () => {
    render(
      <CharacterTable
        characters={[]}
        onCharacterClick={mockOnCharacterClick}
      />,
    );

    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
  });

  test('renders multiple characters when provided', () => {
    const multipleCharacters = [
      characters[0],
      {
        ...characters[0],
        name: 'Leia Organa',
        url: 'https://swapi.dev/api/people/2/',
      },
    ];

    render(
      <CharacterTable
        characters={multipleCharacters}
        onCharacterClick={mockOnCharacterClick}
      />,
    );

    expect(screen.getByText('Luke Skywalker')).toBeVisible();
    expect(screen.getByText('Leia Organa')).toBeVisible();
  });
});
