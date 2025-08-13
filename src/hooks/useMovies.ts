import apiClient from "@/services/api-client";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";
import type { Genre } from "./useGenre";

export interface Movies {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  name : string;
  first_air_date : string
}

interface FetchMovieResponse {
  results: Movies[];
}

const useMovies = (
  selectedGenre: Genre | null,
  searchParam: string | undefined,
  endpoint: string
) => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState<Movies[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchMovieResponse>(endpoint, {
        signal: controller.signal,
        params: { with_genres: selectedGenre?.id },
      })
      .then((res) => {
        setMovies(res.data.results);
        setLoading(false);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoading(false);
      });

    if (searchParam?.length !== undefined) {
      searchParam?.length > 0 &&
        setFilteredData(
          movies.filter((movie) =>
            movie.title?
            movie.title.toLowerCase().includes(searchParam.toLowerCase()):
            movie.name.toLowerCase().includes(searchParam.toLowerCase())
          )
        );
    }

    return () => controller.abort();
  }, [selectedGenre?.id, searchParam, endpoint]);

  return { movies, error, isLoading, filteredData };
};

export default useMovies;
