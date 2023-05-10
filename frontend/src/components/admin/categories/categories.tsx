import Axios from "axios"
import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { baseApiUrl, showMessage } from "../../../global"

import pencil from "../../../img/pencil.svg"
import trash from "../../../img/trash.svg"
import { categoriaModel } from "../../../models/interface"
import Paginator from "../../paginator/paginator"

import "./categories.css"

export default function Categories() {
    const [searchParams, setSearchParams] = useSearchParams()

    const [categorias, setCategorias] = useState<categoriaModel[]>([])
    const [pages, setPages] = useState<any>(0)
    const [nome, setNome] = useState<any>("")
    const [categoriaPaiId, setCategoriaPaiId] = useState<number | string>()
    const [categoryToChangeId, setCategoryToChangeId] = useState<number>()
    const [mode, setMode] = useState<string>("salvar")

    const [page, setPage] = useState<any>(searchParams.get("page") || 1)
    const [nomeSearch, setNomeSeach] = useState<any>(searchParams.get("nome") || "")
    const [itemsPerPage, setItemsPerPage] = useState<any>(searchParams.get("limit") || "20")
    const [orderBy, setOrderBy] = useState<any>(searchParams.get("orderBy") || "id")

    const loadCategories = (page: number) => {
        Axios.get(`${baseApiUrl}/categorias?page=${page}&nome=${nomeSearch}&limit=${itemsPerPage}`)
            .then(resp => {
                setCategorias(resp.data.data)
                setPages(resp.data.pages)
            })
    }

    useEffect(() => {
        setPage(page)
        loadCategories(page)
    }, [])

    const reset = () => {
        loadCategories(page)
        setNome("")
        setCategoryToChangeId(undefined)
        setCategoryToChangeId(undefined)
        setMode("salvar")
    }

    function save() {
        if (mode === "atualizar") {
            Axios.put(`${baseApiUrl}/categorias`, { categoryToChangeId, nome, categoriaPaiId })
                .then(resp => {
                    showMessage("Categoria atualizada").successMessage()
                    reset()
                })
                .catch(err => showMessage(err.response.data).errorMessage())

        } else if (mode === "salvar") {
            Axios.post(`${baseApiUrl}/categorias`, { nome, categoriaPaiId })
                .then(resp => {
                    showMessage("Categoria criada").successMessage()
                    reset()
                })
                .catch(err => showMessage(err.response.data).errorMessage())
        } else if (mode === "deletar") {
            Axios.delete(`${baseApiUrl}/categorias/${categoryToChangeId}`)
                .then(resp => {
                    showMessage("Categoria excluida").successMessage()
                    reset()
                })
                .catch(err => showMessage("Erro ao excluir").errorMessage())
        }
    }

    function renderCategories() {
        return categorias.map((categoria: categoriaModel, index: number) => {
            return (
                <tr key={`categoria-item-${index}`}>
                    <td>{categoria.nome}</td>
                    <td>{categoria.categoriaPai}</td>
                    <td className="actions-buttons">
                        <button onClick={() => {
                            setCategoryToChangeId(categoria.id)
                            setCategoriaPaiId(categoria.parentId)
                            setNome(categoria.nome)
                            setMode("atualizar")
                        }}>
                            <img src={pencil} alt="Icone que representa edição" title="Editar" />
                        </button>
                        <button onClick={() => {
                            setCategoryToChangeId(categoria.id)
                            setCategoriaPaiId(categoria.parentId)
                            setNome(categoria.nome)
                            setMode("deletar")
                        }}>
                            <img src={trash} alt="Icone que representa excluir" title="Excluir"></img>
                        </button>
                    </td>
                </tr>
            )
        })
    }


    const renderCategoriesOption = () =>
        categorias.map((categoria: categoriaModel, index: number) => <option key={`category-option-${index}`} value={categoria.id}>{categoria.nome}</option>)

    function filterProduct(typeFilter: string, filter: string) {
        switch (typeFilter) {
            case "itemPorPagina":
                setItemsPerPage(filter)

                Axios.get(`${baseApiUrl}/categorias?limit=${filter}&nome=${nomeSearch}`)
                    .then(resp => {
                        setPages(resp.data.pages)
                        setCategorias(resp.data.data)
                        console.log(resp.data.pages)
                    })
                    .catch(err => showMessage("Erro ao filtar item").errorMessage())
                break

            case "nome":
                setNomeSeach(filter)

                Axios.get(`${baseApiUrl}/categorias?limit=${itemsPerPage}&nome=${filter}`)
                    .then(resp => {
                        setPages(resp.data.pages)
                        setCategorias(resp.data.data)
                    })
                    .catch(err => showMessage("Erro ao filtar item").errorMessage())
                break

            case "orderByName":
                setOrderBy(filter)

                Axios.get(`${baseApiUrl}/categorias?limit=${itemsPerPage}&orderBy=${filter}&nome=${nomeSearch}`)
                    .then(resp => {
                        setPages(resp.data.pages)
                        setCategorias(resp.data.data)
                    })
                    .catch(err => showMessage("Erro ao filtar item").errorMessage())
                break
        }
    }

    return (
        <>
            <div>
                <div className="row">
                    <div className="col s12 m6">
                        <div>
                            <label htmlFor="nome-categoria">Nome</label>
                        </div>
                        <div>
                            <input type="text" name="nome-categoria" value={nome} onChange={e => setNome(e.target.value)} disabled={mode === "deletar"} />
                        </div>
                    </div>

                    <div className="col s12 m6">
                        <div>
                            <label htmlFor="categoria-pai">Categoria Pai</label>
                        </div>
                        <div>
                            <select style={{ display: "block" }} value={categoriaPaiId} onChange={e => setCategoriaPaiId(e.target.value)}>
                                <option value="">Nova categoria raiz</option>
                                {renderCategoriesOption()}
                            </select>
                        </div>
                    </div>
                </div>

                <div className="submit-button">
                    <div>
                        <button className="teal dark-1 white-text hoverable" onClick={save}>{mode !== "deletar" ? "Salvar" : "Excluir"}</button>
                    </div>
                    <div>
                        <button className="hoverable" onClick={() => {
                            setCategoryToChangeId(undefined)
                            setNome("")
                            setMode("salvar")
                        }}>Cancelar</button>
                    </div>
                </div>
                {mode === "deletar" ? <span>Atenção! Ao excluir uma categoria, os produtos e as subcategorias serão excluidas junto</span> : <></>}
            </div>

            <div className="filters">
                <div className="items-per-page row">
                    <div className="col m3 s12">
                        <label htmlFor="items-per-page">Itens por pagina</label>
                        <input type="number" onChange={e => filterProduct("itemPorPagina", e.target.value)} />
                    </div>

                    <div className="col m3 s12">
                        <label htmlFor="title">Nome</label>
                        <input id="title" type="text" onChange={e => filterProduct("nome", e.target.value)} />
                    </div>

                    <div className="col m3 s12">
                        <label htmlFor="orderByName">Ordernar Por</label>
                        <select name="preco" id="orderByName" style={{ display: "block" }} value={orderBy} onChange={e => filterProduct("orderByName", e.target.value)}>
                            <option value="nome asc">Nome crescente</option>
                            <option value="nome desc">Nome descrescente</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Categoria Pai</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {renderCategories()}
                    </tbody>
                </table>

                <Paginator pages={pages} PageUrl={`/categorias?nome=${nomeSearch}&limit=${itemsPerPage}`} />
            </div>
        </>
    )
}