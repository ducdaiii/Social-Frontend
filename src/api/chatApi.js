import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../hooks";

export const chatApi = createApi({
  reducerPath: "chatApi",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    getUserChats: builder.query({
      query: (userId) => `chat/user/${userId}`,
    }),
    sendMessage: builder.mutation({
      query: (data) => ({
        url: "chat/send",
        method: "POST",
        body: data,
      }),
    }),
    getChats: builder.query({
      query: ({ chatId, page = 1, limit = 20 }) =>
        `chat/${chatId}/messages?page=${page}&limit=${limit}`,
    }),
    markAsRead: builder.mutation({
      query: ({ id, userId }) => ({
        url: `chat/${id}/read`,
        method: "PATCH",
        body: { userId },
      }),
    }),
    updateMessage: builder.mutation({
      query: ({ id, data }) => ({
        url: `chat/${id}/update`,
        method: "PUT",
        body: data,
      }),
    }),
    pinMessage: builder.mutation({
      query: ({ id, chatId }) => ({
        url: `chat/${id}/pin/${chatId}`,
        method: "PATCH",
      }),
    }),
    softDeleteMessage: builder.mutation({
      query: (id) => ({
        url: `chat/message/${id}`,
        method: "DELETE",
      }),
    }),
    createPrivateChat: builder.mutation({
      query: (data) => ({
        url: "chat/private/create",
        method: "POST",
        body: data,
      }),
    }),
    createGroup: builder.mutation({
      query: (data) => ({
        url: "chat/group/create",
        method: "POST",
        body: data,
      }),
    }),
    addMember: builder.mutation({
      query: ({ groupId, userId }) => ({
        url: `chat/group/${groupId}/add`,
        method: "PATCH",
        body: { userId },
      }),
    }),
    removeMember: builder.mutation({
      query: ({ groupId, userId }) => ({
        url: `chat/group/${groupId}/remove`,
        method: "PATCH",
        body: { userId },
      }),
    }),
    deleteChat: builder.mutation({
      query: (chatId) => ({
        url: `chat/group/${chatId}`,
        method: "DELETE",
      }),
    }),
    leaveGroup: builder.mutation({
      query: (chatId) => ({
        url: `chat/group/${chatId}/leave`,
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetUserChatsQuery,
  useSendMessageMutation,
  useGetChatsQuery,
  useMarkAsReadMutation,
  useUpdateMessageMutation,
  usePinMessageMutation,
  useSoftDeleteMessageMutation,
  useCreatePrivateChatMutation,
  useCreateGroupMutation,
  useAddMemberMutation,
  useRemoveMemberMutation,
  useDeleteChatMutation,
  useLeaveGroupMutation,
} = chatApi;