import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../hooks";

const publicBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
});

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    // POST /projects
    createProject: builder.mutation({
      query: (data) => ({
        url: "projects",
        method: "POST",
        body: data,
        formData: true,
      }),
    }),

    // GET /projects
    getProjects: builder.query({
      query: () => "projects",
    }),

    // GET /projects/:id
    getProjectById: builder.query({
      query: (id) => `projects/${id}`,
    }),

    // GET /projects/author
    getProjectsByAuthor: builder.query({
      query: (userId) => `projects/author/${userId}`,
      baseQuery: publicBaseQuery,
    }),

    // GET /projects/join
    getProjectsJoin: builder.query({
      query: (userId) => `projects/join/${userId}`,
      baseQuery: publicBaseQuery,
    }),

    // PUT /projects/:id
    updateProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `projects/${id}`,
        method: "PUT",
        body: data,
        formData: true,
      }),
    }),

    // DELETE /projects/:id
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `projects/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreateProjectMutation,
  useGetProjectsQuery,
  useGetProjectByIdQuery,
  useGetProjectsByAuthorQuery,
  useGetProjectsJoinQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = postApi;
