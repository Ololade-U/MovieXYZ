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
}

interface FetchMovieResponse {
  results: Movies[];
}

const useMovies = (selectedGenre: Genre | null) => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    setLoading(true);
    apiClient
      .get<FetchMovieResponse>("discover/movie", {
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

    return () => controller.abort();
  }, [selectedGenre?.id]);

  return { movies, error, isLoading };
};

export default useMovies;
