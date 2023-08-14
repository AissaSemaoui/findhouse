import { API_URLS } from "../../config/api";
import fetchData from "../../helpers/fetchData";

const getAllListings = async (filterQueries = "") => {
  let api_url = `https://findhouse-v1.vercel.app${API_URLS.LISTINGS}`;
  if (!!filterQueries) api_url += `?${filterQueries}`;

  return await fetchData({
    url: api_url,
    method: "get",
  });
};

const deleteListing = async (listingId) => {
  return await fetchData({
    url: API_URLS.getDeleteListing(listingId),
    method: "delete",
  });
};

const deleteFileFromDB = async (listingId, propertyName, fileInfo) => {
  return await fetchData({
    url: API_URLS.DELETE_LISTING_MEDIA,
    method: "post",
    body: {
      listingId,
      propertyName,
      fileInfo,
    },
  });
};

export { getAllListings, deleteListing, deleteFileFromDB };
