import { useQuery } from '@tanstack/react-query';

const fetchStarships = async (starshipUrls: string[]): Promise<string[]> => {
  const responses = await Promise.all(
    starshipUrls.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch starship');
      }
      const data = await response.json();
      return data.name;
    })
  );

  return responses;
};

const useGetStarships = (starshipUrls: string[]) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['starships', starshipUrls],
    queryFn: () => fetchStarships(starshipUrls),
    enabled: starshipUrls.length > 0,
  });

  return { starships: data, isError, isLoading };
};

export default useGetStarships;
