import { useQuery } from '@tanstack/react-query';
import { Character } from '../types/Characters';

type CharacterResponse = {
  count: number; 
  next: string | null;
  previous: string | null; 
  results: Character[];
};

const fetchCharacters = async (page: number, limit: number): Promise<CharacterResponse> => {
  const response = await fetch(
    `https://swapi.dev/api/people/?page=${page}&limit=${limit}`
  );

  if (!response.ok) {
    throw new Error('Failed to fetch characters')
  }
  return response.json()
};

const useGetCharacters = (page: number, limit: number) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['characters', page, limit],
    queryFn: () => fetchCharacters(page, limit),
  });

  return { data, isError, isLoading };
};

export default useGetCharacters;

