import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../hooks";

const publicBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  });

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "chat/send",
        method: "POST",
        body: data,
      }),
    }),
    getMessages: builder.query({
      query: ({ senderId, receiverId }) => `chat/${senderId}/t/${receiverId}`,
    }),
  }),
});

export const { useSendMessageMutation, useGetMessagesQuery } = chatApi;