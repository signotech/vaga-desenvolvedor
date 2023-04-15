import Table from '../components/Table';
import Icon from '../components/Icon';
import OrderForm from '../components/OrderForm';
import orderServices from '../services/orderServices';
import { Order } from '../Shapes';
import { useEffect, useState } from 'react';
import { useLoaderData, useParams, Link } from 'react-router-dom';
import useForm from '../hooks/useForm';


export default function Orders() {
    const [orders, setOrders] = useState(useLoaderData());
    const [filteredOrders, setFilteredOrders] = useState([]);
    const [filters, handleFilterInput] = useForm(new Order());
    const { id } = useParams();

    useEffect(() => setFilteredOrders(orders), [orders]);

    useEffect(() => {
        async function fetchFilteredCustomers() {
            const ordersData = await orderServices.getOrders(filters, id);
            setOrders(ordersData);
        }

        fetchFilteredCustomers();
    }, [filters])

    
    async function deleteOrder({ id }) {
        const { deleted } = await orderServices.deleteCustomer(id);
        setOrders(prevCustomers => prevCustomers.filter(customer => customer.id !== Number(deleted)));
    }

    return (
        <>
            <p className="title">Buscar pedidos</p>
            <OrderForm
                shape={filters}
                inputHandler={handleFilterInput}
            />
            <Table
                data={filteredOrders}
                columns={[
                    {
                        name: 'status_pedido',
                        alias: 'Status'
                    },
                    {
                        name: 'data_pedido',
                        alias: 'Data'
                    },
                    {
                        name: 'valor_pedido',
                        alias: 'Valor'
                    } 
                ]}
                actions={[
                    {
                        handler: console.log,
                        icon: <Icon>edit</Icon>
                    },
                    {
                        handler: deleteOrder,
                        icon: <Icon>close</Icon>
                    }
                ]}
            />
            <Link to="/pedidos/cliente" className="btn blue darken-1 waves-light" type="submit">
                Novo Pedido
            </Link>
        </>
    );
}