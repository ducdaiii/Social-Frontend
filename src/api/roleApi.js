import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../hooks";

const publicBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  });

export const roleApi = createApi({
  reducerPath: "roleApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getRoles: builder.query({
      query: () => "roles",
    }),
  }),
});

export const { useGetRolesQuery } = roleApi;