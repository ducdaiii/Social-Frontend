import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const projectProgressUpdateApi = createApi({
  reducerPath: 'projectProgressUpdateApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    // POST /project-progress-updates
    createProgressUpdate: builder.mutation({
      query: (data) => ({
        url: 'project-progress-updates',
        method: 'POST',
        body: data,
      }),
    }),

    // GET /project-progress-updates
    getProgressUpdates: builder.query({
      query: () => 'project-progress-updates',
    }),

    // GET /project-progress-updates/:id
    getProgressUpdateById: builder.query({
      query: (id) => `project-progress-updates/${id}`,
    }),

    // PUT /project-progress-updates/:id
    updateProgressUpdate: builder.mutation({
      query: ({ id, data }) => ({
        url: `project-progress-updates/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    // DELETE /project-progress-updates/:id
    deleteProgressUpdate: builder.mutation({
      query: (id) => ({
        url: `project-progress-updates/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateProgressUpdateMutation,
  useGetProgressUpdatesQuery,
  useGetProgressUpdateByIdQuery,
  useUpdateProgressUpdateMutation,
  useDeleteProgressUpdateMutation,
} = projectProgressUpdateApi;