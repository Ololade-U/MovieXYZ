import apiClient from "@/services/api-client";
import type { Genre } from "./useGenre";
import { useQuery } from "@tanstack/react-query";

export interface Movies {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  name: string;
  first_air_date: string;
  vote_average : number;
  vote_count : number;
}

export interface FetchMovieResponse {
  results: Movies[];
  total_pages: number;
}

// const [filteredData, setFilteredData] = useState<Movies[]>([])

const useMovies = (
  endpoint: string,
  page: number | undefined,
  selectedGenre?: Genre | null,
  searchParam?: string | undefined,
) => {
  const { data, error, isLoading, isRefetching} = useQuery<
    Movies[],
    Error
  >({
    queryKey: ["movies", selectedGenre, endpoint, page],
    queryFn: () =>
      apiClient
        .get<FetchMovieResponse>(endpoint || 'discover/movie', {
          params: { with_genres: selectedGenre?.id, page: page },
        })
        .then((res) => res.data.results),
        staleTime: 60 * 30 * 1000, //30mins
        refetchOnWindowFocus : false,
        refetchOnMount : false,
  });
  const filteredData =
    searchParam?.length !== undefined
      ? data?.filter((movie) =>
          movie.title
            ? movie.title.toLowerCase().includes(searchParam.toLowerCase())
            : movie.name.toLowerCase().includes(searchParam.toLowerCase())
        )
      : data;
  return { data, filteredData, error, isLoading, isRefetching };
};

export default useMovies;
