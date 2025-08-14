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
}

export interface FetchMovieResponse {
  results: Movies[];
  total_pages: number;
}

// const [filteredData, setFilteredData] = useState<Movies[]>([])

const useMovies = (
  selectedGenre: Genre | null,
  endpoint: string,
  searchParam: string | undefined,
  page : number
) => {
  const { data, error, isLoading } = useQuery<
    Movies[],
    Error,
    Movies[]
  >({
    queryKey: ["movies", selectedGenre, endpoint, page],
    queryFn: () =>
      apiClient
        .get<FetchMovieResponse>(endpoint, {
          params: { with_genres: selectedGenre?.id, page: page },
        })
        .then((res) => res.data.results),
        staleTime: 60 * 30 * 1000, //30mins
  });
  const filteredData =
    searchParam?.length !== undefined
      ? data?.filter((movie) =>
          movie.title
            ? movie.title.toLowerCase().includes(searchParam.toLowerCase())
            : movie.name.toLowerCase().includes(searchParam.toLowerCase())
        )
      : data;
  return { data, filteredData, error, isLoading };
};

export default useMovies;
