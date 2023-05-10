import Axios from "axios"
import React, { useEffect, useState } from "react"

import cartIcon from "../../../img/cart-icon.png"
import { produtoModel } from "../../../models/interface"
import trashIcon from "../../../img/trash.svg"
import "./cart.css"
import { baseApiUrl, showMessage } from "../../../global"
import useAuth from "../../../contextApi/hook/useAuth"

export default function Cart() {
    const [cart, setCart] = useState<any[]>([])
    const [total, setTotal] = useState<number>(1)

    const [cartVisible, setCartVisible] = useState<boolean>(false)

    const { user } = useAuth()

    useEffect(() => {
        const cart = JSON.parse(`${localStorage.getItem("cart")}`)

        if (cart) setCart(cart)
    }, [])

    useEffect(() => {
        let total = 0
        for (let car of cart) total = total + car.total
        setTotal(total)
    }, [cart])

    function aumentarOuDiminuirItem(product: produtoModel, diminuirOuAumentar: string) {
        const newCart = cart.map((cart: produtoModel) => {
            if (diminuirOuAumentar === "aumentar") {
                if (cart.id === product.id) {
                    if (cart.amount && cart.total && cart.amount < + cart.estoque) {
                        cart.amount = cart.amount + 1
                        cart.total = cart.preco * cart.amount
                    }
                }
                return cart
            } else if (diminuirOuAumentar === "diminuir") {
                if (cart.id === product.id) {
                    if (cart.amount && cart.total && cart.amount > 1) {
                        cart.amount = cart.amount - 1
                        cart.total = cart.preco * cart.amount
                    }
                }
                return cart
            }
        })
        setCart(newCart)
        localStorage.setItem("cart", JSON.stringify(newCart))
    }

    function removeItemFromCart(product: produtoModel) {
        const cartFiltered = cart.filter(cart => cart.id != product.id)
        setCart(cartFiltered)

        localStorage.setItem("cart", JSON.stringify(cartFiltered))
    }

    function irParaPedido() {
        Axios.post(`${baseApiUrl}/pedidos`, {clientId: user?.id, total})
            .then(resp => {
                cart.forEach(async (product: produtoModel) => {
                    await Axios.put(`${baseApiUrl}/produtos/estoque`, {
                        estoque: product.estoque - (product?.amount ?? product.estoque),
                        id: product.id
                    })
                })

                localStorage.removeItem("cart")
                window.location.replace("/pedidos")
            })
            .catch(err => showMessage("Erro ao finalizar pedido").errorMessage())
    }

    function renderCartItens() {
        return cart.map((cartItem: produtoModel, index) => {
            return (
                <div className="cart-content" key={`cart-content-${index}`}>
                    <div className="cart-image">
                        <img src={cartItem.imagemURL} alt={cartItem.titulo} />
                    </div>

                    <div>
                        <div className="cart-title">
                            <h4>{cartItem.titulo}</h4>
                        </div>

                        <div className="cart-total">
                            <span>Total R${cartItem.total}</span>
                        </div>

                        <div className="cart-amount">
                            <div>
                                <button title="Aumentar quantidade" onClick={() => aumentarOuDiminuirItem(cartItem, "diminuir")}>-</button>
                                <span>{cartItem.amount}</span>
                                <button title="Diminuir quantidade" onClick={() => aumentarOuDiminuirItem(cartItem, "aumentar")}>+</button>
                            </div>
                            <div className="cart-delete">
                                <button onClick={() => removeItemFromCart(cartItem)}>
                                    <img src={trashIcon}></img>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            )
        })
    }

    return (
        <div className={cartVisible ? "cart-container" : "cart-container-hidden"}>
            <div className="cart-push">
                <button onClick={() => setCartVisible(!cartVisible)} title={cartVisible ? "Esconder carrinho" : "Exibir carrinho"}>
                    <img src={cartIcon} alt="" />
                </button>
            </div>
            <div className="cart">
                <div>
                    {renderCartItens()}
                </div>

                <div>
                    <h5>Subtotal: R${total}</h5>
                </div>

                <div className="submit-button">
                    <button onClick={irParaPedido}>Continuar</button>
                </div>
            </div>
        </div>
    )
}