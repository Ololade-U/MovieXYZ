import { createBrowserRouter } from "react-router-dom";
import Landing from "./Landing";
import App from "@/App";
import MovieDetailPage from "./MovieDetailPage";
import Details from "./Details";
import Watchlist from "./Watchlist";

 

  const router = createBrowserRouter([
    { path: "/", element: <Landing /> },
    {
      path: "/movies",
      element: (
        <App/>
      ),
    },
    { path: "/movies", element: <MovieDetailPage />, children : [
      {path : ':id/:title', element : <Details/>},
      {path : 'watchlist', element : <Watchlist/>}
    ]},
  ]);

  export default router ;
