import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./layouts/Layout";
import TestNet from "./pages/TestNet";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/page201", element: <TestNet /> },
    ],
  },
]);

export default router;