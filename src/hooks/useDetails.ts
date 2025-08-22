import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import type { Genre } from "./useGenre";
import useMovieQueryStore from "@/components/Store";
import { useParams } from "react-router-dom";


interface Details{
    backdrop_path : string;
    genres : Genre[];
    overview : string;
    poster_path : string;
    release_date : string;
    title : string;
    id : number;
    name : string;
    runtime : number;
    vote_average : number;
    tagline : string;
    video : boolean;
    first_air_date : string;
    seasons : []
}


const useDetails = ()=> {
const params = useParams();
  const id = params.id ? parseInt(params.id) : "";
  const selectedType = useMovieQueryStore((s) => s.MovieQuery.selectedType);
  const endpoint = selectedType == "Movie" ? `movie/${id}` : `tv/${id}`

 return useQuery({
    queryKey : ['details', endpoint],
    queryFn : ()=>
       apiClient
          .get<Details>(endpoint)
          .then((res) => res.data),
    staleTime : 60 * 60 * 1000 //1hr
  })

}

export default useDetails