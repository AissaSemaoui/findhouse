import axios from "axios";
import { API_URLS } from "../../config/api";

const deleteMedia = () => {
  return axios.delete(API_URLS.DELETE_MEDIA, {});
};
