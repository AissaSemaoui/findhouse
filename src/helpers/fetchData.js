import axios from "axios";

const fetchData = async ({ url, method, body = null, headers = {} }) => {
  try {
    let response;
    if (method === "get" || method === "delete") {
      response = await axios[method](url, { headers });
    } else {
      response = await axios[method](url, body, { headers });
    }

    if (response.data && response.data.success) {
      return response.data.data;
    } else {
      throw new Error(response.data.message || "Request failed");
    }
  } catch (error) {
    console.log("error is in fetchData : ", error);
    throw new Error(error.message || "Request failed");
  }
};

export default fetchData;
