
import apiClient from "@/services/api-client";
import { useQuery } from "@tanstack/react-query";

export interface Movies {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  backdrop_path: string;
  name: string;
  first_air_date: string;
  vote_average : number;
  vote_count : number;
}

export interface FetchSearchResponse {
  results: Movies[];
}

// const [filteredData, setFilteredData] = useState<Movies[]>([])

const useSearch = (
  endpoint: string,
  page: number | undefined,
  searchParam : string | undefined
) => {
 return useQuery<
    Movies[],
    Error
  >({
    queryKey: ["search", searchParam, endpoint, page],
    queryFn: () =>
      apiClient
        .get<FetchSearchResponse>(endpoint, {
          params: { query : searchParam ,  page: page },
        })
        .then((res) => res.data.results),
        staleTime: 60 * 30 * 1000, //30mins
        refetchOnWindowFocus : false,
        refetchOnMount : false,
  });
};

export default useSearch;
