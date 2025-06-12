import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
  token: null,
  authReady: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userInfo = action.payload;
      state.token = action.payload.accessToken || action.payload.token;
      state.loading = false;
      state.error = null;
      state.authReady = true;
    },
    logout: (state) => {
      state.userInfo = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.authReady = true;
    },
    tokenRefreshed: (state, action) => {
      state.token = action.payload.accessToken || action.payload.token;
    },
    setAuthReady: (state) => {
      state.authReady = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.getMe.matchPending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, action) => {
        state.loading = false;
        state.userInfo = action.payload;
        state.authReady = true;
      })
      .addMatcher(authApi.endpoints.getMe.matchRejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.userInfo = null;
        state.authReady = true;
      });
  },
});

export const { setAuthReady, setUser, logout, tokenRefreshed } = authSlice.actions;
export default authSlice.reducer;
