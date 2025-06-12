import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const tokenErrors = [
    "jwt expired",
    "invalid token",
    "token not active yet",
    "missing token",
    "keystore not found",
    "token verification failed",
    "user id mismatch",
    "internal server error",
  ];

  // Chỉ xử lý nếu authReady === true
  if (
    (result.error?.status === 401 ||
      result.error?.status === 403 ||
      tokenErrors.includes(result.error?.data?.message))
  ) {
    // Gọi API refresh
    const refreshResult = await baseQuery(
      { url: "auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      // Cập nhật token trong store nếu muốn
      api.dispatch({
        type: "auth/tokenRefreshed",
        payload: refreshResult.data,
      });

      // Thử lại request ban đầu
      result = await baseQuery(args, api, extraOptions);
    } else {
      // Nếu refresh token thất bại → logout
      api.dispatch({ type: "auth/logout" });
    }
  }

  return result;
};