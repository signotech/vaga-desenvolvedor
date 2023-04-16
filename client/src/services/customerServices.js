import axios from 'axios';
import host from './host';

const services = {
    async getCustomers(filters) {
        const response = await axios.get(`${host}/clientes?${new URLSearchParams(filters)}`);
        return response.data;
    },

    async getSingleCustomer(id) {
        const response = await axios.get(`${host}/clientes/${id}`);
        return response.data;
    },

    async storeCustomer(customerData) {
        const response = await axios.post(`${host}/clientes`, customerData);
        return response.data;
    },

    async deleteCustomer(customerId) {
        const response = await axios.delete(`${host}/clientes/${customerId}`);
        return response.data
    },

    async updateCustomer(customerId, data) {
        const response = await axios.put(`${host}/clientes/${customerId}`, data);
        return response.data
    }
}

export default services;