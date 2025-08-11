import { Box, Field, Heading, HStack, Input } from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";
import { RxHamburgerMenu } from "react-icons/rx";
import { useRef, type RefObject } from "react";

interface Prop {
  onClick: () => void;
  onChange: (searchRef : string | undefined) => void
}

const NavBar = ({ onClick, onChange }: Prop) => {

  const searchRef = useRef<HTMLInputElement>(null)
  return (
    <HStack
      justifyContent={"space-between"}
      h={"100%"}
      alignItems={"center"}
      p={"0 1rem"}
      w={'100%'}
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
        <Input ref={searchRef} onChange={() => onChange(searchRef.current?.value)} p={'0 1rem'} borderRadius={'.7rem'} placeholder="Search" />
      </Field.Root>
      <ColorModeButton />
    </HStack>
  );
};

export default NavBar;
