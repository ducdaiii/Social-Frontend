import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../hooks/index";

// Public base query for unauthenticated routes (register, login)
const publicBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // Register mutation (no need for auth token)
    register: builder.mutation({
      query: (data) => ({
        url: "auth/register",
        method: "POST",
        body: data,
      }),
      baseQuery: publicBaseQuery, 
    }),
    
    // Login mutation (no need for auth token)
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
      baseQuery: publicBaseQuery, 
    }),
    
    googleCallback: builder.query({
      query: (code) => `auth/google/callback?code=${code}`,
    }),      
    
    // Refresh token mutation (auth required)
    refresh: builder.mutation({
      query: (data) => ({
        url: "auth/refresh",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

// Export the generated hooks for each mutation
export const {
  useRegisterMutation,
  useLoginMutation,
  useGoogleCallbackQuery,
  useRefreshMutation,
} = authApi;