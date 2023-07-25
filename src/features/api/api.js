import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import axios from "axios";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    // fetchFn: axios,
  }),
  keepUnusedDataFor: 5,
  endpoints: (builder) => ({}),
});
