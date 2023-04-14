import Table from '../components/Table';
import TextInput from '../components/TextInput';
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

    useEffect(() => setFilteredCustomers(customers), [customers]);

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

    return (
        <>
            <TextInput name='cpf_cliente' label='CPF' value={filters.cpf_cliente} handler={handleInput(setFilters)}/>
            <TextInput name='nome_cliente' label='Nome' value={filters.nome_cliente} handler={handleInput(setFilters)}/>
            <TextInput name='email_cliente' label='Email' value={filters.email_cliente} handler={handleInput(setFilters)}/>
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
        </>
    );
}