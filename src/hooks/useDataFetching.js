import { useState } from "react";
import axios from "axios";

const useDataFetching = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fetchData = async ({
    url,
    method,
    body = null,
    headers = {},
    onSuccess,
    onFailure,
  }) => {
    setLoading(true);
    setError(null);

    try {
      let response;
      if (method === "get" || method === "delete") {
        response = await axios[method](url, null, { headers });
      } else {
        response = await axios[method](url, body, { headers });
      }

      console.log(response);
      // Assuming your API response has a "success" property
      if (response.data && response.data.success) {
        setData(response.data.data);
        onSuccess && onSuccess(response.data);
      } else {
        const errorMessage = response.data.message || "Request failed";
        setError(errorMessage);
        onFailure && onFailure(errorMessage);
      }
    } catch (error) {
      const errorMessage = error || "Request failed";
      setError(errorMessage);
      onFailure && onFailure(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, fetchData };
};

export default useDataFetching;
