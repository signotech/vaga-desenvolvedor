import Table from '../components/Table';
import Icon from '../components/Icon';
import CustomerForm from '../components/CustomerForm';
import customerServices from '../services/customerServices';
import { useEffect, useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { Customer } from '../Shapes';


export default function Customers() {
    const [customers, setCustomers] = useState(useLoaderData());
    const [filteredCustomers, setFilteredCustomers] = useState(customers);
    const [filters, handleFilterInput] = useForm(new Customer());

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

    return (
        <>
            <p className="title">Buscar clientes</p>
            <CustomerForm 
                shape={filters}
                inputHandler={handleFilterInput}
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
                actions={[
                    {
                        handler: console.log,
                        icon: <Icon>edit</Icon>
                    },
                    {
                        handler: deleteCustomer,
                        icon: <Icon>close</Icon>
                    }
                ]}
            />
            <Link to="/clientes/novo" className="btn blue darken-1 waves-light" type="submit">
                Novo Cliente
            </Link>
        </>
    );
}