import axios from 'axios';
import ApiError from './api.error';

const API_URL = 'http://localhost:4000';

const throwApiError = ({ data = {}, status = 500 }) => {
  throw new ApiError(data, status);
};

const httpRequest = method => async (url, options = {}) => {
  const { params, data } = options;

  const requestOptions = {
    method,
    url: `${API_URL}${url}`,
    params,
    data
  };

  try {
    const response = await axios(requestOptions);

    return response.data || {};
  } catch (error) {
    throwApiError(error.response);
  }
};

const getRequest = httpRequest('get');
const postRequest = httpRequest('post');
const putRequest = httpRequest('put');
const deleteRequest = httpRequest('delete');

const apiClient = {
  get: getRequest,
  post: postRequest,
  put: putRequest,
  delete: deleteRequest,
};

export default apiClient;
