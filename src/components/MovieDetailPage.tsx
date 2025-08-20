import { useNavigate, useParams } from "react-router-dom";
import MovieDetailNav from "./MovieDetailNav";
import {
  AbsoluteCenter,
  Box,
  Card,
  Flex,
  Heading,
  HStack,
  Image,
  ProgressCircle,
  Stack,
  Text,
} from "@chakra-ui/react";
import useDetails from "@/hooks/useDetails";
import useCredits from "@/hooks/useCredit";
import { TfiMenuAlt } from "react-icons/tfi";
import { CiHeart } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { FaPlay } from "react-icons/fa";
import useVideos from "@/hooks/useVideos";
import { useColorMode } from "./ui/color-mode";
import unknown from "../assets/Unknown_person.jpg"

const MovieDetailPage = () => {
  const params = useParams();
  const id = params.id ? parseInt(params.id) : "";
  const endpoint =
    params.endpoint?.toLowerCase() == "movie" ? `movie/${id}` : `tv/${id}`;
  const { data } = useDetails(endpoint);

  const hours = data?.runtime && Math.floor(data?.runtime / 60);
  const minutes = data?.runtime && data?.runtime % 60;

  // Pad minutes with a leading zero if less than 10
  const formattedMinutes = minutes && minutes < 10 ? `0${minutes}` : minutes;
  const time = `${hours}h ${formattedMinutes}m`;

  const { colorMode } = useColorMode();
  const rating =
    data?.vote_average && parseInt((data?.vote_average * 10).toFixed(0));

  const creditEndpoint = `${endpoint}/credits`;
  const videoEndpoint = `${endpoint}/videos`;
  const { data: credits } = useCredits(creditEndpoint);
  const writer = credits?.crew.find((credit) => credit.department == "Writing");
  const Actors = credits?.cast;
  const { data: videos } = useVideos(videoEndpoint, id);
  const trailer = videos?.find((video) =>
    video.name.toLowerCase().includes("official trailer")
  );

  // console.log(data?.seasons.length)

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };
  return (
    <>
      <MovieDetailNav onBack={handleBack} />
      <Box
        position={"relative"}
        left={0}
        color={"white"}
        bgRepeat={"no-repeat"}
        bgPos={{ mdTo2xl: "center" }}
        bgSize={{ mdTo2xl: "cover" }}
        bgImage={{
          mdTo2xl: `url(https://image.tmdb.org/t/p/w500${data?.backdrop_path})`,
        }}
        height={{ mdTo2xl: "87vh" }}
        // w={'100vw'}
        // pl={'2rem'}
        
        // overflowX={'hidden'}
      >
        <HStack
          flexDirection={{ mdDown: "column" }}
          alignItems={'center'}
          gap={"2rem"}
          // px={{ mdTo2xl: "2rem", mdDown: "1rem" }}
          zIndex={25}
          // w={'100vw'}
          height={"100%"}
          // alignItems={"center"}
          color={{ _light: "black" }}
          pl={'.5rem'}
        >
          <Card.Root
            // w={{ mdTo2xl: "18rem", mdDown: "16rem" }}
            mt={{ mdDown: "2rem" }}
          >
            <Card.Body>
              <Image
                zIndex={25}
                objectPosition={"center"}
                objectFit={"cover"}
                src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
                height={{ mdTo2xl: "75vh", mdDown: "60vh" }}
                borderRadius={".5rem"}
                w={'100%'}
              />
            </Card.Body>
          </Card.Root>
          <Box zIndex={25}>
            <Stack alignItems={'flex-start'} gap={"1rem"} pos={"relative"}>
              <Stack>
                <Heading textWrap={'wrap'} fontSize={{ mdTo2xl: "3xl", mdDown: "xl" }}>
                  {data?.title || data?.name}({data?.release_date?.slice(0, 4)||data?.first_air_date?.slice(0, 4)})
                </Heading>
                <Flex
                  gap={"1rem"}
                  wrap={"wrap"}
                  fontWeight={"bold"}
                  fontSize={{ mdDown: "md" }}
                >
                  <Text
                    fontWeight={"bold"}
                    px={".3rem"}
                    color={{ _dark: "#e3e3e3", _light: "#929292ff" }}
                    border={{
                      _dark: "1.5px solid #e3e3e3",
                      _light: "1.5px solid #929292ff",
                    }}
                    borderRadius={".3rem"}
                  >
                    PG-13
                  </Text>
                  <Text fontWeight={"bold"}>{data?.release_date || data?.first_air_date}</Text>
                  &bull;
                  <Flex>
                    {data?.genres.map((genre) => (
                      <Text
                        mr={".3rem"}
                        wordBreak={"break-word"}
                        key={genre.id}
                      >
                        {genre.name},
                      </Text>
                    ))}
                  </Flex>
                  &bull;
                  <Text>{data?.runtime && time || `${data?.seasons.length} Seasons`}</Text>
                </Flex>
              </Stack>
              <Flex gap={".7rem"} align={"center"}>
                <ProgressCircle.Root
                  bgColor={
                    rating && rating < 50
                      ? "red.400"
                      : rating && rating < 75
                      ? "yellow.400"
                      : "green.400"
                  }
                  borderRadius={"50%"}
                  w={"3rem"}
                  color={"black"}
                  size={"lg"}
                  value={rating}
                  colorPalette={
                    rating && rating < 50
                      ? "red"
                      : rating && rating < 75
                      ? "yellow"
                      : "green"
                  }
                >
                  <ProgressCircle.Circle css={{ "--thickness": "4px" }}>
                    <ProgressCircle.Track />
                    <ProgressCircle.Range />
                  </ProgressCircle.Circle>
                  <AbsoluteCenter>
                    <ProgressCircle.ValueText />
                  </AbsoluteCenter>
                </ProgressCircle.Root>
                <Text fontWeight={"bold"}>
                  Fan's <br /> Score
                </Text>
                <Text
                  bgColor={{ _dark: "blue.900", _light: "#e3e3e3" }}
                  p={".4rem .8rem"}
                  borderRadius={"1rem"}
                  fontWeight={"bold"}
                >
                  What's your <u>Vibe?</u>
                </Text>
              </Flex>
              <Flex gap={"1rem"} alignItems={"center"}>
                <Box
                  cursor={"pointer"}
                  bgColor={{ _dark: "blue.900", _light: "#e3e3e3" }}
                  p={".8rem .8rem"}
                  borderRadius={"50%"}
                >
                  <TfiMenuAlt size={"1.3rem"} />
                </Box>
                <Box
                  cursor={"pointer"}
                  bgColor={{ _dark: "blue.900", _light: "#e3e3e3" }}
                  p={".8rem .8rem"}
                  borderRadius={"50%"}
                >
                  <CiHeart size={"1.3rem"} />
                </Box>
                <Box
                  cursor={"pointer"}
                  bgColor={{ _dark: "blue.900", _light: "#e3e3e3" }}
                  p={".8rem .8rem"}
                  borderRadius={"50%"}
                >
                  <CiBookmark size={"1.3rem"} />
                </Box>
                <a
                  target="_blank"
                  href={`https://www.youtube.com/watch?v=${trailer?.key}`}
                >
                  <Box
                    cursor={"pointer"}
                    display={"flex"}
                    alignItems={"center"}
                    gap={".5rem"}
                  >
                    <FaPlay fill={colorMode == "dark" ? "white" : "black"} />
                    <Text>Play trailer</Text>
                  </Box>
                </a>
              </Flex>
              <Text>{data?.tagline}</Text>
              <Flex direction={"column"}>
                <Heading fontSize={"2xl"}>Overview</Heading>
                <Text
                wordBreak={'break-word'}
                  maxWidth={{ mdTo2xl: "95ch"}}
                  overflowWrap={{ mdTo2xl: "break-word", mdDown : "break-word" }}
                >
                  {data?.overview}
                </Text>
              </Flex>
              <Flex w={'100%'} my={"1rem"} justify={{mdDown :'space-around'}} gap={{mdTo2xl :"7rem"}}>
                <Stack alignItems={'center'}>
                  <Text
                    fontSize={"lg"}
                    fontWeight={"bold"}
                    lineHeight={{ mdTo2xl: ".5", mdDown: "1" }}
                    textAlign={'center'}
                  >
                    {writer?.name}
                  </Text>
                  <Text textAlign={'center'} lineHeight={"1"}>{writer?.job}</Text>
                </Stack>
                <Stack alignItems={'center'}>
                  <Text textAlign={'center'} fontSize={"lg"} fontWeight={"bold"} lineHeight={"1"}>
                    {Actors && Actors[0]?.name}
                  </Text>
                  <Text textAlign={'center'} lineHeight={".5"}>Character</Text>
                </Stack>
                <Stack alignItems={'center'}>
                  <Text textAlign={'center'} fontSize={"lg"} fontWeight={"bold"} lineHeight={"1"}>
                    {Actors && Actors[1]?.name}
                  </Text>
                  <Text textAlign={'center'} lineHeight={".5"}>Character</Text>
                </Stack>
              </Flex>
            </Stack>
          </Box>
        </HStack>
        <Box px={"1rem"} mt={"2rem"} ml={0}>
          <Heading fontSize={"3xl"} ml={0}>
            Starring
          </Heading>
          <Flex
            w={"100%"}
            overflowX={"scroll"}
            scrollbar={"hidden"}
            gap={"1rem"}
            my={"2rem"}
            justifyContent={'flex-start'}
            mx={'0'}
            px={0}
          >
            {Actors?.map((actor) => (
              <Stack alignItems={"center"} flexShrink={0}>
                {actor.profile_path ? <Image
                  boxSize={"5rem"}
                  borderRadius={"50%"}
                  src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                /> : <Image
                  boxSize={"5rem"}
                  borderRadius={"50%"}
                  src={unknown}
                />}
                <Text color={{_light : 'black'}} fontWeight={'bold'}>{actor.name}</Text>
                <Text color={{_light : 'black'}} maxWidth={'20ch'} textAlign={"center"}>{actor.character}</Text>
              </Stack>
            ))}
          </Flex>
        </Box>
        <Text
          hideBelow={"md"}
          pos={"absolute"}
          opacity={".4"}
          top={0}
          width={"100%"}
          height={"100%"}
          bgColor={"black"}
          zIndex={5}
        ></Text>
      </Box>
    </>
  );
};

export default MovieDetailPage;
