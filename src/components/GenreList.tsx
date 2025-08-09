import useGenres from "@/hooks/useGenre";
import { Button, Stack, Text } from "@chakra-ui/react";

const GenreList = () => {
  const { genres } = useGenres();
  return (
    <Stack w={"100%"}>
      {genres.map((genre) => (
        <Button
          color={{ _dark: "white", _light: "black" }}
          bgColor={{ _dark: "blackAlpha.50", _light: "white" }}
          key={genre.id}
          w={"100%"}
          _hover={{
            transform : 'scale(1.03)',
            _dark: { borderBottom: "1px solid #282828ff" },
            _light: { borderBottom: "1px solid #242424ff" },
          }}
        >
          {genre.name}
        </Button>
      ))}
    </Stack>
  );
};

export default GenreList;
