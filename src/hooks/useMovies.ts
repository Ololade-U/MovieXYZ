import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import useMovieQueryStore from "@/components/Store";

export interface Movies {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  name: string;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
}

export interface FetchMovieResponse {
  results: Movies[];
  total_pages: number;
}

const useMovies = () => {
  const selectedType = useMovieQueryStore((s) => s.MovieQuery.selectedType);
  const endpoint = selectedType !== "Movie" ? "discover/tv" : "discover/movie";
  const selectedGenre = useMovieQueryStore((s) => s.MovieQuery.selectedGenre);
  const page = useMovieQueryStore((s) => s.MovieQuery.page);
  const { data, error, isLoading, isRefetching } = useQuery<Movies[], Error>({
    queryKey: ["movies", selectedGenre?.id, endpoint, page],
    queryFn: () =>
      apiClient
        .get<FetchMovieResponse>(endpoint, {
          params: { with_genres: selectedGenre?.id, page: page },
        })
        .then((res) => res.data.results),
    staleTime: 60 * 30 * 1000, //30mins
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
  return { data, error, isLoading, isRefetching };
};

export default useMovies;
