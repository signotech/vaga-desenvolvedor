import Axios from "axios"
import React, { useState, useEffect } from "react"
import { baseApiUrl, showMessage } from "../../../global"
import { categoriaModel, produtoModel } from "../../../models/interface"
import Products from "../../products/products"
import "./productsForm.css"

export default function ProductsAdmin() {
    const [categorias, setCategorias] = useState<categoriaModel[]>([])
    const [productToUpdateOrDeleteId, setProductToUpdateOrDeleteId] = useState<number>()

    const [titulo, setTitulo] = useState<string>("")
    const [category, setCategory] = useState<string>("")
    const [productPhoto, setProductPhoto] = useState<any>()
    const [price, setPrice] = useState<string>()
    const [stock, setStock] = useState<string>()
    const [desconto, setDesconto] = useState<string>()

    useEffect(() => {
        Axios.get(`${baseApiUrl}/categorias`)
            .then(resp => setCategorias(resp.data.data))
    }, [])

    function reset() {
        setTitulo("")
        setCategory("")
        setProductPhoto(undefined)
        setPrice("")
        setStock("")
        setDesconto("")
        setProductToUpdateOrDeleteId(undefined)
    }

    const prepareImageToUpload = (input: any) => {
        const hash = Math.floor(Date.now())
        setProductPhoto({ file: input.files[0], coverNome: `produto-capa-${hash}-${Math.random() * 1000}` })
    }

    const renderCategoriesOption = () =>
        categorias.map((categoria: categoriaModel, index: number) =>
            <option key={`category-option-${index}`} value={categoria.id}>{categoria.nome}</option>)

    function save() {
        const info = {
            titulo,
            category,
            imagemUrl: productPhoto ? `${baseApiUrl}/produtoCapa/${productPhoto.coverNome}.${productPhoto.file.type.split("/")[1]}` : null,
            price,
            stock,
            desconto
        }

        if (!productToUpdateOrDeleteId) {
            Axios.post(`${baseApiUrl}/produtos`, info)
                .then(async resp => {
                    if (productPhoto) {
                        const cover = new FormData()
                        cover.append("coverFoto", productPhoto.file, productPhoto.coverNome)
                        await Axios.post(`${baseApiUrl}/upload`, cover)
                    }
                    showMessage("Produto criado").successMessage()
                    reset()
                })
                .catch(err => showMessage(err.response.data).errorMessage())
        } else {
            Axios.put(`${baseApiUrl}/produtos`, { ...info, id: productToUpdateOrDeleteId })
                .then(async resp => {
                    showMessage("Produto atualizado").successMessage()
                    reset()
                    if (productPhoto) {
                        const cover = new FormData()
                        cover.append("coverFoto", productPhoto.file, productPhoto.coverNome)
                        Axios.post(`${baseApiUrl}/upload`, cover)
                    }
                })
                .catch(err => showMessage(err.response.data).errorMessage())
        }
    }

    function deleteProduct() {
        Axios.delete(`${baseApiUrl}/produtos/${productToUpdateOrDeleteId}`)
            .then(resp => {
                showMessage("Produto excluído").successMessage()
                reset()
            })
            .catch(err => showMessage("Erro ao excluir produto").errorMessage())
    }

    return (
        <>
            <div className="product-form row">
                <div className="product-input col s12 m6">
                    <div>
                        <label htmlFor="titulo-produto">Titulo do produto</label>
                    </div>
                    <div>
                        <input type="text" placeholder="Titulo do produto" name="titulo-produto" value={titulo} onChange={e => setTitulo(e.target.value)} />
                    </div>
                </div>

                <div className="product-input col s12 m6">
                    <div>
                        <label htmlFor="categoria-produto">Categoria</label>
                    </div>
                    <div>
                        <select name="categoria-produto" style={{ display: "block" }} onChange={e => setCategory(e.target.value)}>
                            <option>--Categoria--</option>
                            {renderCategoriesOption()}
                        </select>
                    </div>
                </div>

                <div className="product-input col s12 m6">
                    <div>
                        <label htmlFor="foto-produto">Foto do produto</label>
                    </div>
                    <div>
                        <input type="file" onChange={e => prepareImageToUpload(e.target)} />
                    </div>
                </div>


                <div className="product-input col s12 m6">
                    <div>
                        <label htmlFor="preco-produto">Preço</label>
                    </div>
                    <div>
                        <input type="number" placeholder="Preço do produto" name="preco-produto" value={price} onChange={e => setPrice(e.target.value)} />
                    </div>
                </div>

                <div className="product-input col s12 m6">
                    <div>
                        <label htmlFor="estoque-quantidade">Quantidade em estoque</label>
                    </div>
                    <div>
                        <input type="number" placeholder="Quantidade em estoque" name="estoque-quantidade" value={stock} onChange={e => setStock(e.target.value)} />
                    </div>
                </div>

                <div className="product-input col s12 m6">
                    <div>
                        <label htmlFor="produto-desconto">Desconto do produto</label>
                    </div>
                    <div>
                        <input type="number" placeholder="Informe se o produto tiver algum desconto em porcentagem. EX: 15" name="produto-desconto"
                            value={desconto} onChange={e => setDesconto(e.target.value)} />
                    </div>
                </div>

                <div className="submit-button col s12">
                    <div>
                        <button className="teal dark-1 white-text hovernable" onClick={save}>Salvar</button>
                    </div>
                    <div>
                        <button onClick={() => reset()}>Cancelar</button>
                    </div>
                    {productToUpdateOrDeleteId ? (
                        <div>
                            <button style={{ backgroundColor: "#f44" }} onClick={deleteProduct}>Excluir</button>
                        </div>
                    ) : <></>}
                </div>
            </div>

            <Products isInAdminPage
                setProductSelectedId={setProductToUpdateOrDeleteId} setTitulo={setTitulo} setPrice={setPrice}
                setDesconto={setDesconto} setStock={setStock} setCategory={setCategory}  />
        </>
    )
}