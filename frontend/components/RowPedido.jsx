import { useState } from 'react'
import './Row.css'

export const RowPedido = ({ id_pedido, id_cliente, id_produto, data_pedido, status_pedido, deleteFunction, updateFunction, clientes }) => {

    const [editFlag, setEditFlag] = useState(false)


    console.log('Clientes:', clientes)
    console.log('Id cliente', id_cliente)

    const edit = () => {
        if(editFlag === false){
            const elemento1 = '#id_cliente'+id_pedido
            const editNome1 = document.querySelector(elemento1)
            console.log(elemento1, editNome1)
            
            const editForm1 = document.createElement('input');
            editForm1.classList.add('editForm')
            editForm1.value = editNome1.innerText
            editNome1.innerText = ''
            editNome1.appendChild(editForm1)

            /**/
            const elemento2 = '#id_produto'+id_pedido
            const editNome2 = document.querySelector(elemento2)
            console.log(elemento2, editNome2)
            
            const editForm2 = document.createElement('input');
            editForm2.classList.add('editForm')
            editForm2.value = editNome2.innerText
            editNome2.innerText = ''
            editNome2.appendChild(editForm2)

            /**/
            const elemento3 = '#status_pedido'+id_pedido
            const editCPF = document.querySelector(elemento3)

            const editForm3 = document.createElement('input');
            editForm3.classList.add('editForm')
            editForm3.value = editCPF.innerText
            editCPF.innerText = ''
            editCPF.appendChild(editForm3)
           
        
            setEditFlag(true)
        }
        else{
            const select = document.querySelector('#select').value
            const editForm = document.querySelectorAll('.editForm')
            updateFunction(id_pedido, select, editForm[1].value, editForm[2].value)
            setEditFlag(false)
        }
    }
   


    return(
        <tr className=".Row">
            <td id={'id_pedido'+id_pedido}>{id_pedido}</td>
            <td id={'id_cliente'+id_pedido}>
               {editFlag &&      
                    <form action="">
                    <select id='select' name="select">
                        {clientes != null && clientes.map((cliente) => 
                            <option value={cliente["id_cliente"]}>{cliente["id_cliente"]}</option>
                        )
                        }
                    </select>
                    </form>
                   }
                   {!editFlag && 
                   id_cliente
                } 
                 
            </td>
            <td id={'id_produto'+id_pedido}>
                {id_produto}
            </td>
            <td id={'data_pedido'+id_pedido}>
                {data_pedido}
            </td>
            <td id={'status_pedido'+id_pedido}>
                {status_pedido}
            </td>
            <td>
                <button className="btn-action" onClick={() => edit()}>
                <span className="material-symbols-outlined">edit</span>
                </button>

                <button className="btn-action" onClick={() => deleteFunction(id_pedido)}>
                <span className="material-symbols-outlined">delete</span>
                </button>
            </td>
        </tr>
    )
}