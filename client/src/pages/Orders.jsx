import Table from '../components/Table';
import Icon from '../components/Icon';
import OrderForm from '../components/OrderForm';
import { Order } from '../Shapes';
// import customerServices from '../services/customerServices';
import { useEffect, useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import useForm from '../hooks/useForm';


export default function Orders() {
    /* const [orders, setOrders] = useState(useLoaderData());*/
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [filters, handleFilterInput] = useForm(new Order());
    /*

    useEffect(() => setFilteredCustomers(customers), [customers]);

    useEffect(() => {
        async function fetchFilteredCustomers() {
            const customersData = await customerServices.getCustomers(filters);
            setFilteredCustomers(customersData);
        }

        fetchFilteredCustomers();
    }, [filters])

    
    async function deleteCustomer({ id }) {
        const { deleted } = await customerServices.deleteCustomer(id);
        setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== Number(deleted)));
    }

    */

    return (
        <>
            <p className="title">Buscar pedidos</p>
            <OrderForm
                shape={filters}
                inputHandler={handleFilterInput}
            />
        </>
    );
}