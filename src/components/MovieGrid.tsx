import useMovies from "@/hooks/useMovies";
import { Flex, Grid, GridItem, SimpleGrid, Text } from "@chakra-ui/react";
import MovieCard from "./MovieCard";
import NavBar from "./NavBar";



const MovieGrid = () => {
  
    const {movies, error} = useMovies()

  return (
    <>
      {error && <Text>{error}</Text>}
      <Grid
      templateAreas={{
        mdTo2xl: `"nav nav" "aside main"`,
        mdDown: `"nav" "main"`,
      }}
    >
      <GridItem area={'nav'}>
        <NavBar/>
      </GridItem>
      <GridItem hideBelow={'md'} area={'aside'} bgColor={'gold'}>Aside</GridItem>
      <GridItem area={'main'} bgColor={'coral'}>
      <SimpleGrid columns={{sm : 1, md: 2, lg : 3, xlTo2xl : 4}} gap={'1rem'} padding={'2rem'}>
        {movies.map((movie) => (
         <MovieCard key={movie.id} movie={movie}/>
        ))}
      </SimpleGrid>
      </GridItem>
    </Grid>
    </>
  );
};

export default MovieGrid;
