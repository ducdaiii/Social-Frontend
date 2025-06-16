import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../hooks";

export const projectForumApi = createApi({
  reducerPath: "projectForumApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // GET /project-forums/:id
    getForumById: builder.query({
      query: (id) => `project-forums/${id}`,
    }),

    getMessagesByProject: builder.query({
      query: (projectId) => `project-forums/project/${projectId}/messages`,
    }),

    // DELETE /project-forums/:id
    deleteForum: builder.mutation({
      query: (id) => ({
        url: `project-forums/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetForumByIdQuery,
  useGetMessagesByProjectQuery,
  useDeleteForumMutation,
} = projectForumApi;
