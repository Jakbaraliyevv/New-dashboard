import { createBrowserRouter } from "react-router-dom";
import Home1 from "../pages/home1";
import Home3 from "../pages/home3";
import Home2 from "../pages/home2";
import NewHome from "../pages/newHome";
import MainLayout from "../components/main-layout";
import Home4 from "../pages/home4";
import NEwHome from "../components/newhome";
import NEw2 from "../components/new2";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home1 />,
      },
      {
        path: "/home2",
        element: <Home2 />,
      },
      {
        path: "/home3",
        element: <Home3 />,
      },
      {
        path: "/home4",
        element: <Home4 />,
      },
      {
        path: "/new-home",
        element: <NewHome />,
      },
      {
        path: "/newhome",
        element: <NEwHome />,
      },
      {
        path: "/new2",
        element: <NEw2 />,
      },
    ],
  },
]);
