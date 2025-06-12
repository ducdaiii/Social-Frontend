import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import TestNet from "./pages/TestNet";
import Login from "./pages/Login";
import Register from "./pages/SignUp";
import Layout from "./pages/Layout";
import UserListPage from "./pages/UserListPage";
import OAuthCallback from "./pages/OAuthCallback";
import OAuth2Callback from "./pages/OAuth2Callback";
import PostDetail from "./pages/PostDetail";
import ErrorPage from "./components/err/ErrorPage";
import UserDetail from "./pages/UserDetail";

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
      { path: "/page201", element: <TestNet /> },
      { path: "*", element: <ErrorPage /> },
      { path: "/users", element: <UserListPage /> },
      { path: "/auth/google/callback", element: <OAuthCallback /> },
      { path: "/auth/github/callback", element: <OAuth2Callback /> },
      { path: "/post/:id", element: <PostDetail /> },
      { path: "/detail/:id", element: <UserDetail /> },
    ],
  },
]);

export default router;