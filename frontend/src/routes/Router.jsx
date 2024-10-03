import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUp from "../pages/SignUp";
import WatchPage from "../pages/WatchPage"; 
import Layout from "./layout";
import NotFound from '../common/NotFound'
import Error from '../common/Error'
import Movie from  '../pages/Movie'



const Router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            { path: '/', element: <HomePage /> },
            { path: '/user/login', element: <LoginPage /> },
            { path: '/user/signup', element: <SignUp /> },
            { path: '/error', element: <Error/> },
            { path: '/*', element: <NotFound/> },
            { path: '/user/movie', element: <Movie/> },
            { path: '/movies', element: <Movie/> },
            { path: '/tvshows', element: <Movie/> },
            { path: '/watch/:id', element: <WatchPage/> },
        ]
    }
])

export default Router