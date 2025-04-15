import { createBrowserRouter } from "react-router-dom";
import Home1 from "../pages/home1";
import Home2 from "../pages/home2";
import Home3 from "../pages/home3";
import Home4 from "../pages/home4";
import NewHome from "../pages/newHome";
import NEwHome from "../components/newhome";
import NEw2 from "../components/new2";
import BenzinTurlari from "../components/benzin-turlari";
import Login from "../components/auth/login";
import Register from "../components/auth/register";
import MainLayout from "../components/main-layout";
import PrivateRoute from "../components/privite-router";
import OutGoingchiqim from "../pages/outgoing";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: <PrivateRoute />, // Login qilgan foydalanuvchilar uchun
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          { path: "/", element: <Home1 /> },
          { path: "/home2", element: <Home2 /> },
          { path: "/home3", element: <Home3 /> },
          { path: "/home4", element: <Home4 /> },
          { path: "/new-home", element: <NewHome /> },
          { path: "/newhome", element: <NEwHome /> },
          { path: "/new2", element: <NEw2 /> },
          { path: "/benzin-turlari", element: <BenzinTurlari /> },
          { path: "/outgoing", element: <OutGoingchiqim /> },
        ],
      },
    ],
  },
]);
