import axios from 'axios';
import host from './host';

const services = {
    async getProducts(filters) {
        const response = await axios.get(`${host}/produtos?${new URLSearchParams(filters)}`);
        return response.data;
    },

    async storeProduct(productData) {
        const response = await axios.post(`${host}/produtos`, productData);
        return response.data;
    },

    async deleteProduct(productId) {
        const response = await axios.delete(`${host}/produtos/${productId}`);
        return response.data;
    }
}

export default services;