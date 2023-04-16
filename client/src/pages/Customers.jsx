import Table from '../components/Table';
import Icon from '../components/Icon';
import CustomerForm from '../components/CustomerForm';
import customerServices from '../services/customerServices';
import { useState } from 'react';
import { useLoaderData, useNavigate, Link } from 'react-router-dom';
import useFilter from '../hooks/useFilter';
import { Customer } from '../Shapes';
import Title from '../components/Title';

export default function Customers() {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState(useLoaderData());
    const [filteredCustomers, filters, handleFilterInput] = useFilter({
        originalData: customers,
        formShape: Customer,
        fetcher: customerServices.getCustomers
    })

    async function deleteCustomer({ id }) {
        const { deleted } = await customerServices.deleteCustomer(id);
        setCustomers(prevCustomers => prevCustomers.filter(customer => customer.id !== Number(deleted)));
    }

    function navigateToSingleCustomer(customer) {
        navigate(`/clientes/${customer.id}/editar`);
    }

    return (
        <>
           <Title>Buscar clientes</Title>
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
                        handler: ({ id }) => navigate(`/pedidos/cliente/${id}`),
                        icon: <Icon>shopping_cart</Icon>
                    },
                    {
                        handler: navigateToSingleCustomer,
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