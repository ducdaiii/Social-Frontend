import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../hooks";

const publicBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL,
});

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    addComment: builder.mutation({
      query: (data) => ({
        url: "comments",
        method: "POST",
        body: data,
      }),
    }),
    getCommentsByPost: builder.query({
      query: (postId) => `comments/${postId}`,
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `comments/${commentId}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddCommentMutation,
  useGetCommentsByPostQuery,
  useDeleteCommentMutation,
} = commentApi;
