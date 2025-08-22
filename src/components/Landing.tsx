import { Box, Button, Heading, HStack, Stack } from "@chakra-ui/react";
import back from "../assets/mbg4.jpg";
import { Link } from "react-router-dom";


const Landing = () => {
  return (
    <>
      <Box
        height={"100vh"}
        bgSize={"cover"}
        bgRepeat={"no-repeat"}
        bgImage={`url(${back})`}
        position={"relative"}
      >
        <Stack
          opacity={1}
          h={"100%"}
          zIndex={"20"}
          alignItems={"center"}
          p={{ mdTo2xl: "2rem 7rem", mdDown: "2rem 2rem" }}
        >
          <HStack justifyContent={"space-between"} w={"100%"} zIndex={"20"}>
            <Heading
              color={"red"}
              fontSize={{ mdTo2xl: "3xl", mdDown: "2xl" }}
              fontWeight={"bolder"}
            >
              MovieXYZ
            </Heading>
            <Button bgColor={"red"} color={'white'} p={"1rem 1.2rem"}>
              Sign up
            </Button>
          </HStack>
          <Stack justifyContent={'center'} height={'100%'} zIndex={"20"} color={"white"} alignItems={'center'}>
            <Heading
              zIndex={"20"}
              fontSize={{ mdTo2xl: "5xl", mdDown: "3xl" }}
              lineHeight={1.5}
              textAlign={"center"}
            >
              Explore unlimited movies, <br /> TV shows and more
            </Heading>
            <Link to={`/movies`}>
              <Button
                zIndex={"20"}
                alignSelf={"center"}
                bgColor={"red"}
                fontSize={{ mdTo2xl: "2xl", mdDown: "xl" }}
                p={"1.7rem 1.4rem"}
                textAlign={"center"}
                color={'white'}
              >
                Get Started
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Box>
      <Box
        w={"100%"}
        height={"100%"}
        zIndex={"10"}
        bgColor={"black"}
        opacity={0.7}
        position={"absolute"}
        top={0}
        left={0}
      ></Box>
    </>
  );
};

export default Landing;
