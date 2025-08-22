import useMovieQueryStore from "@/components/Store";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface Crew {
  name: string;
  department: string;
  job: string;
}

interface Cast {
  name: string;
  character: string;
  profile_path: string;
}

interface Credit {
  crew: Crew[];
  cast: Cast[];
}

const useCredits = () => {
  const params = useParams();
  const id = params.id ? parseInt(params.id) : "";

  const selectedType = useMovieQueryStore((s) => s.MovieQuery.selectedType);
  const endpoint = selectedType == "Movie" ? `movie/${id}` : `tv/${id}`;
  const creditEndpoint = `${endpoint}/credits`;
  return useQuery({
    queryKey: ["details", creditEndpoint],
    queryFn: () =>
      apiClient.get<Credit>(creditEndpoint).then((res) => res.data),
    staleTime: 60 * 60 * 1000, //1hr
  });
};

export default useCredits;
