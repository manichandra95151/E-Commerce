import axios from 'axios';

const API_BASE_URL = 'https://my-json-server.typicode.com/alqamah/api-ecommerce';

const saveToLocalStorage = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const getFromLocalStorage = (key) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const fetchProducts = async () => {
  const localProducts = getFromLocalStorage('products');
  if (localProducts) return { data: localProducts };
  const response = await axios.get(`${API_BASE_URL}/products`);
  saveToLocalStorage('products', response.data);
  return response;
};

export const updateProduct = async (id, data) => {
  const response = await axios.put(`${API_BASE_URL}/products/${id}`, data);
  const products = getFromLocalStorage('products') || [];
  const updatedProducts = products.map(p => p.id === id ? {...p, ...response.data} : p);
  saveToLocalStorage('products', updatedProducts);
  return response;
};


export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/products/${id}`);
  const products = getFromLocalStorage('products');
  const updatedProducts = products.filter(p => p.id !== id);
  saveToLocalStorage('products', updatedProducts);
  return response;
};

export const addProduct = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/products`, data);
  const products = getFromLocalStorage('products') || [];
  products.push(response.data);
  saveToLocalStorage('products', products);
  return response;
};

export const fetchCart = async () => {
  const localCart = getFromLocalStorage('cart');
  if (localCart) return { data: localCart };
  const response = await axios.get(`${API_BASE_URL}/cart`);
  saveToLocalStorage('cart', response.data);
  return response;
};

export const updateCart = async (data) => {
  const response = await axios.put(`${API_BASE_URL}/cart`, data);
  saveToLocalStorage('cart', data);
  return response;
};
