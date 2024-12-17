import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import App from "../App";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import DashboardOutlet from "../pages/Dashboard/DashboardOutlet";
import Dashboard from "../pages/Dashboard/Dashboard";
import PrivateRoutes from "./PrivateRoute";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <h1>Error</h1>,
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
            path: "dashboard",

            element: (
              <PrivateRoutes>
                <Dashboard />
              </PrivateRoutes>
            ),
          },
        ],
      },
      {
        path: "profile",
        element: <Login />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "limit-over",
        element: <h1>Limit Over</h1>,
      },
      {
        path: "not-found",
        element: <h1>URL Not Found</h1>,
      },
    ],
  },
]);

export default Router;
