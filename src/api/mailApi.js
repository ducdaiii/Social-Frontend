import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../hooks";

export const mailApi = createApi({
  reducerPath: "mailApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: [],
  endpoints: (builder) => ({
    sendVerificationCode: builder.mutation({
      query: (data) => ({
        url: "mail/send-verification-code",
        method: "POST",
        body: data,
      }),
    }),

    sendNotificationWithPdf: builder.mutation({
      query: ({ to, note, file }) => {
        const formData = new FormData();
        formData.append("to", to);
        formData.append("note", note);
        formData.append("file", file);

        return {
          url: "mail/send-notification-with-pdf",
          method: "POST",
          body: formData,
        };
      },
    }),

    notifyProjectUpdated: builder.mutation({
      query: (data) => ({
        url: "mail/notify-project-updated",
        method: "POST",
        body: data,
      }),
    }),

    notifyNewProjectByFollowing: builder.mutation({
      query: (data) => ({
        url: "mail/notify-new-project-following",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useSendVerificationCodeMutation,
  useSendNotificationWithPdfMutation,
  useNotifyProjectUpdatedMutation,
  useNotifyNewProjectByFollowingMutation,
} = mailApi;