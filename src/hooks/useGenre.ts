import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

export interface Genre{
    id : number,
    name : string
}

interface GenreResponse{
  genres : Genre[]
}

const useGenres = ()=> {

 return useQuery({
    queryKey : ['genres'],
    queryFn : ()=>
       apiClient
          .get<GenreResponse>("/genre/movie/list")
          .then((res) => res.data.genres),
    staleTime : 60 * 60 * 1000 //1hr
  })

}

export default useGenres