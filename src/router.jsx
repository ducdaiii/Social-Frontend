import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import TestNet from "./pages/TestNet";
import Login from "./pages/Login";
import Register from "./pages/SignUp"
import Layout from "./pages/Layout";
import ChatPage from "./pages/ChatPage";
import CryptoList from "./components/CryptoList";
import UserListPage from "./pages/UserListPage";
import GoogleCallback from "./features/auth/GoogleCallback";
import ErrorPage from "./features/err/ErrorPage";

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
      { path: "/maket", element: <CryptoList /> },
      { path: "/page201", element: <TestNet /> },
      { path: "/mess", element: <ChatPage /> },
      { path: "*", element: <ErrorPage /> },
      { path: "/userRequest", element: <UserListPage /> },
      { path: "/auth/google/callback", element: <GoogleCallback /> },
    ],
  },
]);

export default router;