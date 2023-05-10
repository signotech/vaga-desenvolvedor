import Axios from "axios"
import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import useAuth from "../../../contextApi/hook/useAuth"
import { baseApiUrl, showMessage } from "../../../global"

import pencil from "../../../img/pencil.svg"
import trash from "../../../img/trash.svg"
import { usuarioModel } from "../../../models/interface"
import Paginator from "../../paginator/paginator"

interface categoriesProps { page: any }

export default function ClientsTemplate(props: categoriesProps) {
    const [searchParams, setSearchParams] = useSearchParams()

    const [clientes, setclientes] = useState<usuarioModel[]>([])
    const [pages, setPages] = useState<any>(0)
    const [admin, setAdmin] = useState<number | string>("0")
    const [userToChangeId, setUserToChangeId] = useState<number>()
    const [mode, setMode] = useState<string>("atualizar")

    const [page, setPage] = useState<any>(searchParams.get("page") || 1)
    const [itemsPerPage, setItemsPerPage] = useState<any>(searchParams.get("limit") || "20")
    const [nome, setNome] = useState<string>(searchParams.get("nome") || "")
    const [orderBy, setOrderBy] = useState<string>(searchParams.get("orderBy") || "id")

    const { user } = useAuth()

    const loadUsers = (page: number) => {
        Axios.get(`${baseApiUrl}/clientes?page=${page}&limit=${itemsPerPage}&name=${nome}&orderBy=${orderBy}`)
            .then(resp => {
                setclientes(resp.data.data)
                setPages(resp.data.pages)
            })
    }

    useEffect(() => {
        setPage(page)
        loadUsers(page)
    }, [])

    const reset = () => {
        loadUsers(page)
        setUserToChangeId(undefined)
        setUserToChangeId(undefined)
        setMode("salvar")
    }

    function save() {
        if (mode === "atualizar") {
            if (userToChangeId !== user?.id) {
                Axios.put(`${baseApiUrl}/clientes`, { id: userToChangeId, admin })
                    .then(resp => {
                        showMessage("Cliente atualizado").successMessage()
                        reset()
                    })
                    .catch(err => showMessage("Erro ao atualizar cliente").errorMessage())
            } else {
                showMessage("Você não pode alterar seu próprio cadastro").errorMessage()
            }

        } else if (mode === "deletar") {
            if (userToChangeId !== user?.id) {
                Axios.delete(`${baseApiUrl}/clientes/${userToChangeId}`)
                    .then(resp => {
                        showMessage("Cliente excluído").successMessage()
                        reset()
                    })
                    .catch(err => showMessage("Erro ao excluir").errorMessage())
            } else {
                showMessage("Você não pode se excluir do sistema").errorMessage()
            }
        }
    }

    function filterProduct(typeFilter: string, filter: string) {
        switch (typeFilter) {
            case "itemPorPagina":
                setItemsPerPage(filter)

                Axios.get(`${baseApiUrl}/clientes?limit=${filter}&nome=${nome}`)
                    .then(resp => {
                        setPages(resp.data.pages)
                        console.log(resp.data.pages)
                        setclientes(resp.data.data)
                    })
                    .catch(err => showMessage("Erro ao filtar item").errorMessage())
                break

            case "nome":
                setNome(filter)

                Axios.get(`${baseApiUrl}/clientes?limit=${itemsPerPage}&orderBy=${orderBy}&name=${filter}`)
                    .then(resp => {
                        setPages(resp.data.pages)
                        setclientes(resp.data.data)
                    })
                    .catch(err => showMessage("Erro ao filtar item").errorMessage())
                break

            case "nomeEEmail":
                setOrderBy(filter)

                Axios.get(`${baseApiUrl}/clientes?limit=${itemsPerPage}&orderBy=${filter}&name=${nome}`)
                    .then(resp => {
                        setPages(resp.data.pages)
                        setclientes(resp.data.data)
                    })
                    .catch(err => showMessage("Erro ao filtar item").errorMessage())
                break
        }
    }

    function renderClients() {
        return clientes.map((user: usuarioModel, index: number) => {
            return (
                <tr key={`user-${index}`}>
                    <td>{user.nome}</td>
                    <td>{user.email}</td>
                    <td>{user.isAdmin === 1 ? "Sim" : "Não"}</td>
                    <td className="actions-buttons">
                        <button onClick={() => {
                            setUserToChangeId(user.id)
                            setAdmin(user.isAdmin)
                            setMode("atualizar")
                        }}>
                            <img src={pencil} alt="Icone que representa edição" title="Editar" />
                        </button>
                        <button onClick={() => {
                            setUserToChangeId(user.id)
                            setAdmin(user.isAdmin)
                            setMode("deletar")
                        }}>
                            <img src={trash} alt="Icone que representa excluir" title="Excluir"></img>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    return (
        <>
            <div>
                <div>
                    <div>
                        <label htmlFor="user-admin">Administrador</label>
                    </div>
                    <div>
                        <select name="is-admin" id="user-admin" value={admin} onChange={e => setAdmin(e.target.value)} style={{ display: "block" }}>
                            <option value="0">Não</option>
                            <option value="1">Sim</option>
                        </select>
                    </div>
                </div>

                <div className="submit-button">
                    <div>
                        <button className="teal dark-1 white-text hoverable" onClick={save}>{mode !== "deletar" ? "Salvar" : "Excluir"}</button>
                    </div>
                    <div>
                        <button className="hoverable" onClick={() => {
                            setUserToChangeId(undefined)
                            setMode("salvar")
                        }}>Cancelar</button>
                    </div>
                </div>
                {mode === "deletar" ? <span>Atenção! Ao excluir uma cliente, os pedido pedidos feitos por ele será excluido junto</span> : <></>}
            </div>

            <div className="filters">
                <div className="items-per-page row">
                    <div className="col m3 s12">
                        <label htmlFor="items-per-page">Itens por pagina</label>
                        <input type="number" onChange={e => filterProduct("itemPorPagina", e.target.value)} />
                    </div>

                    <div className="col m3 s12">
                        <label htmlFor="name">Nome</label>
                        <input id="name" type="text" value={nome} onChange={e => filterProduct("nome", e.target.value)} />
                    </div>

                    <div className="col m3 s12">
                        <label htmlFor="preco">Ordenar por</label>
                        <select name="preco" id="preco" style={{ display: "block" }} onChange={e => filterProduct("nomeEEmail", e.target.value)}>
                            <option value="nome asc">Nome em ordem normal</option>
                            <option value="nome desc">Nome em ordem reversa</option>
                            <option value="email asc">Email em ordem normal</option>
                            <option value="email desc">Email em ordem reversa</option>
                        </select>
                    </div>
                </div>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Admin</th>
                        </tr>
                    </thead>

                    <tbody>
                        {renderClients()}
                    </tbody>
                </table>

                <Paginator pages={pages} PageUrl={`/clientes?&limit=${itemsPerPage}&nome=${nome}&orderBy=${orderBy}`} />
            </div>
        </>
    )
}