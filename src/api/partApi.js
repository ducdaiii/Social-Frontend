import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../hooks";

export const partApi = createApi({
  reducerPath: "partApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Part"],
  endpoints: (builder) => ({
    // POST /parts
    createPart: builder.mutation({
      query: (data) => ({
        url: "parts",
        method: "POST",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Part"],
    }),

    // GET /parts/:id
    getPartById: builder.query({
      query: (id) => `parts/${id}`,
    }),

    // PUT /parts/:id
    updatePart: builder.mutation({
      query: ({ id, data }) => ({
        url: `parts/${id}`,
        method: "PUT",
        body: data,
        formData: true,
      }),
      invalidatesTags: ["Part"],
    }),

    // DELETE /parts/:id
    deletePart: builder.mutation({
      query: (id) => ({
        url: `parts/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useCreatePartMutation,
  useGetPartByIdQuery,
  useUpdatePartMutation,
  useDeletePartMutation,
} = partApi;
