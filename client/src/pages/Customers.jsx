import Table from '../components/Table';
import TextInput from '../components/TextInput';
import customerServices from '../services/customerServices';
import { useEffect, useState } from 'react';

export default function Customers() {
    const [customers, setCustomers] = useState([]);
    const [filteredCustomers, setFilteredCustomers] = useState(customers);
    const [filters, setFilters] = useState({});

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

    return (
        <>
        <TextInput name='teste' label='teste'/>
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