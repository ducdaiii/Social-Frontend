import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice"
import { authApi } from "../api/authApi";
import { userApi } from "../api/userApi";
import { postApi } from "../api/postApi";
import { roleApi } from "../api/roleApi";
import { commentApi } from "../api/commentApi";
import { projectProgressUpdateApi } from "../api/projectProgressApi";
import { projectJoinRequestApi } from "../api/projectJoinRequestApi";
import { projectForumApi } from "../api/projectForumApi";
import { projectForumMessageApi } from "../api/projectForumMessageApi";
import { projectContributionApi } from "../api/projectContributionsApi";
import { partApi } from "../api/partApi";
import { mailApi } from "../api/mailApi";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [mailApi.reducerPath]: mailApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [postApi.reducerPath]: postApi.reducer,
    [partApi.reducerPath]: partApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [projectProgressUpdateApi.reducerPath]: projectProgressUpdateApi.reducer,
    [projectJoinRequestApi.reducerPath]: projectJoinRequestApi.reducer,
    [projectForumApi.reducerPath]: projectForumApi.reducer,
    [projectForumMessageApi.reducerPath]: projectForumMessageApi.reducer,
    [projectContributionApi.reducerPath]: projectContributionApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      mailApi.middleware,
      userApi.middleware,
      postApi.middleware,
      commentApi.middleware,
      roleApi.middleware,
      partApi.middleware,
      projectProgressUpdateApi.middleware,
      projectJoinRequestApi.middleware,
      projectForumApi.middleware,
      projectForumMessageApi.middleware,
      projectContributionApi.middleware,
    ),
});

export default store;