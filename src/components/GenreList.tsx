import
 { type Genre } from "@/hooks/useGenre";
import { Stack, Text } from "@chakra-ui/react";

interface Prop{
  genres : Genre[] | undefined
  onSelectGenre : (genre : Genre)=> void
  selectedGenre : Genre | null
}

const GenreList = ({genres, onSelectGenre, selectedGenre} : Prop) => {
  // const { genres } = useGenres();
  return (
    <Stack w={"100%"} alignItems={"flex-start"} gap={"1.3rem"}>
      {genres?.map((genre) => (
        <Text
          cursor={"pointer"}
          fontWeight={genre.id == selectedGenre?.id ? 'bold' : 'normal'}
          color={{ _dark: "white", _light: "black" }}
          bgColor={{ _dark: "blackAlpha.50", _light: "white" }}
          key={genre.id}
          w={"100%"}
          p={".05rem 1rem"}
          onClick={()=> onSelectGenre(genre)}
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
