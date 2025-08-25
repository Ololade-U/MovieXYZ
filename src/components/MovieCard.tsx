import type { Movies } from "@/hooks/useMovies";
import {
  AbsoluteCenter,
  Box,
  Card,
  Flex,
  Heading,
  HStack,
  Image,
  ProgressCircle,
  Text,
} from "@chakra-ui/react";

import tomato from "../assets/icons8-tomato-48.png";
import { Link } from "react-router-dom";
import notFound from "../assets/not found.jpg";
import { FaBookmark } from "react-icons/fa6";
import useMovieQueryStore from "./Store";

interface Prop {
  movie: Movies;
}

const MovieCard = ({ movie }: Prop) => {
  const bookmarked = useMovieQueryStore((s) => s.MovieQuery.bookmarked);
  const setBookmark = useMovieQueryStore((s) => s.setBookmark);
  const bookmarkValue = useMovieQueryStore((s) => s.MovieQuery.bookmarkValue);
  const removeBookmark = useMovieQueryStore((s) => s.removeBookmark);

  const rating = parseInt((movie.vote_average * 10).toFixed(0));
  return (
    <>
      <Card.Root borderRadius={"1rem"} overflow={"hidden"} p={"1rem"}>
        {movie.poster_path ? (
          <Image
            pos={"relative"}
            objectFit={"contain"}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            w={"100%"}
          />
        ) : (
          <Image
            pos={"relative"}
            objectFit={"contain"}
            src={notFound}
            w={"100%"}
          />
        )}
        <Flex justify={"space-between"} alignItems={"flex-start"}>
          <ProgressCircle.Root
            bgColor={
              rating && rating < 50
                ? "red.400"
                : rating && rating < 75
                ? "yellow.400"
                : "green.400"
            }
            borderRadius={"50%"}
            w={"2.5rem"}
            color={"black"}
            fontWeight={"bolder"}
            top={"-1rem"}
            left={".5rem"}
            position={"relative"}
            size={"md"}
            value={rating}
            colorPalette={
              rating < 50 ? "red" : rating < 75 ? "yellow" : "green"
            }
          >
            <ProgressCircle.Circle css={{ "--thickness": "3px" }}>
              <ProgressCircle.Track />
              <ProgressCircle.Range />
            </ProgressCircle.Circle>
            <AbsoluteCenter>
              <ProgressCircle.ValueText />
            </AbsoluteCenter>
          </ProgressCircle.Root>
          <Box
            cursor={"pointer"}
            // bgColor={{ _dark: "blue.900", _light: "#e3e3e3" }}
            // p={".8rem .8rem"}
            top={"-1rem"}
            right={".5rem"}
            position={"relative"}
            title="Add to watchlist"
          >
            <FaBookmark
              onClick={() => {
                bookmarked?.includes(movie.id)
                  ? removeBookmark(movie.id)
                  : setBookmark(movie.id);

                  console.log(bookmarkValue)
                  console.log(bookmarked)
              }}
              size={"2rem"}
              fill={bookmarked?.includes(movie.id) ? "#4242ecff" : "#e3e3e3"}
            />
          </Box>
        </Flex>
        <Card.Body p={0}>
          <Link to={`/movies/${movie.id}/${movie.title || movie.name}`}>
            <Heading fontSize={"1xl"}>
              {movie.title ? movie.title : movie.name}
            </Heading>
          </Link>
          <HStack justify={"space-between"}>
            <Text>
              {movie.release_date ? movie.release_date : movie.first_air_date}
            </Text>
            <Box gap={".3rem"} display={"flex"} alignItems={"center"}>
              <Image boxSize={"1rem"} src={tomato} />
              <Text fontSize={"sm"}>{movie.vote_count}</Text>
            </Box>
          </HStack>
        </Card.Body>
      </Card.Root>
    </>
  );
};

export default MovieCard;
