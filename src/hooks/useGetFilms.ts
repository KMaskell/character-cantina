import { useQuery } from '@tanstack/react-query';

const fetchFilms = async (filmUrls: string[]): Promise<string[]> => {
  const responses = await Promise.all(
    filmUrls.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch films');
      }
      
      const data = await response.json();
      return data.title;
    })
  );

  return responses;
};

const useGetFilms = (filmUrls: string[]) => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ['films', filmUrls],
    queryFn: () => fetchFilms(filmUrls),
    enabled: filmUrls.length > 0,
  });

  return { films: data, isError, isLoading };
};

export default useGetFilms;
