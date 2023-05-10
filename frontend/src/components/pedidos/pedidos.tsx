import Axios from "axios"
import React, { useState, useEffect } from "react"
import { useSearchParams } from "react-router-dom"
import { baseApiUrl, showMessage } from "../../global"
import { pedidoModel, usuarioModel } from "../../models/interface"
import pencil from "../../img/pencil.svg"
import trash from "../../img/trash.svg"
import useAuth from "../../contextApi/hook/useAuth"
import Paginator from "../paginator/paginator"

export default function PedidosTemplate() {
    const [searchParams, setSearchParams] = useSearchParams()

    const [pedidos, setPedidos] = useState<pedidoModel[]>([])
    const [pedidoToChangeId, setPedidoToChangeId] = useState<number>()
    const [pages, setPages] = useState<number>(0)

    const [page, setPage] = useState<number | string>(searchParams.get("page") || 1)
    const [itemsPerPage, setItemsPerPage] = useState<string>(searchParams.get("limit") || "20")
    const [orderBy, setOrderBy] = useState<any>(searchParams.get("orderBy") || "id")
    const [status, setStatus] = useState<string>()

    const { user } = useAuth()

    const loadPedidos = (page: number | string, userId: number) => {
        Axios.get(`${baseApiUrl}/pedidos?page=${page}&limit=${itemsPerPage}&orderBy=${orderBy}&userId=${userId}`)
            .then(resp => {
                setPedidos(resp.data.data)
                setPages(resp.data.pages)
            })
    }

    useEffect(() => {
        const useLogged: usuarioModel = JSON.parse(`${localStorage.getItem("user_logged")}`)
        loadPedidos(page, useLogged.id)
    }, [])

    function filterProduct(typeFilter: string, filter: string) {
        switch (typeFilter) {
            case "itemPorPagina":
                setItemsPerPage(filter)

                Axios.get(`${baseApiUrl}/pedidos?limit=${filter}&orderBy=${orderBy}&userId=${user?.id}`)
                    .then(resp => {
                        setPages(resp.data.pages)
                        setPedidos(resp.data.data)
                    })
                    .catch(err => showMessage("Erro ao filtar item").errorMessage())
                break

            case "status":
                setOrderBy(filter)

                Axios.get(`${baseApiUrl}/pedidos?limit=${itemsPerPage}&orderBy=${filter}&userId=${user?.id}`)
                    .then(resp => {
                        setPages(resp.data.pages)
                        setPedidos(resp.data.data)
                    })
                    .catch(err => showMessage("Erro ao filtar item").errorMessage())
                break
        }
    }

    function setPedidoCancelado(pedido: pedidoModel) {
        Axios.put(`${baseApiUrl}/pedidos`, { id: pedido.id, status: "Cancelado" })
            .then(async resp => {
                showMessage("Pedido cancelado").successMessage()
                loadPedidos(page, user?.id)
            })
            .catch(err => showMessage("Erro ao cancelar pedido").errorMessage())
    }

    function changePedidoStatus() {
        Axios.put(`${baseApiUrl}/pedidos`, { id: pedidoToChangeId, status, isAdmin: user?.isAdmin })
            .then(resp => {
                showMessage("Status alterado").successMessage()
                loadPedidos(page, user?.id)
            })
            .catch(err => showMessage("Erro ao mudar status do pedido").errorMessage())
    }

    function renderPedidos() {
        return pedidos.map((pedido: pedidoModel, index: number) => {
            let backgroundColor = ""
            if (pedido.status === "Cancelado") backgroundColor = "#f00"
            if (pedido.status === "Em aberto") backgroundColor = "#ff0"
            if (pedido.status === "Pago") backgroundColor = "#008000"
            return (
                <tr key={`pedido-${index}`}>
                    <td>{pedido.id}</td>
                    <td>R${pedido.total}</td>
                    <td style={{ backgroundColor: backgroundColor }}>{pedido.status}</td>
                    <td className="actions-buttons">
                        {user?.isAdmin ? (
                            <button onClick={() => {
                                setPedidoToChangeId(pedido.id)
                                setStatus(pedido.status)
                            }}>
                                <img src={pencil} alt="Icone que representa edição" title="Editar" />
                            </button>
                        ) : <></>}

                        {!user?.isAdmin ? (
                            <>
                                {pedido.status !== "Pago" ? (
                                    <button title="Cancelar pedido" onClick={() => setPedidoCancelado(pedido)}>
                                        <img src={trash} alt="Icone que representa excluir" title="Cancelar pedido"></img>
                                    </button>
                                ) : <span>Operação já foi paga e não pode ser mais cancelada</span>}
                            </>
                        ) : <></>}
                    </td>
                </tr>
            )
        })
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
                        <label htmlFor="orderBy">Ordenar Por</label>
                        <select name="status" id="orderBy" style={{ display: "block" }} onChange={e => filterProduct("status", e.target.value)}>
                            <option value="id">Codigo</option>
                            <option value="status">Status</option>
                            <option value="total asc">Total maior pro menor</option>
                            <option value="total desc">Total menor pro maior</option>
                        </select>
                    </div>

                    {pedidoToChangeId ? (
                        <div className="col m3 s12">
                            <label htmlFor="status">Mudar status</label>
                            <select name="status" id="status" style={{ display: "block" }} value={status} onChange={e => setStatus(e.target.value)}>
                                <option value="Em aberto">Em aberto</option>
                                <option value="Cancelado">Cancelada</option>
                                <option value="Pago">Confirmada</option>
                            </select>
                        </div>
                    ) : <></>}
                </div>
            </div>

            {pedidoToChangeId ? (
                <div className="submit-button">
                    <button onClick={() => changePedidoStatus()}>Salvar</button>
                    <button onClick={() => {
                        setPedidoToChangeId(undefined)
                    }}>Cancelar</button>
                </div>
            ) : <></>}

            <table>
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>

                <tbody>
                    {renderPedidos()}
                </tbody>
            </table>

            <div style={{display: "flex", justifyContent: "center"}}>
                <Paginator PageUrl={`/pedidos?limit=${itemsPerPage}&orderBy=${orderBy}`} pages={pages} />
            </div>
        </>
    )
}