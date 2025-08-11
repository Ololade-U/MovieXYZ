import { Box, Field, Heading, HStack, Image, Input } from "@chakra-ui/react";
import logo from "../assets/logo.webp";
import { ColorModeButton } from "./ui/color-mode";
import { RxHamburgerMenu } from "react-icons/rx";

interface Prop {
  onClick: () => void;
}

const NavBar = ({ onClick }: Prop) => {
  return (
    <HStack
      justifyContent={"space-between"}
      h={"100%"}
      alignItems={"center"}
      p={"0 1rem"}
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
      <Field.Root w={'60%'}>
        <Input p={'0 1rem'} borderRadius={'.7rem'} placeholder="Search" />
      </Field.Root>
      <ColorModeButton />
    </HStack>
  );
};

export default NavBar;
