import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import TestNet from "./pages/TestNet";
import Login from "./pages/Login";
import Register from "./pages/SignUp"
import Layout from "./pages/Layout";
import CryptoOverview from "./pages/CryptoOverview";


const router = createBrowserRouter([
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
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/maket", element: <CryptoOverview /> },
      { path: "/page201", element: <TestNet /> }
    ],
  },
]);

export default router;