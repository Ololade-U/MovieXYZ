import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

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


const useVideos = (
    endpoint : string,
    id : number | ""
)=> {

 return useQuery({
    queryKey : ['videos', endpoint],
    queryFn : ()=>
       apiClient
          .get<VideoResponse>(endpoint, {params : {movie_id : id}})
          .then((res) => res.data.results),
    staleTime : 60 * 60 * 1000 //1hr
  })

}

export default useVideos