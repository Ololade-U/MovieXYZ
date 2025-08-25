import { Outlet } from "react-router-dom";
import MovieDetailNav from "./MovieDetailNav";


const MovieDetailPage = () => {
  

  // console.log(data?.seasons.length)


  return (
    <>
      <MovieDetailNav />
      <Outlet/>
    </>
  );
};

export default MovieDetailPage;
