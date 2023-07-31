const API_URLS = {
  LISTINGS: "/api/listings",
  CREATE_LISTING: "/api/listings/create",
  DELETE_MEDIA: "/api/media/delete",
  DELETE_LISTING_MEDIA: "/api/media/delete",
  getDeleteListing: (listingId) => `/api/listings/${listingId}`,
  getEditListing: (listingId) => `/api/listings/${listingId}`,
  getSingleListing: (listingId) => `/api/listings/${listingId}`,
};

export { API_URLS };
