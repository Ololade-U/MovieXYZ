import {
  Box,
  Grid,
  GridItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GenreList from "./components/GenreList";
import MovieGrid from "./components/MovieGrid";
import {useState } from "react";
import useGenres, { type Genre } from "./hooks/useGenre";
import useMovies from "./hooks/useMovies";

const App = () => {
  const Types = ["Movie", "Tv Shows"];
  const [isClicked, setClicked] = useState(false);
  const handleClick = () => {
    setClicked(true);
  };
  const [selectedGenre, setSelectedGenre] = useState<Genre | null>(null);
  const [searchParam, setSearchParam] = useState<string | undefined>("");
  const [selected, setSelected] = useState("Movie");
  const { genres } = useGenres();
  // const [endpoint, setEndpoint] = useState("discover/movie");

  const endpoint = selected !== "Movie" ? "discover/tv" : "discover/movie";

  const { movies, error, isLoading, filteredData } = useMovies(
    selectedGenre,
    searchParam,
    endpoint
  );
  // console.log(selected)

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
          height={"13vh"}
          borderBottom={"1px solid #e3e3e3"}
          pos={{ mdDown: "fixed" }}
          w={"100%"}
          top={0}
          zIndex={"20"}
          bgColor={{ _dark: "black", _light: "white" }}
        >
          <NavBar
            onSubmit={(searchRef) => setSearchParam(searchRef)}
            onClick={handleClick}
          />
        </GridItem>
        <GridItem
          hideBelow={"md"}
          area={"aside"}
          py={"1.5rem"}
          scrollbar={"hidden"}
          overflowY={"scroll"}
          height={"87vh"}
        >
          <GenreList
            genres={genres}
            onSelectGenre={(genres) => {
              setSelectedGenre(genres);
              setSearchParam("");
            }}
          />
        </GridItem>
        <GridItem
          p={{ mdDown: "0 2rem", smTo2xl: "0 0 2rem" }}
          area={"main"}
          overflowY={"scroll"}
          scrollbar={"hidden"}
          height={{ mdTo2xl: "87vh" }}
          mt={{ mdDown: "5.5rem", mdTo2xl : '1rem' }}
        >
          <select
            onClick={(e) => {
              console.log(e.currentTarget.value);
              setSelected(e.currentTarget.value);
            }}
          >
            {Types.map((type) => (
              <option value={type} key={type}>{type}</option>
            ))}
          </select>
          <MovieGrid
            filteredData={searchParam ? filteredData : movies}
            movies={movies}
            error={error}
            isLoading={isLoading}
          />
        </GridItem>
      </Grid>
      {isClicked && (
        <Text
          pos={"absolute"}
          top={0}
          left={0}
          width={"100vw"}
          height={"100vh"}
          bgColor={"black"}
          zIndex={"40"}
          opacity={0.6}
          hideFrom={"md"}
          onClick={() => setClicked(false)}
        ></Text>
      )}
      <Box
        hideFrom={"md"}
        pos={isClicked ? "absolute" : "fixed"}
        top={0}
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
                animationDirection: "reverse",
              }
        }
      >
        <Stack
          w={"100%"}
          alignItems={"flex-start"}
          gap={"1.3rem"}
          p={"1.5rem 0"}
        >
          {genres.map((genre) => (
            <Text
              cursor={"pointer"}
              color={{ _dark: "white", _light: "black" }}
              bgColor={{ _dark: "blackAlpha.50", _light: "white" }}
              key={genre.id}
              w={"100%"}
              p={".05rem 1.5rem"}
              onClick={() => setSelectedGenre(genre)}
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
