import { createBrowserRouter } from "react-router-dom";
import {App, AppLoader} from "./routes/App";
import { Login,LoginAction } from "./routes/Login";
import { PageBoards, PageBoardsLoader } from "./routes/PageBoards";
import { NotFoundPage } from "./routes/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    loader:AppLoader, 
    element: <App />
  },
  {
    path:"/login",
    action:LoginAction,
    element:<Login/>
  },
  {
    path:"/boards/:boardId",
    element:<PageBoards/>,
    loader:PageBoardsLoader
  },
  // Agrega una ruta para manejar rutas no encontradas (404)
  {
    path: "*",
    element: <NotFoundPage />
  }
]);