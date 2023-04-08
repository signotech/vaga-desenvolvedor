import { useState } from 'react'
import './Row.css'

export const RowCliente = ({ id, nome, cpf, email, deleteFunction, updateFunction }) => {

    const [editFlag, setEditFlag] = useState(false)

    const editCliente = () => {
        if(editFlag === false){
            /* editar nome*/
            const elemento = '#nome'+id
            const editNome = document.querySelector(elemento)

            const editForm1 = document.createElement('input');
            editForm1.classList.add('editForm')
            editForm1.value = editNome.innerText
            editNome.innerText = ''
            editNome.appendChild(editForm1)

            /**/
            const elemento2 = '#cpf'+id
            const editCPF = document.querySelector(elemento2)

            const editForm2 = document.createElement('input');
            editForm2.classList.add('editForm')
            editForm2.value = editCPF.innerText
            editCPF.innerText = ''
            editCPF.appendChild(editForm2)

            /*email*/
            const elemento3 = '#email'+id
            const editEmail = document.querySelector(elemento3)

            const editForm3 = document.createElement('input');
            editForm3.classList.add('editForm')
            editForm3.value = editEmail.innerText
            editEmail.innerText = ''
            editEmail.appendChild(editForm3)

            /*endereco*/
            const elemento4 = '#endereco'+id
            const editEndereco = document.querySelector(elemento4)

            const editForm4 = document.createElement('input');
            editForm4.classList.add('editForm')
            editForm4.value = editEndereco.innerText
            editEndereco.innerText = ''
            editEndereco.appendChild(editForm4)




            setEditFlag(true)
        }
        else{
            const editForm = document.querySelectorAll('.editForm')
            console.log(editForm[0].value, editForm[1].value, editForm[2].value, editForm[3].value)
            updateFunction(id, editForm[0].value, editForm[1].value, editForm[2].value, editForm[3].value)
            setEditFlag(false)
        }
    }
   


    return(
        <tr className=".Row">
            <td>{id}</td>
            <td id={'nome'+id}>
                {nome}
                </td>
            <td id={'cpf'+id}>
                {cpf}
            </td>
            <td id={'email'+id}>
                {email}
            </td>
            <td id={'endereco'+id}>
                Endereço
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