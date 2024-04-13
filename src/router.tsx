import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Config from "./pages/Config";
import OurProfile from "./pages/OurProfile";
import WhoAreWe from "./pages/WhoAreWe";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";

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
        path:'/profile',
        element:<OurProfile/>
    },
    {
        path:'/who-are-we',
        element:<WhoAreWe/>
    },
    {
        path:'/services',
        element:<Services/>
    },
    {
        path:'/gallery',
        element:<Gallery/>
    },
    {
        path:"*",
        element:<NotFound/>
    }
])