import { useQuery } from '@tanstack/react-query';

const fetchFilms = async (filmUrls: string[]): Promise<{ title?: string; error?: string }[]> => {
  const responses = await Promise.allSettled(
    filmUrls.map(async (url) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch film from ${url}`);
      }
      const data = await response.json();
      return { title: data.title };
    })
  );

  return responses.map((result) =>
    result.status === 'fulfilled' ? result.value : { error: result.reason.message }
  );
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
