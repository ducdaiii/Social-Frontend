// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { useRefreshMutation } from "../api/authApi";
// import { logout, setAuthReady, setUser } from "../redux/authSlice";
// import LoadingMotion from "../components/err/LoadingMotion";

// const AuthInitializer = ({ children }) => {
//   const dispatch = useDispatch();
//   const authReady = useSelector((state) => state.auth.authReady);
//   const [refreshToken, { isLoading }] = useRefreshMutation();

//   useEffect(() => {
//     const initAuth = async () => {
//       try {
//         const res = await refreshToken().unwrap();
//         dispatch(setUser(res.user));
//       } catch {
//         dispatch(logout());
//       } finally {
//         dispatch(setAuthReady());
//       }
//     };

//     if (!authReady) {
//       initAuth();
//     }
//   }, [dispatch, refreshToken, authReady]);

//   if (!authReady || isLoading) return <LoadingMotion />;

//   return children;
// };

// export default AuthInitializer;