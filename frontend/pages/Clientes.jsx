import { useState } from 'react'
import { RowCliente } from '../components/RowCliente'

import './Style.css'
import { useEffect } from 'react'
import { NavBar } from '../components/NavBar'

function App() {

  const [arrayClientes, setArrayClientes] = useState(null)

  const fetchClientes = async () => {
    console.log('fetchClientes');
  
    const response = await fetch('http://localhost:3333/clientes')
    const clientes = await response.json()

    return clientes;
  }
  
  const loadClientes = async () => {
        console.log('loadClientes');
        const clientes = await fetchClientes();
        setArrayClientes(clientes);
  };


  useEffect(() => {
    loadClientes();
  }, []);
  
  const addClientes = async (event) => {

    event.preventDefault();

    const inputForm = document.getElementById('input-form')
  
    const cliente = { title: inputForm.value };
  
    await fetch('http://localhost:3333/clientes', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cliente),
    });
   
  
    loadClientes();
    inputForm.value = '';
  }  
  
  
  
  const updateClientes = async (id_cliente, nome, cpf, email, endereco) => {
    
    console.log('updateClientes, id:', id_cliente, "nome:", nome)

    const newInfo = { novoNome: nome, novoCpf: cpf, novoEmail: email, novoEndereco: endereco};


    await fetch(`http://localhost:3333/clientes/${id_cliente}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInfo),
    });

    console.log('update pos fetch')
  
    loadClientes();  
  }

  const deleteClientes = async (id_cliente) => {

      console.log('Delete id front:', id_cliente);
    
      await fetch(`http://localhost:3333/clientes/${id_cliente}`, {
        method: 'delete',
      });
    
      loadClientes();
  }


  return (
    <div className="App">
      <NavBar></NavBar>
      <div className="container">

      
        <h1 id='title'>Clientes</h1>

        <div className="form-table">

        
          <form className='add-form'>
            <input id='input-form' type="text" placeholder="Adicionar clientes"/>
            <button className='add-button' onClick={addClientes} type='submit'>+</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>CPF/CNPJ</th>
                <th>Email</th>
                <th>Endereço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {arrayClientes != null && arrayClientes.map((cliente, i) => (
                <RowCliente
                key={i}
                id={cliente["id_cliente"]}
                nome={cliente["nome_cliente"]}
                cpf={cliente["cpf_cliente"]}
                email={cliente["email_cliente"]}
                updateFunction={updateClientes}
                deleteFunction={deleteClientes}>
                </RowCliente>
              ))
              }
            </tbody>
          </table>
        </div>


      </div>

    </div>
  )
    
}

export default App
