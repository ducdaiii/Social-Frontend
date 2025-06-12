import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../hooks/index";

// Public base query for unauthenticated routes (register, login)
const publicBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
});

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
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

    // Google and GitHub callback
    googleCallback: builder.query({
      query: (code) => `auth/google/callback?code=${code}`,
    }),

    githubCallback: builder.query({
      query: (code) => `auth/github/callback?code=${code}`,
    }),

    // Refresh token
    refresh: builder.mutation({
      query: (data) => ({
        url: "auth/refresh",
        method: "POST",
        body: data,
      }),
    }),

    // Get current logged-in user
    getMe: builder.query({
      query: () => ({
        url: "auth/me",
        method: "GET",
      }),
      providesTags: ["User"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

// Export the generated hooks for each endpoint
export const {
  useRegisterMutation,
  useLoginMutation,
  useGoogleCallbackQuery,
  useGithubCallbackQuery,
  useRefreshMutation,
  useGetMeQuery,
  useLogoutMutation,
} = authApi;
