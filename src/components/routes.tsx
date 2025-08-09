import { createBrowserRouter } from "react-router-dom";
import Landing from "./Landing";
import App from "@/App";

const router = createBrowserRouter([
    {path : '/', element : <Landing/>},
    {path : '/movies', element : <App/>}
])

export default router