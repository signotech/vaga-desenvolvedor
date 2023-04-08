import { useState } from 'react'
import './Row.css'

export const RowProduto = ({ id, titulo, sku, preco, estoque, deleteFunction, updateFunction }) => {

    const [editFlag, setEditFlag] = useState(false)

    const editCliente = () => {
        if(editFlag === false){
            const elemento = '#titulo'+id
            const editNome = document.querySelector(elemento)
            console.log(elemento, editNome)
            
            const editForm = document.createElement('input');
            editForm.classList.add('editForm')
            editForm.value = editNome.innerText
            editNome.innerText = ''
            editNome.appendChild(editForm)
            setEditFlag(true)
        }
        else{
            const editForm = document.querySelector('.editForm')
            updateFunction(id, editForm.value)
            setEditFlag(false)
        }
    }
   


    return(
        <tr className=".Row">
            <td>{id}</td>
            <td id={'titulo'+id}>
                {titulo}
                </td>
            <td id={'sku'+id}>
                {sku}
            </td>
            <td id={'preco'+id}>
                {preco}
            </td>
            <td id={'estoque'+id}>
                {estoque}
            </td>
            <td>
                <button className="btn-action" onClick={() => editCliente()}>
                <span className="material-symbols-outlined">edit</span>
                </button>

                <button className="btn-action" onClick={() => deleteFunction(id)}>
                <span className="material-symbols-outlined">delete</span>
                </button>
            </td>
        </tr>
    )
}