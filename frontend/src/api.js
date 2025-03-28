import axios from "axios";

const API_URL = "http://127.0.0.1:8000/api";  // Django backend 

export const getProducts = () => axios.get(`${API_URL}/products`);
export const getProductById = (id) => axios.get(`${API_URL}/products/${id}`);
export const addProduct = (product) => axios.post(`${API_URL}/addProduct`, product);
