import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../hooks";

const publicBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
});

export const projectJoinRequestApi = createApi({
  reducerPath: "joinApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    // POST /join
    createJoinRequest: builder.mutation({
      query: (data) => ({
        url: "join",
        method: "POST",
        body: data,
      }),
    }),

    // GET /join/:id
    getJoinRequestById: builder.query({
      query: (id) => `join/${id}`,
    }),

    checkHasJoinRequest: builder.query({
      query: ({ project, user }) => ({
        url: `join/check`,
        params: { project, user },
      }),
    }),

    approveJoinRequest: builder.mutation({
      query: (id) => ({
        url: `join/${id}/approve`,
        method: "PATCH",
      }),
    }),

    rejectJoinRequest: builder.mutation({
      query: (id) => ({
        url: `join/${id}/reject`,
        method: 'PATCH',
      }),
    }),
  }),
});

export const {
  useCreateJoinRequestMutation,
  useGetJoinRequestByIdQuery,
  useCheckHasJoinRequestQuery,
  useApproveJoinRequestMutation,
  useRejectJoinRequestMutation,
} = projectJoinRequestApi;
