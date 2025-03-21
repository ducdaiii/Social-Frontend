import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const publicBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BACKEND_URL,
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: publicBaseQuery,
  endpoints: (builder) => ({
    
    getTopCrypto: builder.query({
      query: () => "crypto/all",
    }),

    
    getCryptoBySymbol: builder.query({
      query: (symbol) => `crypto/symbol?symbol=${symbol}`,
    }),
  }),
});

export const { useGetTopCryptoQuery, useGetCryptoBySymbolQuery } = cryptoApi;
