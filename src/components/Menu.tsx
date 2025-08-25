import { Button, HStack, Menu as Menus, Portal } from "@chakra-ui/react";
import useMovieQueryStore from "./Store";

const Menu = () => {
  const setSelectedType = useMovieQueryStore((s) => s.setSelectedType);
  const setSelectedGenre = useMovieQueryStore((s) => s.setSelectedGenre);
  const selectedType = useMovieQueryStore((s) => s.MovieQuery.selectedType);
  const setSortOrder = useMovieQueryStore((s) => s.setSortOrder);
  const sortOrder = useMovieQueryStore((s) => s.MovieQuery.sortOrder);
  const Types = ["Movie", "Tv Shows"];
  const sort = [
    { value: "", label: "Popularity" },
    { value: "primary_release_date.desc", label: "Release Date" },
    { value: "vote_count.desc", label: "Rating" },
  ];
  // <HiSortAscending />
  return (
    <>
      <HStack>
        <Menus.Root>
          <Menus.Trigger m={{mdTo2xl : ".5rem .5rem 0.7rem", mdDown : '.5rem .5rem .7rem 2.2rem'}} asChild>
            <Button px={"1rem"} variant="outline" size="sm">
              Type
            </Button>
          </Menus.Trigger>
          <Portal>
            <Menus.Positioner>
              <Menus.Content
                borderRadius={".3rem"}
                minW="6.5rem"
                p={".5rem"}
                pos={"relative"}
              >
                <Menus.RadioItemGroup
                  value={selectedType}
                  onValueChange={(e) => {
                    setSelectedType(e.value);
                    setSelectedGenre(null);
                  }}
                >
                  {Types.map((item) => (
                    <Menus.RadioItem
                      fontSize={"lg"}
                      p={".3rem .5rem .3rem 1.3rem"}
                      pos={"relative"}
                      key={item}
                      value={item}
                    >
                      {item}
                      <Menus.ItemIndicator left={"0"} pos={"absolute"} />
                    </Menus.RadioItem>
                  ))}
                </Menus.RadioItemGroup>
              </Menus.Content>
            </Menus.Positioner>
          </Portal>
        </Menus.Root>
        <Menus.Root>
          <Menus.Trigger m={".5rem .5rem 0.7rem"} asChild>
            <Button px={"1rem"} variant="outline" size="sm">
              Sort by: Popularity
            </Button>
          </Menus.Trigger>
          <Portal>
            <Menus.Positioner>
              <Menus.Content
                borderRadius={".3rem"}
                minW="8rem"
                p={".5rem"}
                pos={"relative"}
              >
                <Menus.RadioItemGroup
                  value={sortOrder}
                  onValueChange={(e) => setSortOrder(e.value)}
                >
                  {sort.map((item) => (
                    <Menus.RadioItem
                      fontSize={"lg"}
                      p={".3rem .5rem .3rem 1.3rem"}
                      pos={"relative"}
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                      <Menus.ItemIndicator left={"0"} pos={"absolute"} />
                    </Menus.RadioItem>
                  ))}
                </Menus.RadioItemGroup>
              </Menus.Content>
            </Menus.Positioner>
          </Portal>
        </Menus.Root>
      </HStack>
    </>
  );
};

export default Menu;
