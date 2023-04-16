import { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Table from '../components/Table';
import Title from '../components/Title';
import Money from '../values/Money';
import LoadingButton from '../components/LoadingButton';
import Icon from '../components/Icon';
import orderServices from '../services/orderServices';
import ReadOnly from '../components/ReadOnly';

export default function SingleProduct() {
    const { customer, order: selectedOrder } = useLoaderData();

    const [order, setOrder] = useState(selectedOrder);

    function changeOrderStatus(status) {
        return async () => {
            await orderServices.updateOrder(order.id_cliente_pedido, order.codigo_pedido, { status_pedido: status});
            setOrder(prevOrder => ({ ...prevOrder, status_pedido: status }));
        }
    }

    return (
        <>
            <Title canGoBack>Visualizar pedido</Title>
            <div className='flex-between'>
                <ReadOnly text="Nome" value={ customer.nome_cliente } />
                <ReadOnly text="E-mail" value={ customer.email_cliente } />
                <ReadOnly text="CPF" value={ customer.cpf_cliente } />
            </div>
            <Table
                data={order.Produtos}
                columns={[
                    {
                        name: 'sku_produto',
                        alias: 'Código'
                    },
                    {
                        name: 'titulo_produto',
                        alias: 'Nome'
                    },
                    {
                        name: 'preco',
                        alias: 'Preço',
                    } ,
                    {
                        name: 'PedidoProduto.quantidade',
                        alias: 'Quantidade'
                    }
                ]}
            />
            <div className="flex-between">
                <ReadOnly text="Total" value={ new Money(order.valor_pedido).preCurrency } />
                <ReadOnly text="Data" value={ order.data_pedido } />
                <ReadOnly text="Status" value={ order.status_pedido } />
            </div>
            <div className='flex-side'>
                <LoadingButton handler={changeOrderStatus('Pago')}>
                    <Icon></Icon>
                    Pagar
                </LoadingButton>
                <LoadingButton handler={changeOrderStatus('Cancelado')}>
                    <Icon></Icon>
                    Cancelar
                </LoadingButton> 
            </div>
        </>
    )
}