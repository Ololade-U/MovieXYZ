import type { Movies } from "@/hooks/useMovies";
import { Card, Heading, Image, Text } from "@chakra-ui/react";

interface Prop {
  movie: Movies;
}

const MovieCard = ({ movie }: Prop) => {
  return (
    <>
    <Card.Root borderRadius={'1rem'} overflow={'hidden'} p={'1rem'} >
        <Image objectFit={'contain'} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} w={'100%'}/>
      <Card.Body p={0}>
        <Heading fontSize={'1xl'}>{movie.title ? movie.title : movie.name}</Heading>
        <Text>{movie.release_date ? movie.release_date : movie.first_air_date}</Text>
      </Card.Body>
    </Card.Root>
    </>
  );
};

export default MovieCard;
