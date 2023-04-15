import axios from 'axios';
import host from './host';

const services = {
    async getOrders(filters, id) {
        const response = await axios.get(`${host}/pedidos/${id}?${new URLSearchParams(filters)}`);
        console.log(response.data);
        return response.data;
    },

    async storeOrders(productData) {
        const response = await axios.post(`${host}/produtos`, productData);
        return response.data;
    },

    async deleteOrders(productId) {
        const response = await axios.delete(`${host}/produtos/${productId}`);
        return response.data;
    }
}

export default services;