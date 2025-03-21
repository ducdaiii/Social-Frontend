import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import cryptoWebSocketReducer from "./wsSlice";
import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";
import { chatApi } from "../api/chatApi";
import { postApi } from "../api/postApi";
import { roleApi } from "../api/roleApi";
import { cryptoApi } from "../api/cryptoApi";
import { walletApi } from "../api/walletApi";
import { commentApi } from "../api/commentApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cryptoWebSocket: cryptoWebSocketReducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [chatApi.reducerPath]: chatApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [walletApi.reducerPath]: walletApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      userApi.middleware,
      chatApi.middleware,
      postApi.middleware,
      commentApi.middleware,
      roleApi.middleware,
      cryptoApi.middleware,
      walletApi.middleware
    ),
});

export default store;