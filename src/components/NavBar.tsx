import { Box, Heading, HStack, Input } from "@chakra-ui/react";
import { ColorModeButton} from "./ui/color-mode";
import { RxHamburgerMenu } from "react-icons/rx";
import { useRef } from "react";

interface Prop {
  onClick: () => void;
  onSubmit: (searchRef: string | undefined) => void;
}

const NavBar = ({ onClick, onSubmit }: Prop) => {
  const searchRef = useRef<HTMLInputElement>(null);
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
          <RxHamburgerMenu size={"1.5rem"} onClick={onClick} />
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
            onSubmit(searchRef.current.value);
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
      <ColorModeButton />
    </HStack>
  );
};

export default NavBar;
