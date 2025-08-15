import type { Movies } from "@/hooks/useMovies";
import { AbsoluteCenter, Box, Card, Heading, HStack, Image, ProgressCircle, Text } from "@chakra-ui/react";

import tomato from '../assets/icons8-tomato-48.png'

interface Prop {
  movie: Movies;
}

const MovieCard = ({ movie }: Prop) => {

  const rating = parseInt((movie.vote_average * 10).toFixed(0))
  return (
    <>
    <Card.Root borderRadius={'1rem'} overflow={'hidden'} p={'1rem'} >
        <Image pos={'relative'} objectFit={'contain'} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} w={'100%'}/>
        <ProgressCircle.Root bgColor={'black'} borderRadius={'50%'} w={'2.5rem'} top={'-1rem'} left={'.5rem'} position={'relative'} size={'md'} value={rating} colorPalette={rating < 50 ? 'red' : rating < 75 ? 'yellow' : 'green'}>
            <ProgressCircle.Circle css={{ "--thickness": "2px" }}>
              <ProgressCircle.Track />
              <ProgressCircle.Range />
            </ProgressCircle.Circle>
            <AbsoluteCenter>
              <ProgressCircle.ValueText />
            </AbsoluteCenter>
          </ProgressCircle.Root>
      <Card.Body p={0}>
        <Heading fontSize={'1xl'}>{movie.title ? movie.title : movie.name}</Heading>
        <HStack justify={'space-between'}>
        <Text>{movie.release_date ? movie.release_date : movie.first_air_date}</Text>
        <Box gap={'.3rem'} display={'flex'} alignItems={'center'}>
          <Image boxSize={'1rem'} src={tomato}/>
          <Text fontSize={'sm'}>{movie.vote_count}</Text>
        </Box>
        </HStack>
      </Card.Body>
    </Card.Root>
    </>
  );
};

export default MovieCard;
