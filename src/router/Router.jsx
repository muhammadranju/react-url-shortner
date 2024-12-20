import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import App from "../App";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardOutlet from "../pages/Dashboard/DashboardOutlet";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoute";
import Redirect from "../pages/Redirect/Redirect";
import Profile from "../pages/Profile/Profile";
import Analytics from "../pages/Analytics/Analytics";
import LimitExceeded from "../pages/LimitExceeded/LimitExceeded";
import NotFound from "../pages/NotFound/NotFound";
import NotFoundOutlet from "../components/NotFoundOutlet/NotFoundOutlet";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundOutlet />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/",
        element: <DashboardOutlet />,
        children: [
          {
            path: "user/dashboard",

            element: (
              <PrivateRoutes>
                <Dashboard />
              </PrivateRoutes>
            ),
          },
        ],
      },
      {
        path: "user/profile",
        element: (
          <PrivateRoutes>
            <Profile />
          </PrivateRoutes>
        ),
      },
      {
        path: "auth/login",
        element: <Login />,
      },
      {
        path: "auth/register",
        element: <Register />,
      },
      {
        path: "r/:id",
        element: <Redirect />,
      },
      {
        path: "analytics/:id",
        element: <Analytics />,
      },
      {
        path: "limit-over",
        element: <LimitExceeded />,
      },
      {
        path: "not-found",
        element: <NotFound />,
      },
    ],
  },
]);

export default Router;
