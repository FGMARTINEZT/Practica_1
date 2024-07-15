import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getProducts = async () => {
    const response = await axios.get(`${API_URL}/products`);
    return response.data;
};

export const addToCart = async (productId, quantity) => {
    const response = await axios.post(`${API_URL}/cart/add`, { productId, quantity });
    return response.data;
};

export const getCartItems = async () => {
    const response = await axios.get(`${API_URL}/cart`);
    return response.data;
};

export const removeFromCart = async (productId) => {
    const response = await axios.delete(`${API_URL}/cart/remove/${productId}`);
    return response.data;
};

export const checkoutCart = async (checkoutData) => {
    const response = await axios.post(`${API_URL}/cart/checkout`, checkoutData);
    return response.data;
};

