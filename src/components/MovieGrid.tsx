import { type Movies } from "@/hooks/useMovies";
import { SimpleGrid, Text } from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import MovieCardSkeleton from "./MovieCardSkeleton";

interface Prop {
  movies: Movies[];
  isLoading: boolean;
  error: string;
  filteredData: Movies[];
}

const MovieGrid = ({ movies, error, isLoading, filteredData }: Prop) => {
  const Skeleton = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid
        columns={{ sm: 1, md: 2, lg: 3, xlTo2xl: 4 }}
        gap={"1rem"}
        padding={"1rem 1rem 0 .5rem"}
      >
        {isLoading &&
          Skeleton.map((skeleton) => <MovieCardSkeleton key={skeleton} />)}
        {filteredData.length > 0
          ? filteredData.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))
          : movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}
      </SimpleGrid>
    </>
  );
};

export default MovieGrid;
