import Table from '../components/Table';
import TextInput from '../components/TextInput';
import CustomerForm from '../components/CustomerForm';
import customerServices from '../services/customerServices';
import { useEffect, useState } from 'react';

export default function Customers() {
    const customerShape = {
        cpf_cliente: '',
        nome_cliente: '',
        email_cliente: ''
    };

    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState(customers);
    const [filters, setFilters] = useState(customerShape);
    const [newCustomer, setNewCustomer] = useState(customerShape);

    useEffect(() => setFilteredCustomers(customers));

    useEffect(() => {
        async function fetchFilteredCustomers() {
            const customersData = await customerServices.getCustomers(filters);
            setFilteredCustomers(customersData);
        }

        fetchFilteredCustomers();
    }, [filters])

    useEffect(() => {
        async function fetchCustomers() {
            const customersData = await customerServices.getCustomers();
            setCustomers(customersData);
        }

        fetchCustomers();
    }, [])

    function handleInput(setInput) {
        return (e) => {
            setInput(prevForm => ({...prevForm, [e.target.name]: e.target.value }))
        }
    }

    async function createCustomer(formValues) {
        const createdCustomer = await customerServices.storeCustomer(formValues);
        setCustomers(prevCustomers => [...prevCustomers, createdCustomer]);
    }

    return (
        <>
            <CustomerForm 
                shape={filters}
                inputHandler={handleInput(setFilters)}
            />
            <Table
                data={filteredCustomers}
                columns={[
                {
                    name: 'cpf_cliente',
                    alias: 'CPF'
                },
                {
                    name: 'nome_cliente',
                    alias: 'Nome'
                },
                {
                    name: 'email_cliente',
                    alias: 'Email'
                } 
                ]}
            />
            <CustomerForm 
                shape={newCustomer}
                inputHandler={handleInput(setNewCustomer)}
                submitHandler={createCustomer}
            />
        </>
    );
}