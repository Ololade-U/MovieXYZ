import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";


interface Crew{
    name : string;
    department : string;
    job : string;

}

interface Cast{
    name : string,
    character : string,
    profile_path : string,
}

interface Credit{
    crew : Crew[]
    cast : Cast[]
}


const useCredits = (
    endpoint : string
)=> {

 return useQuery({
    queryKey : ['details', endpoint],
    queryFn : ()=>
       apiClient
          .get<Credit>(endpoint)
          .then((res) => res.data),
    staleTime : 60 * 60 * 1000 //1hr
  })

}

export default useCredits