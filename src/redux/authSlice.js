import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { decodeToken } from "react-jwt"; 

// Async thunk để decode token và lấy userInfo
export const decodeUser = createAsyncThunk("jwt", async () => {
  const userToken = localStorage.getItem("accessToken");
  if (userToken) {
    const decoded = decodeToken(userToken);
    if (decoded) {
      localStorage.setItem("userInfo", JSON.stringify(decoded)); 
    }
    return decoded || null;
  }
  return null;
});

const initialState = {
  accessToken: localStorage.getItem("accessToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
  code: localStorage.getItem("userInfo") || null, 
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setTokens: (state, action) => {
      state.code = action.payload;
    },
    logout: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.code = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userInfo"); 
    },
  },
  extraReducers: (builder) => {
    builder.addCase(decodeUser.fulfilled, (state, action) => {
      state.code = action.payload;
    });
  },
});

export const { setTokens, logout } = authSlice.actions;
export default authSlice.reducer;
