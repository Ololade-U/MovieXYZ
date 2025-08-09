
import { Grid, GridItem } from "@chakra-ui/react";
import Landing from "./components/Landing";
import NavBar from "./components/NavBar";
import GenreList from "./components/GenreList";
import MovieGrid from "./components/MovieGrid";

const App = () => {
  return (
    <Grid
      templateAreas={{
        mdTo2xl: `"nav nav" "aside main"`,
        mdDown: `"nav" "main"`,
      }}
      templateColumns={{
        mdDown : '1fr',
        mdTo2xl : '150px 1fr'
      }}
      // templateRows={'80px 1fr'}
      overflow={'hidden'}
    >
      <GridItem area={'nav'} overflow={'hidden'} height={'13vh'}  borderBottom={'1px solid #e3e3e3'}>
        <NavBar/>
      </GridItem>
      <GridItem hideBelow={'md'} area={'aside'} py={'1.5rem'} scrollbar={'hidden'} overflowY={'scroll'} height={'87vh'}>
        <GenreList/>
      </GridItem>
      <GridItem area={'main'} overflowY={'scroll'} scrollbar={'hidden'}  height={'87vh'}>
        <MovieGrid/>
      </GridItem>
    </Grid>
  );
};

export default App;
