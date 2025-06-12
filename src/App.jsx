import { RouterProvider } from "react-router-dom";
import { Provider, useDispatch, useSelector } from "react-redux";
import "./App.css";
import router from "./router";
import store from "./redux/store";
import { useGetMeQuery } from "./api/authApi";
import { setUser, logout, setAuthReady } from "./redux/authSlice";
import { useEffect } from "react";
import LoadingMotion from "./components/err/LoadingMotion";

const RootWrapper = () => {
  const dispatch = useDispatch();
  const { token ,authReady, userInfo } = useSelector((state) => state.auth);

  const shouldFetchUser = !authReady || !userInfo || !token;

  const {
    data,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMeQuery(undefined, {
    skip: !shouldFetchUser,
  });

  useEffect(() => {
    if (isSuccess && data) {
      dispatch(setUser(data)); 
      dispatch(setAuthReady());
    }

    if (isError && error) {
      dispatch(logout()); 
      dispatch(setAuthReady());
    }
  }, [isSuccess, isError, data, error, dispatch]);

  if (!authReady || (shouldFetchUser && isLoading)) {
    return <LoadingMotion />;
  }

  return <RouterProvider router={router} />;
};


const App = () => (
  <Provider store={store}>
    <RootWrapper />
  </Provider>
);

export default App;
