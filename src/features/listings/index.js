import { API_URLS } from "../../config/api";
import fetchData from "../../helpers/fetchData";

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

export { deleteListing, deleteFileFromDB };
