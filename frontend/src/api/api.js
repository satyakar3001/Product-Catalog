import axios from "axios";

const API_URL = "http://localhost:8000"; // Update with your backend URL

export const loginUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/api/login/`, { username, password });
  return response.data;
};

export const registerUser = async (username, password) => {
  const response = await axios.post(`${API_URL}/api/register/`, { username, password });
  return response.data;
};

export const getProducts = async () => {
  const response = await axios.get(`${API_URL}/api/products/`);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await axios.get(`${API_URL}/api/products/${id}/`);
  return response.data;
};
