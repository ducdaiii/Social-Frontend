import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../hooks";

const publicBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
});

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "users/all",
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
      baseQuery: publicBaseQuery,
    }),
    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `users/${id}`,
        method: "PUT",
        body: data,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
    }),
    followUser: builder.mutation({
      query: (id) => ({
        url: `users/follow/${id}`,
        method: "POST",
      }),
    }),
    unfollowUser: builder.mutation({
      query: (id) => ({
        url: `users/unfollow/${id}`,
        method: "POST",
      }),
    }),
    getfollowList: builder.query({
      query: (id) => `users/${id}/following`,
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useGetfollowListQuery,
} = userApi;
