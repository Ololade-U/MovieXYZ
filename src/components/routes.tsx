import { createBrowserRouter } from "react-router-dom";
import Landing from "./Landing";
import App from "@/App";
import MovieDetailPage from "./MovieDetailPage";

 

  const router = createBrowserRouter([
    { path: "/", element: <Landing /> },
    {
      path: "/movies",
      element: (
        <App/>
      ),
    },
    { path: "/movies/:id/:title", element: <MovieDetailPage /> },
  ]);

  export default router ;
