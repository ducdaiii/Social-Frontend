import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const projectContributionApi = createApi({
  reducerPath: 'projectContributionApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    // POST /project-contributions
    createContribution: builder.mutation({
      query: (data) => ({
        url: 'project-contributions',
        method: 'POST',
        body: data,
      }),
    }),

    // GET /project-contributions
    getContributions: builder.query({
      query: () => 'project-contributions',
    }),

    // GET /project-contributions/:id
    getContributionById: builder.query({
      query: (id) => `project-contributions/${id}`,
    }),

    // PUT /project-contributions/:id
    updateContribution: builder.mutation({
      query: ({ id, data }) => ({
        url: `project-contributions/${id}`,
        method: 'PUT',
        body: data,
      }),
    }),

    // DELETE /project-contributions/:id
    deleteContribution: builder.mutation({
      query: (id) => ({
        url: `project-contributions/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useCreateContributionMutation,
  useGetContributionsQuery,
  useGetContributionByIdQuery,
  useUpdateContributionMutation,
  useDeleteContributionMutation,
} = projectContributionApi;
