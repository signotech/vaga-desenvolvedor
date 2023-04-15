import { useEffect, useState } from "react";
import Select from "../components/Select";
import { useLoaderData, useParams } from 'react-router-dom';
import Row from "../components/Row";
import TextInput from "../components/TextInput";
import Icon from "../components/Icon";
import Table from "../components/Table";
import ReadOnly from "../components/ReadOnly";
import { Order } from "../Shapes";
import orderServices from "../services/orderServices";


export default function NewOrder() {
    const products = useLoaderData();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [selectedQuantity, setSelectedQuantity] = useState(0);
    const [maxQuantity, setMaxQuantity] = useState(0);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const { id } = useParams();

    useEffect(() => {
        setTotalPrice(
            cart.reduce((res, prod) => res + (prod.quantidade * parseFloat(prod.preco)) , 0)
        )
        selectedProduct && setMaxQuantity(Number(selectedProduct.estoque) - countCartProdQuantity(selectedProduct));
        setSelectedQuantity(0);
    }, [cart])


    function changeSelectedProduct(e) {
        const product = products.find(prod => prod.id === Number(e.target.value));
        setSelectedProduct(product);
        setMaxQuantity(Number(product.estoque) - countCartProdQuantity(product));
        setSelectedQuantity(0);
    }

    function addProductToCart() {
        if(selectedQuantity) {
            const selectedProductCopy = {...selectedProduct, quantidade: Number(selectedQuantity) || 0 };
            setCart(prevCart => [...prevCart, selectedProductCopy]);
        }
    }

    function countCartProdQuantity(prod) {
        return cart
            .filter(onCartProd => onCartProd.sku_produto === prod.sku_produto)
            .reduce((res, product) => res + Number(product.quantidade), 0)
    }

    function changeQuantity(e) {
        if(selectedProduct && e.target.value <= maxQuantity) {
            setSelectedQuantity(e.target.value);
        }
    }

    function removeFromCart(product) {
        const productIndex = cart.indexOf(product);
        setCart(prevCart => (
            prevCart.slice(0, productIndex).concat(prevCart.slice(productIndex + 1))
        ))
    }

    function toOrderFormat(customerId, totalValue, cartItens) {
        const order = new Order(customerId, totalValue);
        const itens = cartItens.map(item => ({ id_produto: item.id, quantidade: item.quantidade }));
        return { ...order, itens };
    }

    function storeOrder() {
        if(cart.length) {
            const formattedOrder = toOrderFormat(id, totalPrice, cart);
            orderServices.storeOrders(formattedOrder);
        }
    }
    

    return(
        <>
            <p className="title">Novo pedido</p>
            <div className="col s12">
                <Row>
                    <div class="input-field col s12 m3">
                        <Select 
                            idIndicator="id" 
                            nameIndicator="titulo_produto" 
                            options={products}
                            handleSelect={changeSelectedProduct}
                        />
                    </div>
                    <div className="input-field col s12 m3">
                        <ReadOnly value={selectedProduct?.preco} text="Valor do produto" />
                    </div>
                    <div className="input-field col s12 m3">
                        <TextInput value={selectedQuantity} handler={changeQuantity} type="number">
                            <span class="helper-text">Quantidade (max: { maxQuantity })</span>
                        </TextInput>
                    </div>
                    <div className="input-field col s12 m3">
                        <button className="btn col s12" onClick={addProductToCart}>
                            Adicionar ao carrinho
                        </button>
                    </div>
                </Row>
            </div>  
            <Table
                data={cart}
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
                        alias: 'Preço'
                    } ,
                    {
                        name: 'quantidade',
                        alias: 'Quantidade'
                    }
                ]}
                actions={[
                    {
                        handler: removeFromCart,
                        icon: <Icon>close</Icon>
                    }
                ]}
            />
            <div className="col s12">
                <Row>
                    <div className="col s12 m6">
                        <ReadOnly value={totalPrice} text="Valor total"/>
                    </div>
                    <div className="col s12 m6">
                        <button className="btn col s12 m6" onClick={storeOrder}>
                            Finalizar
                        </button>
                    </div>
                </Row>
            </div>
            
        </>
    )
}