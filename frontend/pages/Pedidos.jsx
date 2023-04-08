import { useState } from 'react'
import { RowPedido } from '../components/RowPedido'

import './Style.css'
import { useEffect } from 'react'
import { NavBar } from '../components/NavBar'

function Pedidos() {

  const [arrayPedidos, setArrayPedidos] = useState(null)

  const fetchpedidos = async () => {
    console.log('fetchpedidos');
  
    const response = await fetch('http://localhost:3333/pedidos')
    const pedidos = await response.json()

    return pedidos;
  }
  
  const loadPedidos = async () => {
        console.log('loadPedidos');
        const pedidos = await fetchpedidos();
        setArrayPedidos(pedidos);
  };


  useEffect(() => {
    loadPedidos();
  }, []);
  
  const addPedidos = async (event) => {

    event.preventDefault();

    const inputForm = document.getElementById('input-form')
  
    const pedido = { title: inputForm.value };
  
    await fetch('http://localhost:3333/pedidos', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(pedido),
    });
   
  
    loadPedidos();
    inputForm.value = '';
  }  
  
  
  
  const updatePedidos = async (id_pedido, cliente, produto, status) => {
    
    //console.log('updatePedidos, id:', id_pedido, "nome:", nome)

    const newInfo = { novoCliente: cliente, novoProduto: produto, novoStatus: status };


    await fetch(`http://localhost:3333/pedidos/${id_pedido}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newInfo),
    });

    console.log('update pos fetch')
  
    loadPedidos();  
  } 

  const deletePedidos = async (id_pedido) => {

      console.log('Delete id front:', id_pedido);
    
      await fetch(`http://localhost:3333/pedidos/${id_pedido}`, {
        method: 'delete',
      });
    
      loadPedidos();
  }



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



  return (
    <div className="App">
      <NavBar></NavBar>
      <div className="container">

      
        <h1 id='title'>Pedidos</h1>

        <div className="form-table">

        
          <form className='add-form'>
            <input id='input-form' type="text" placeholder="Adicionar pedidos"/>
            <button className='add-button' onClick={addPedidos} type='submit'>+</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>ID Pedido</th>
                <th>ID Cliente</th>
                <th>ID Produto</th>
                <th>Data do Pedido</th>
                <th>Status do Pedido</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {arrayPedidos != null && arrayPedidos.map((pedido, i) => (
                <RowPedido
                key={i}
                id_pedido={pedido["id_pedido"]}
                id_cliente={pedido["id_cliente"]}
                id_produto={pedido["id_pedido"]}
                data_pedido={pedido["data_pedido"]}
                status_pedido={pedido["status_pedido"]}
                updateFunction={updatePedidos}
                deleteFunction={deletePedidos}
                clientes={arrayClientes}>
                </RowPedido>
              ))
              }
            </tbody>
          </table>
        </div>


      </div>

    </div>
  )
    
}

export default Pedidos;
