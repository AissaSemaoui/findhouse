import { api } from "../api/api";

export const listingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllListings: builder.query({
      query: () => ({
        url: "/listings",
        method: "GET",
      }),
    }),
    getSingleListing: builder.query({
      query: (listingId) => ({
        url: `/listings/${listingId}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllListingsQuery, useGetSingleListingQuery } = listingsApi;
