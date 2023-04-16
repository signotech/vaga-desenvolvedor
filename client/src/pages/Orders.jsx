import Table from '../components/Table';
import Icon from '../components/Icon';
import OrderForm from '../components/OrderForm';
import orderServices from '../services/orderServices';
import { Order } from '../Shapes';
import { useState } from 'react';
import { useLoaderData, useParams, Link } from 'react-router-dom';
import useFilter from '../hooks/useFilter';
import Money from '../values/Money';
import Title from '../components/Title';

export default function Orders() {
    const { id } = useParams();
    const { orders: customerOrders, customer } = useLoaderData();
    const [orders, setOrders] = useState(customerOrders);
    const [filteredOrders, filters, handleFilterInput] = useFilter({
        originalData: orders,
        formShape: Order,
        fetcher: orderServices.getOrders,
        fetcherArgs: [id]
    });

    function changeOrderStatus(status) {
        return async (order) => {
            await orderServices.updateOrder(id, order.codigo_pedido, { status_pedido: status});
            setOrders(prevOrders => prevOrders.map(curOrder => (
                curOrder.codigo_pedido === order.codigo_pedido? { ...order, status_pedido: status} : curOrder
            )));
        }
    }

    return (
        <>
            <Title canGoBack>Buscar pedidos</Title>
            <OrderForm
                shape={filters}
                inputHandler={handleFilterInput}
            />
            <p>Pedidos de: {customer.nome_cliente}</p>
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
                        alias: 'Valor',
                        modifier: (val) => new Money(val).preCurrency
                    } 
                ]}
                actions={[
                    {
                        handler: changeOrderStatus('Pago'),
                        icon: <Icon>check</Icon>
                    },
                    {
                        handler: console.log,
                        icon: <Icon>edit</Icon>
                    },
                    {
                        handler: changeOrderStatus('Cancelado'),
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