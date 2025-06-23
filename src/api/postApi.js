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

    giveStar: builder.mutation({
      query: ({ id, userId }) => ({
        url: `projects/${id}/star`,
        method: "POST",
        body: { userId },
      }),
    }),

    obscureProject: builder.mutation({
      query: ({ id, userId }) => ({
        url: `projects/${id}/obscure`,
        method: "POST",
        body: { userId },
      }),
    }),

    rankProject: builder.query({
      query: () => "projects/top-star-obscure",
      baseQuery: publicBaseQuery,
    }),

    topRoles: builder.query({
      query: () => "projects/top-roles",
      baseQuery: publicBaseQuery,
    }),

    topTags: builder.query({
      query: () => "projects/top-tags",
      baseQuery: publicBaseQuery,
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
  useGiveStarMutation,
  useObscureProjectMutation,
  useRankProjectQuery,
  useTopRolesQuery,
  useTopTagsQuery
} = postApi;
