import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Config from "./pages/Config";

export const router = createBrowserRouter([
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:'/',
        element:<Config/>
    },
    {
        path:"*",
        element:<NotFound/>
    }
])