import { Box, Heading, HStack, Input } from "@chakra-ui/react";
import { ColorModeButton} from "./ui/color-mode";
import { RxHamburgerMenu } from "react-icons/rx";
import { useRef } from "react";
import useMovieQueryStore from "./Store";
import { TfiMenuAlt } from "react-icons/tfi";
import { Link } from "react-router-dom";



const NavBar = () => {
  const searchRef = useRef<HTMLInputElement>(null);
  const handleClick = useMovieQueryStore((s) => s.handleClick)
  const setSearchParam = useMovieQueryStore(s => s.setSearchParam)
  const selectedType = useMovieQueryStore(s => s.MovieQuery.selectedType)

  return (
    <HStack
      justifyContent={"space-between"}
      h={"100%"}
      alignItems={"center"}
      p={"0 1rem"}
      w={"100%"}
    >
      <HStack alignItems={"center"}>
        <Box hideFrom={"md"}>
          <RxHamburgerMenu size={"1.5rem"} onClick={() =>handleClick()} />
        </Box>
        <Heading
          color={"red"}
          fontSize={{ mdTo2xl: "3xl", mdDown: "lg" }}
          fontWeight={"bolder"}
        >
          MovieXYZ
        </Heading>
      </HStack>

      <form
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          if (searchRef.current) {
            setSearchParam(searchRef.current.value, selectedType);
          }
        }}
      >
        <Input
          ref={searchRef}
          p={"0 1rem"}
          borderRadius={".7rem"}
          placeholder="Search"
        />
      </form>
      <HStack alignItems={'center'}>
      <Link to={'/movies/watchlist'}>
      <TfiMenuAlt title="Watchlist" size={"1.3rem"} cursor={'pointer'} />
      </Link>
      <ColorModeButton />
      </HStack>
    </HStack>
  );
};

export default NavBar;
