import useMovieQueryStore from "@/components/Store";
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface Result{
    name : string
    iso_639_1 : string,
    site : string,
    iso_3166_1 : string
    size : number,
    key : string
}

interface VideoResponse{
    id : number,
    results : Result[]
}


const useVideos = ()=> {
    const params = useParams();
    const id = params.id ? parseInt(params.id) : "";

    const selectedType = useMovieQueryStore((s) => s.MovieQuery.selectedType);
    const endpoint = selectedType == "Movie" ? `movie/${id}` : `tv/${id}`
    const videoEndpoint = `${endpoint}/videos`;
 return useQuery({
    queryKey : ['videos', videoEndpoint],
    queryFn : ()=>
       apiClient
          .get<VideoResponse>(videoEndpoint, {params : {movie_id : id}})
          .then((res) => res.data.results),
    staleTime : 60 * 60 * 1000 //1hr
  })

}

export default useVideos