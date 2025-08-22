import { Heading, HStack, Input } from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";



const MovieDetailNav = () => {
 const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  return (
    <HStack
      justifyContent={"space-between"}  
      alignItems={"center"}
      p={"0 1rem"}
      w={"100%"}
      overflow={"hidden"}
      height={"13vh"}
      borderBottom={"1px solid #e3e3e3"}
      // pos={{ mdDown: "fixed" }}
      zIndex={"20"}
      bgColor={{ _dark: "black", _light: "white" }}
    >
      <IoMdArrowBack cursor={'pointer'} onClick={()=> handleBack()} size={'1.5rem'}/>
      <Heading
        color={"red"}
        fontSize={{ mdTo2xl: "3xl", mdDown: "lg" }}
        fontWeight={"bolder"}
      >
        MovieXYZ
      </Heading>
      <form>
        <Input p={"0 1rem"} borderRadius={".7rem"} placeholder="Search" />
      </form>
      <ColorModeButton />
    </HStack>
  );
};

export default MovieDetailNav;
