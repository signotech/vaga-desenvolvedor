import Table from '../components/Table';
import Icon from '../components/Icon';
import ProductForm from '../components/ProductForm';
import productServices from '../services/productServices';
import { useEffect, useState } from 'react';
import { useLoaderData, Link } from 'react-router-dom';
import useForm from '../hooks/useForm';
import { Product } from '../Shapes';


export default function Products() {

    const [products, setProducts] = useState(useLoaderData());
    const [filteredProducts, setFilteredProducts] = useState(products);
    const [filters, handleFilterInput] = useForm(new Product());
    console.log(filteredProducts);

    useEffect(() => setFilteredProducts(products), [products]);

    useEffect(() => {
        async function fetchFilteredProducts() {
            const filteredProductsData = await productServices.getProducts(filters);
            setFilteredProducts(filteredProductsData);
        }

        fetchFilteredProducts();
    }, [filters])


    async function deleteProduct({ id }) {
        const { deleted } = await productServices.deleteProduct(id);
        setProducts(prevProducts => prevProducts.filter(product => product.id !== Number(deleted)));
    }

    return (
        <>
            <p className="title">Buscar produtos</p>
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
                        handler: console.log,
                        icon: <Icon>edit</Icon>
                    },
                    {
                        handler: deleteProduct,
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