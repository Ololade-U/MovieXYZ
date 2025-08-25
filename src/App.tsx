import { Box, Grid, GridItem, Heading, Stack, Text } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GenreList from "./components/GenreList";
import MovieGrid from "./components/MovieGrid";
import useGenres from "./hooks/useGenre";
import Footer from "./components/Footer";
import useMovieQueryStore from "./components/Store";
import Menu from "./components/Menu";

const App = () => {
  const isClicked = useMovieQueryStore((s) => s.MovieQuery.isClicked);
  const resetClicked = useMovieQueryStore((s) => s.resetClicked);

  const selectedGenre = useMovieQueryStore((s) => s.MovieQuery.selectedGenre);
  const setSelectedGenre = useMovieQueryStore((s) => s.setSelectedGenre);
  const resetPage = useMovieQueryStore((s) => s.resetPage);
  const selectedType = useMovieQueryStore((s) => s.MovieQuery.selectedType);
  const handleClick = useMovieQueryStore((s) => s.handleClick);
  const { data: genres } = useGenres();

  const discription =
    selectedType == "Movie"
      ? `${selectedGenre?.name ? selectedGenre.name : ""} Movies`
      : `${selectedGenre?.name ? selectedGenre.name : ""} Tv Shows`;
  return (
    <>
      <Grid
        templateAreas={{
          mdTo2xl: `"nav nav" "aside main"`,
          mdDown: `"nav" "main"`,
        }}
        templateColumns={{
          mdDown: "1fr",
          mdTo2xl: "150px 1fr",
        }}
        overflow={"hidden"}
        pos={"relative"}
      >
        <GridItem
          area={"nav"}
          overflow={"hidden"}
          py={".6rem"}
          borderBottom={"1px solid #e3e3e3"}
          pos={{ mdDown: "fixed" }}
          w={"100%"}
          top={0}
          zIndex={"20"}
          bgColor={{ _dark: "black", _light: "white" }}
        >
          <NavBar />
        </GridItem>
        <GridItem
          hideBelow={"md"}
          area={"aside"}
          py={"1.5rem"}
          scrollbar={"hidden"}
          overflowY={"scroll"}
          height={"87vh"}
        >
          <GenreList />
        </GridItem>
        <GridItem
          area={"main"}
          overflowY={"scroll"}
          scrollbar={"hidden"}
          height={{ mdTo2xl: "87vh" }}
          mt={{ mdDown: "4.6rem", mdTo2xl: "1rem" }}
        >
          {/* <select
            onClick={(e) => {
              setSelectedType(e.currentTarget.value);
              // console.log(e.currentTarget.value)
              console.log(selectedType);
              e.currentTarget.value == "Tv Shows" && setSelectedGenre(null);
            }}
          >
            {Types.map((type) => (
              <option value={type} key={type}>
                {type}
              </option>
            ))}
          </select> */}
          <Heading
            m={{
              mdTo2xl: ".5rem .5rem 0.7rem",
              mdDown: ".5rem .5rem .5rem 2.2rem",
            }}
            fontSize={"2xl"}
            id="nav-bar"
          >
            {discription}
          </Heading>{" "}
          <Menu />
          <MovieGrid />
          <Footer />
        </GridItem>
      </Grid>
      {isClicked && (
        <Text
          pos={"fixed"}
          top={"3.75rem"}
          left={0}
          width={"100vw"}
          height={"100vh"}
          bgColor={"black"}
          zIndex={"40"}
          opacity={0.6}
          hideFrom={"md"}
          onClick={() => resetClicked()}
        ></Text>
      )}
      <Box
        hideFrom={"md"}
        pos={"fixed"}
        top={"3.75rem"}
        left={"-75vw"}
        width={"65vw"}
        height={"100vh"}
        overflow={"scroll"}
        scrollbar={"hidden"}
        zIndex={"50"}
        bgColor={"black"}
        data-state={isClicked ? "open" : "close"}
        _open={
          isClicked
            ? {
                animation: "open .5s ease-in",
                animationFillMode: "forwards",
              }
            : {
                animation: "open .5s ease-in",
                animationFillMode: "forwards",
                animationDirection: "normal",
              }
        }
      >
        <Stack
          w={"100%"}
          alignItems={"flex-start"}
          gap={"1.3rem"}
          p={"1.5rem 0"}
        >
          {genres?.map((genre) => (
            <Text
              cursor={"pointer"}
              color={{ _dark: "white", _light: "black" }}
              bgColor={{ _dark: "blackAlpha.50", _light: "white" }}
              key={genre.id}
              w={"100%"}
              p={".05rem 1.5rem"}
              onClick={() => {
                setSelectedGenre(genre);
                handleClick();
                resetPage;
              }}
              _hover={{
                transform: "scale(1.03)",
                _dark: { borderBottom: "1px solid #282828ff" },
                _light: { borderBottom: "1px solid #242424ff" },
              }}
            >
              {genre.name}
            </Text>
          ))}
        </Stack>
      </Box>
    </>
  );
};

export default App;
