import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { decodeUser } from "./redux/authSlice";
import "./App.css";
import router from "./router";
import { Suspense } from "react";
import store from "./redux/store";

const queryClient = new QueryClient();

const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("🚀 Dispatching decodeUser...");
    dispatch(decodeUser());
  }, [dispatch]);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<div className="loading-spinner">Đang tải...</div>}>
        <RouterProvider router={router} />
      </Suspense>
    </QueryClientProvider>
  );
};

const App = () => (
  <Provider store={store}>
    <AppContent />
  </Provider>
);

export default App;