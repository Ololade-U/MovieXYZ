import { HStack, Image, Text } from '@chakra-ui/react'
import logo from '../assets/logo.webp'
import { ColorModeButton } from './ui/color-mode'
const NavBar = () => {
  return (
    <HStack justifyContent={'space-between'} p={'1rem'}>
      <Image src={logo} boxSize={'3.5rem'}/>
      <HStack gap={0} alignItems={'center'}>
        <ColorModeButton/>
        <Text>Dark mode</Text>
      </HStack>
    </HStack>
  )
}

export default NavBar