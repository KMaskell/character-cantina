import { useQuery } from '@tanstack/react-query';
import { Character } from '../types/Characters';

const fetchCharacterDetails = async (id: string): Promise<Character> => {
  if (!id) {
    throw new Error('Character ID is required');
  }

  const response = await fetch(`https://swapi.dev/api/people/${id}/`);

  if (!response.ok) {
    throw new Error('Failed to fetch character details');
  }

  return response.json();
};

const useGetCharacterDetails = (id: string) => {
  const { data, isError, isLoading, error } = useQuery({
    queryKey: ['character', id],
    queryFn: () => fetchCharacterDetails(id),
    enabled: !!id,
  });

  return { data, isError, isLoading, error };
};

export default useGetCharacterDetails;

