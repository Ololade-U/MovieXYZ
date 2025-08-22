import useMovies from "@/hooks/useMovies";
import { Button, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";
import useMovieQueryStore from "./Store";
import useSearch from "@/hooks/useSearch";
import EmptyPage from "./EmptyPage";

const MovieGrid = () => {
  const Skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  const selectedType = useMovieQueryStore((s) => s.MovieQuery.selectedType);
  const searchEndpoint =
    selectedType !== "Movie" ? "search/tv" : "search/movie";
  const page = useMovieQueryStore((s) => s.MovieQuery.page);
  const searchParam = useMovieQueryStore(s => s.MovieQuery.searchParam)

  const { data: movies, error, isLoading, isRefetching } = useMovies();

  const { data: filteredData } = useSearch(searchEndpoint, page, searchParam);

  const onNextPage = useMovieQueryStore((s) => s.onNextPage);
  const onPrevPage = useMovieQueryStore((s) => s.onPrevPage);
  return (
    <>
      {error && <Text>{error.message}</Text>}
      {movies?.length == 0 && <EmptyPage />}

      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xlTo2xl: 4 }}
        gap={"1rem"}
        p={{ mdDown: "0 2rem", smTo2xl: "0 0 2rem" }}
      >
        {isLoading
          ? Skeleton.map((skeleton) => <MovieCardSkeleton key={skeleton} />)
          : isRefetching
          ? Skeleton.map((skeleton) => <MovieCardSkeleton key={skeleton} />)
          : ""}
        {searchParam
          ? filteredData?.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          : movies?.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </SimpleGrid>
      <HStack mt={"1rem"} justifyContent={"center"}>
        <Button
          onClick={() => onPrevPage()}
          variant={"outline"}
          p={".4rem .6rem"}
        >
          Prev Page
        </Button>
        <Button
          onClick={() => onNextPage()}
          variant={"outline"}
          p={".4rem .6rem"}
        >
          Next Page
        </Button>
      </HStack>
    </>
  );
};

export default MovieGrid;
