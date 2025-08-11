import { Card, Skeleton, SkeletonText } from "@chakra-ui/react";

const MovieCardSkeleton = () => {
  return (
    <Card.Root borderRadius={"1rem"} overflow={"hidden"} p={"1rem"}>
      <Skeleton height={"350px"} />
      <Card.Body p={0}>
        <SkeletonText />
      </Card.Body>
    </Card.Root>
  );
};

export default MovieCardSkeleton;
