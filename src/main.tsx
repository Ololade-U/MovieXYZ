import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "./components/ui/provider.tsx";
import "./App.css"
import { RouterProvider } from "react-router-dom";
import router from "./components/routes.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider>
      <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
);
