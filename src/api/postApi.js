import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../hooks";

const publicBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  });

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    createPost: builder.mutation({
      query: (data) => ({
        url: "posts",
        method: "POST",
        body: data,
      }),
    }),
    getPosts: builder.query({
      query: () => "posts/random",
    }),
    getPostById: builder.query({
      query: (id) => `posts/${id}`,
    }),
    updatePost: builder.mutation({
      query: ({ id, data }) => ({
        url: `posts/${id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}`,
        method: "DELETE",
      }),
    }),
    likePost: builder.mutation({
      query: (id) => ({
        url: `posts/${id}/like`,
        method: "PUT",
      }),
    }),
  }),
});

export const { useCreatePostMutation, useGetPostsQuery, useGetPostByIdQuery, useUpdatePostMutation, useDeletePostMutation, useLikePostMutation } = postApi;