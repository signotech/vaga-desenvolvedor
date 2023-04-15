import axios from 'axios';
import host from './host';

const services = {
    async getOrders(filters, id) {
        const response = await axios.get(`${host}/pedidos/${id}?${new URLSearchParams(filters)}`);
        return response.data;
    },

    async storeOrders(orderData) {
        const response = await axios.post(`${host}/pedidos`, orderData);
        return response.data;
    },

    async deleteOrder(customerId, orderId) {
        const response = await axios.delete(`${host}/pedidos/${customerId}/${orderId}`);
        return response.data;
    }
}

export default services;