const formatResponse = (
  success = false,
  message = "Internal Server Error",
  data
) => {
  const formattedResponse = { success, message };
  if (success && data) formattedResponse.data = data;
  // if (!success && data) formattedResponse.error = data;

  return formattedResponse;
};

const onError = (err, req, res) => {
  console.error(err.stack);
  res.status(err.statusCode || 500).end(err.message);
};

const onNoMatch = (req, res) => {
  res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
};

const generateUniqueId = () => {
  const timestamp = Date.now();
  return `PRO-${timestamp}`;
};

export { formatResponse, onError, onNoMatch, generateUniqueId };
