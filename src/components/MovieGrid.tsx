import { type Movies } from "@/hooks/useMovies";
import { Button, HStack, SimpleGrid, Text } from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface Prop {
  movies: Movies[];
  isLoading: boolean;
  isRefetching: boolean;
  error: Error | null;
  filteredData: Movies[];
  onNextPage: () => void;
  onPrevPage: () => void;
  endpoint : string;
  page : number;
}

const MovieGrid = ({
  movies,
  isRefetching,
  error,
  isLoading,
  filteredData,
  onNextPage,
  onPrevPage,
  endpoint, 
}: Prop) => {
  const Skeleton = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16];

  return (
    <>
      {error && <Text>{error.message}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xlTo2xl: 4 }}
        gap={"1rem"}
        padding={"1rem 1rem 0 .5rem"}
      >
        {isLoading
          ? Skeleton.map((skeleton) => <MovieCardSkeleton key={skeleton} />)
          : isRefetching
          ? Skeleton.map((skeleton) => <MovieCardSkeleton key={skeleton} />)
          : ""}
        {filteredData?.length > 0
          ? filteredData.map((movie) => (
              <MovieCard endpoint={endpoint} key={movie.id} movie={movie} />
            ))
          : movies.map((movie) => <MovieCard endpoint={endpoint} key={movie.id} movie={movie} />)}
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
