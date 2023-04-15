import Table from '../components/Table';
import Icon from '../components/Icon';
import OrderForm from '../components/OrderForm';
import orderServices from '../services/orderServices';
import { Order } from '../Shapes';
import { useState } from 'react';
import { useLoaderData, useParams, Link } from 'react-router-dom';
import useFilter from '../hooks/useFilter';


export default function Orders() {
    const { id } = useParams();
    const [orders, setOrders] = useState(useLoaderData());
    const [filteredOrders, filters, handleFilterInput] = useFilter({
        originalData: orders,
        formShape: Order,
        fetcher: orderServices.getOrders,
        fetcherArgs: [id]
    });
    
    async function deleteOrder(order) {
        await orderServices.deleteOrder(id, order.codigo_pedido);
        setOrders(prevOrders => prevOrders.map(curOrder => curOrder === order? { ...order, status_pedido: 'Cancelado'} : curOrder));
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
            <Link to={`/pedidos/cliente/${id}/novo`} className="btn blue darken-1 waves-light" type="submit">
                Novo Pedido
            </Link>
        </>
    );
}