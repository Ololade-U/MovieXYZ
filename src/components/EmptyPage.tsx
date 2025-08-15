import { Box, Text } from '@chakra-ui/react'

const EmptyPage = () => {
  return (
    <Box height={'60vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Text fontSize={'2xl'}>No results found for your search.</Text>
    </Box>
  )
}

export default EmptyPage