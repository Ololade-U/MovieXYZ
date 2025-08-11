import apiClient from "@/services/api-client";
import { CanceledError } from "axios";
import { useEffect, useState } from "react";

export interface Genre{
    id : number,
    name : string
}

const useGenres = ()=> {
    const [genres, setGenre] = useState<Genre[]>([]);
      const [error, setError] = useState("");
    
      useEffect(() => {
        const controller = new AbortController();
        apiClient
          .get("/genre/movie/list", { signal: controller.signal })
          .then((res) => {
            setGenre(res.data.genres);
          })
          .catch((err) => {
            if (err instanceof CanceledError) return;
            setError(err.message);
          });
    
        return () => controller.abort();
      }, []);
    
      return { genres, error };
}

export default useGenres