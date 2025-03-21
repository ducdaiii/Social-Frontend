import { baseQueryWithReauth } from "../hooks";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const publicBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  });

export const walletApi = createApi({
    reducerPath: "walletApi",
    baseQuery: publicBaseQuery,
    endpoints: (builder) => ({
      connectWallet: builder.query({
        query: (address) => `wallet/connect-meta/${address}`,
      }),
    }),
  });
  
  export const { useConnectWalletQuery } = walletApi;