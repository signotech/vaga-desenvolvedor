import Table from '../components/Table';
import Icon from '../components/Icon';
import ProductForm from '../components/ProductForm';
import productServices from '../services/productServices';
import { useState } from 'react';
import { useLoaderData, useNavigate, Link } from 'react-router-dom';
import { Product } from '../Shapes';
import useFilter from '../hooks/useFilter';
import Title from '../components/Title';
import Confirm from '../components/Confirm';


export default function Products() {
    const navigate = useNavigate();
    const [products, setProducts] = useState(useLoaderData());
    const [filteredProducts, filters, handleFilterInput] = useFilter({
        originalData: products,
        formShape: Product,
        fetcher: productServices.getProducts
    })
    const [toConfirm, setToConfirm] = useState(null);

    async function deleteProduct({ id }) {
        const { deleted } = await productServices.deleteProduct(id);
        setProducts(prevProducts => prevProducts.filter(product => product.id !== Number(deleted)));
    }

    async function navigateToSingleProduct({ id }) {
        navigate(`/produtos/editar/${id}`)
    }

    return (
        <>
            <Confirm toggler={toConfirm} confirmFunction={() => deleteProduct(toConfirm)} closeModal={() => setToConfirm(null)}>
                Deseja deletar este produto?
            </Confirm>
            <Title>Buscar produtos</Title>
            <ProductForm
                shape={filters}
                inputHandler={handleFilterInput}
            />
            <Table
                data={filteredProducts}
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
                        name: 'estoque',
                        alias: 'Estoque'
                    }
                ]}
                actions={[
                    {
                        handler: navigateToSingleProduct,
                        icon: <Icon>edit</Icon>
                    },
                    {
                        handler: (prod) => setToConfirm(prod),
                        icon: <Icon>close</Icon>
                    }
                ]}
            />
            <Link to="/produtos/novo" className="btn blue darken-1 waves-light" type="submit">
                Novo Produto
            </Link>
        </>
    );
}