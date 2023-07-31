import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/",
    // fetchFn: axios,
  }),
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({}),
});
