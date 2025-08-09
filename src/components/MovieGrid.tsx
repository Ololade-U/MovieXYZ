import useMovies from "@/hooks/useMovies";
import { SimpleGrid, Text } from "@chakra-ui/react";
import MovieCard from "./MovieCard";



const MovieGrid = () => {
  
    const {movies, error} = useMovies()

  return (
    <>
      {error && <Text>{error}</Text>}
      <SimpleGrid columns={{sm : 1, md: 2, lg : 3, xlTo2xl : 4}} gap={'1rem'} padding={'1rem 1rem 0 .5rem'}>
        {movies.map((movie) => (
         <MovieCard key={movie.id} movie={movie}/>
        ))}
      </SimpleGrid>
    </>
  );
};

export default MovieGrid;
