import { Box, Card, Skeleton, SkeletonText, Stack } from "@chakra-ui/react";

const MovieDetailSkeleton = () => {
  return (
    <Box display={"flex"} flexDirection={{mdTo2xl : 'row', mdDown : 'column'}} gap={"2rem"} ml={"2rem"} alignItems={"center"}>
      <Card.Root borderRadius={"1rem"} overflow={"hidden"} p={"1rem"}>
        <Skeleton height={"450px"} w={"400px"} />
      </Card.Root>
      <Stack w={'80%'} height={'80%'}>
        <SkeletonText />
        <SkeletonText />
        <SkeletonText />
      </Stack>
    </Box>
  );
};

export default MovieDetailSkeleton;
