import useGenres from "@/hooks/useGenre";
import { Stack, Text } from "@chakra-ui/react";
import useMovieQueryStore from "./Store";

const GenreList = () => {

  const { data: genres } = useGenres()

  const setSelectedGenre = useMovieQueryStore((s) => s.setSelectedGenre);
  const selectedGenre = useMovieQueryStore((s) => s.MovieQuery.selectedGenre);
  const resetPage = useMovieQueryStore((s) => s.resetPage);
  return (
    <Stack w={"100%"} alignItems={"flex-start"} gap={"1.3rem"}>
      {genres?.map((genre) => (
        <Text
          cursor={"pointer"}
          fontWeight={genre.id == selectedGenre?.id ? "bold" : "normal"}
          color={{ _dark: "white", _light: "black" }}
          bgColor={{ _dark: "blackAlpha.50", _light: "white" }}
          key={genre.id}
          w={"100%"}
          p={".05rem 1rem"}
          onClick={() => {
            setSelectedGenre(genre);
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
  );
};

export default GenreList;
