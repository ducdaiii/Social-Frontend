import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from '../hooks';

export const projectForumMessageApi = createApi({
  reducerPath: 'projectForumMessageApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // POST /project-forum-messages
    createForumMessage: builder.mutation({
      query: (data) => ({
        url: 'project-forum-messages',
        method: 'POST',
        body: data,
      }),
    }),

    // GET /project-forum-messages/:id
    getForumMessageById: builder.query({
      query: (id) => `project-forum-messages/${id}`,
    }),

    // PUT /project-forum-messages/:id
    updateForumMessage: builder.mutation({
      query: ({ id, data }) => ({
        url: `project-forum-messages/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    // DELETE /project-forum-messages/:id
    deleteForumMessage: builder.mutation({
      query: (id) => ({
        url: `project-forum-messages/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateForumMessageMutation,
  useGetForumMessageByIdQuery,
  useUpdateForumMessageMutation,
  useDeleteForumMessageMutation,
} = projectForumMessageApi;