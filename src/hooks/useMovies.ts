import apiClient from "@/services/api-client";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";

 export interface Movies {
  id: number;
  title: string;
  release_date: string;
  poster_path : string;
  backdrop_path : string;
}

interface FetchMovieResponse {
  results: Movies[];
}

const useMovies = () => {
  const [movies, setMovies] = useState<Movies[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    apiClient
      .get<FetchMovieResponse>("/movie/now_playing", { signal: controller.signal })
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        if (err instanceof CanceledError) return;
        setError(err.message);
      });

    return () => controller.abort();
  }, []);

  return { movies, error };
};

export default useMovies;
