import axiosInstance from './fetcher';
import useSWR from 'swr';


export const useMovie = (name, page) => {
    const { data, error , isLoading } = useSWR(`?s=${name}&apikey=5fa31615&type=movie&page=${page}`, axiosInstance, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
      });


    return {
        movies: data ? data.data : [],
        isLoading,
        isError: error
    }
    
}

export const useMovieById = (id) => {
    const { data, error, isLoading } = useSWR(`?i=${id}&apikey=5fa31615&plot=full`, axiosInstance, {
        revalidateIfStale: false,
        revalidateOnFocus: false,
        revalidateOnReconnect: false
    });

    const movie = data?.data?.Title ? data.data : undefined;

    return {
        movie,
        isLoading,
        isError: error || (data && data.Response === "False")
    };
};