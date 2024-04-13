import { createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Config from "./pages/Config";
import OurProfile from "./pages/OurProfile";
import WhoAreWe from "./pages/WhoAreWe";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import About from "./pages/About";
import MeetTheTeam from "./pages/MeetTheTeam";
import History from "./pages/History";
import LegalDocuments from "./pages/LegalDocuments";
import Certifications from "./pages/Certifications";

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
        path:'/about',
        element:<About/>
    },
    {
        path:'/meet-the-team',
        element:<MeetTheTeam/>
    },
    {
         path:'/history',
         element:<History/>
    },
    {
        path:'/legal-documents',
        element:<LegalDocuments/>
    },
    {
        path:"/certifications",
        element:<Certifications/>
    },
    {
        path:"*",
        element:<NotFound/>
    }
])