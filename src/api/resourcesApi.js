import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../hooks";

export const resourcesApi = createApi({
  reducerPath: "resourcesApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getResources: builder.query({
      query: () => "resources",
    }),
  }),
});

export const { useGetResourcesQuery } = resourcesApi;
