const axios = require("axios");

function onError(error, request, opts) {
  // Default error setting up the request that triggered the error or no response
  let response = {
    status: 500,
    error: true,
    data: null,
    errorMessage: error.message || ''
  };
  if (error.response) {
    // Request was made but server responded with something other than 2xx
    response.status = error.response.status || 500;
    response.data = error.response.data || {};
    response.headers = error.response.headers;
  }
  return response;
}

async function onSuccess(response, request, opts) {
  return {
    status: response.status,
    headers: response.headers,
    data: response.data,
  };
}

const requestHandler = async (request) => {
  try {
    // Make api call
    const apiResponse = await onSuccess(await axios({
      method: request.method,
      url: request.url,
      data: request.data,
      timeout: request.timeout || 0,
      params: request.params,
      headers: request.headers
    }), request, {});
    return apiResponse;
  } catch (error) {
    const formattedErr = onError(error, request);
    return formattedErr;
  }
}

exports.requestHandler = requestHandler;