import { useQuery } from '@tanstack/react-query';
import { Homeworld } from '../types/Homeworlds';

const fetchHomeworld = async (url: string): Promise<Homeworld> => {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error('Failed to fetch homeworld');
  }

  return response.json();
};

const useGetHomeworld = (homeworldUrl: string) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['homeworld', homeworldUrl],
    queryFn: () => fetchHomeworld(homeworldUrl),
    enabled: !!homeworldUrl,
  });

  return { homeworld: data, isError, isLoading };
};

export default useGetHomeworld;
