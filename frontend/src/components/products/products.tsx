import Axios from "axios"
import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { baseApiUrl, showMessage } from "../../global"
import { produtoModel } from "../../models/interface"
import Paginator from "../paginator/paginator"

import "./products.css"

interface ProductsProps {
    isInAdminPage?: boolean
    setProductSelectedId?: any

    setTitulo?: any
    setPrice?: any
    setStock?: any
    setDesconto?: any
    setCategory?: any
}

export default function Products(props: ProductsProps) {
    const [searchParams, setSearchParams] = useSearchParams()

    const [products, setProducts] = useState<produtoModel[]>([])
    const [pages, setPages] = useState<number>(0)
    
    const [page, setPage] = useState<number | string>(searchParams.get("page") || 1)
    const [itemsPerPage, setItemsPerPage] = useState<any>(searchParams.get("limit") || "")
    const [titulo, setTitulo] = useState<string>(searchParams.get("titulo") || "")


    useEffect(() => {
        Axios.get(`${baseApiUrl}/produtos?page=${page}&limit=${itemsPerPage}&titulo=${titulo}`)
            .then(resp => {
                setPages(resp.data.pages)
                setProducts(resp.data.data)
            })
    }, [])

    function productSelected(product: produtoModel) {
        props.setTitulo(product.titulo)
        props.setPrice(product.preco)
        props.setStock(product.estoque)
        props.setDesconto(product.desconto)
        props.setProductSelectedId(product.id)
        props.setCategory(product.categoria_id)
    }

    function adicionarAoCarrinho(product: produtoModel) {
        let cart = JSON.parse(`${localStorage.getItem("cart")}`)

        if(!cart) cart = []

        cart.push({
            ...product,
            amount: 1,
            total: product.preco
        })
        localStorage.setItem("cart", JSON.stringify(cart))
    }

    function renderProdutos() {
        return products.map((product: produtoModel, index: number) => {
            return (
                <div key={`product-list-${index}`} className="product-card" onClick={props.isInAdminPage ? () => productSelected(product) : () => { }}
                    style={{ cursor: props.isInAdminPage ? "pointer" : "" }}>
                    <div className="product-title">
                        <h2>{product.titulo}</h2>
                    </div>
                    <div className="product-category">
                        <p>{product.categoria}</p>
                    </div>
                    <div className="product-image">
                        <img src={product.imagemURL} alt={product.titulo} height={200} />
                    </div>
                    <div className="product-price">
                        <p>
                            R$ {product.preco}
                            {product.desconto > 0 ? <span>-{product.desconto}%</span> : <></>}
                        </p>
                    </div>
                    <div className="product-stock">
                        <p>Restando {product.estoque}</p>
                    </div>
                    {!props.isInAdminPage ? (
                        <div className="submit-button">
                            <button className="hoverable" onClick={() => adicionarAoCarrinho(product)}>Adicionar ao carrinho</button>
                        </div>
                    ) : <></>}
                </div>
            )
        })
    }

    function filterProduct(typeFilter: string, filter: string) {
        switch (typeFilter) {
            case "itemPorPagina":
                setItemsPerPage(filter)

                Axios.get(`${baseApiUrl}/produtos?limit=${filter}&titulo=${titulo}`)
                    .then(resp => {
                        setPages(resp.data.pages)
                        setProducts(resp.data.data)
                    })
                    .catch(err => showMessage("Erro ao filtar item").errorMessage())
                break

            case "titulo":
                setTitulo(filter)

                Axios.get(`${baseApiUrl}/produtos?limit=${itemsPerPage}&titulo=${filter}`)
                    .then(resp => {
                        setPages(resp.data.pages)
                        setProducts(resp.data.data)
                    })
                    .catch(err => showMessage("Erro ao filtar item").errorMessage())
                break

            case "preco":
                Axios.get(`${baseApiUrl}/produtos?limit=${itemsPerPage}&orderBy=${filter}&titulo=${titulo}`)
                    .then(resp => {
                        setPages(resp.data.pages)
                        setProducts(resp.data.data)
                    })
                    .catch(err => showMessage("Erro ao filtar item").errorMessage())
                break

            case "estoque":
                Axios.get(`${baseApiUrl}/produtos?limit=${itemsPerPage}&orderBy=${filter}&titulo=${titulo}`)
                    .then(resp => {
                        setPages(resp.data.pages)
                        setProducts(resp.data.data)
                    })
                    .catch(err => showMessage("Erro ao filtar item").errorMessage())
                break
        }
    }

    return (
        <>
            <div className="filters">
                <div className="items-per-page row">
                    <div className="col m3 s12">
                        <label htmlFor="items-per-page">Itens por pagina</label>
                        <input type="number" onChange={e => filterProduct("itemPorPagina", e.target.value)} />
                    </div>

                    <div className="col m3 s12">
                        <label htmlFor="title">Titulo</label>
                        <input id="title" type="text" onChange={e => filterProduct("titulo", e.target.value)} />
                    </div>

                    <div className="col m3 s12">
                        <label htmlFor="preco">Preço</label>
                        <select name="preco" id="preco" style={{ display: "block" }} onChange={e => filterProduct("preco", e.target.value)}>
                            <option value="preco desc">Maior</option>
                            <option value="preco asc">Menor</option>
                        </select>
                    </div>

                    <div className="col m3 s12">
                        <label htmlFor="estoque">Quantidade em estoque</label>
                        <select name="preco" id="estoque" style={{ display: "block" }} onChange={e => filterProduct("estoque", e.target.value)} >
                            <option value="estoque desc">Maior</option>
                            <option value="estoque asc">Menor</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="products">
                {renderProdutos()}
            </div>
            <Paginator pages={pages} PageUrl={`/produtos?limit=${itemsPerPage}&titulo=${titulo}`} />
        </>
    )
}