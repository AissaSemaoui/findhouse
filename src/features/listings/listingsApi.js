import { API_URLS } from "../../config/api";
import { api } from "../api/api";

export const listingsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllListings: builder.query({
      query: ({ currentPage, filterQueries }) => ({
        url: `${API_URLS.LISTINGS}?page=${currentPage}&${filterQueries}`,
        method: "GET",
      }),
    }),
    getSingleListing: builder.query({
      query: (listingId) => ({
        url: API_URLS.getSingleListing(listingId),
        method: "GET",
      }),
    }),
    createListing: builder.mutation({
      query: (ListingForm) => ({
        url: API_URLS.CREATE_LISTING,
        method: "POST",
        body: ListingForm,
      }),
    }),
    updateListing: builder.mutation({
      query: ({ listingId, ListingForm }) => ({
        url: API_URLS.getEditListing(listingId),
        method: "PUT",
        body: ListingForm,
      }),
    }),
  }),
});

export const {
  useGetAllListingsQuery,
  useGetSingleListingQuery,
  useCreateListingMutation,
  useUpdateListingMutation,
} = listingsApi;
