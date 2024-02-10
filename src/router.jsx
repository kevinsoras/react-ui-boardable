import { createBrowserRouter } from "react-router-dom";
import {App, AppLoader} from "./routes/App";
import { Login,LoginAction } from "./routes/Login";

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
  }
]);