import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
    {
        path:'/login',
        element:<Login/>
    },
    {
        path:"*",
        element:<NotFound/>
    }
])