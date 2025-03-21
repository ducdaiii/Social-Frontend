import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1/",
  prepareHeaders: (headers, { getState }) => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
    
    headers.set("CLIENT_ID", userInfo.sub || "");
    headers.set("x-rtoken-id", localStorage.getItem("refreshToken"));
    headers.set("authorization", localStorage.getItem("accessToken"));

    return headers;
  },
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (
    result.error?.status === 403 &&
    result.error.data.message === "jwt expired"
  ) {
    const refreshResult = await baseQuery(
      { url: "auth/refresh", method: "POST" },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { refreshToken, accessToken } = refreshResult.data.metadata.tokens;
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("accessToken", accessToken);

      // Dispatch lại user mới sau khi refresh token
      api.dispatch({
        type: "auth/updateTokens",
        payload: refreshResult.data.metadata.tokens,
      });
    } else {
      console.log("Logout");
    }
  }

  return result;
};
