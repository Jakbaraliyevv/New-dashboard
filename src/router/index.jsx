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
import DebtQarzlar from "../pages/debt";
import KirimIncomimng from "../pages/kirim";
import Opretors from "../pages/operators";
import Expenses from "../pages/expenses";
import Banks from "../pages/banks";
import Foydalar from "../pages/foydalar";
import OperatorRecords from "../pages/operator-records";
import Summalar from "../pages/summalar";

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
          { path: "/debt", element: <DebtQarzlar /> },
          { path: "/kirim", element: <KirimIncomimng /> },
          { path: "/operators", element: <Opretors /> },
          { path: "/expenses", element: <Expenses /> },
          { path: "/banks", element: <Banks /> },
          { path: "/foydalar", element: <Foydalar /> },
          { path: "/operator-records", element: <OperatorRecords /> },
          { path: "/summalar", element: <Summalar /> },
        ],
      },
    ],
  },
]);
