import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const projectForumApi = createApi({
  reducerPath: 'projectForumApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    // POST /project-forums
    createForum: builder.mutation({
      query: (data) => ({
        url: 'project-forums',
        method: 'POST',
        body: data,
      }),
    }),

    // GET /project-forums
    getForums: builder.query({
      query: () => 'project-forums',
    }),

    // GET /project-forums/:id
    getForumById: builder.query({
      query: (id) => `project-forums/${id}`,
    }),

    // PUT /project-forums/:id
    updateForum: builder.mutation({
      query: ({ id, data }) => ({
        url: `project-forums/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    // DELETE /project-forums/:id
    deleteForum: builder.mutation({
      query: (id) => ({
        url: `project-forums/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateForumMutation,
  useGetForumsQuery,
  useGetForumByIdQuery,
  useUpdateForumMutation,
  useDeleteForumMutation,
} = projectForumApi;