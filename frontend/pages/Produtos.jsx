import { useState } from 'react'
import { RowProduto } from '../components/RowProduto'

import './Style.css'
import { useEffect } from 'react'
import { NavBar } from '../components/NavBar'

function Produtos() {

  const [arrayProdutos, setArrayProdutos] = useState(null)

  const fetchProdutos = async () => {
    console.log('fetchProdutos');
  
    const response = await fetch('http://localhost:3333/produtos')
    const produtos = await response.json()

    return produtos;
  }
  
  const loadProdutos = async () => {
        console.log('loadprodutos');
        const produtos = await fetchProdutos();
        setArrayProdutos(produtos);
  };


  useEffect(() => {
    loadProdutos();
  }, []);
  
  const addProdutos = async (event) => {

    event.preventDefault();

    const inputForm = document.getElementById('input-form')
  
    const produto = { title: inputForm.value };
  
    await fetch('http://localhost:3333/produtos', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(produto),
    });
   
  
    loadProdutos();
    inputForm.value = '';
  }  
  
  
  
  const updateProdutos = async (id_produto, nome) => {
    
    console.log('updateprodutos, id:', id_produto, "nome:", nome)

    const nome_produto = { title: nome };


    await fetch(`http://localhost:3333/produtos/${id_produto}`, {
      method: 'put',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nome_produto),
    });

    console.log('update pos fetch')
  
    loadProdutos();  
  }

  const deleteProdutos = async (id_produto) => {

      console.log('Delete id front:', id_produto);
    
      await fetch(`http://localhost:3333/produtos/${id_produto}`, {
        method: 'delete',
      });
    
      loadProdutos();
  }


  return (
    <div className="App">
      <NavBar></NavBar>
      <div className="container">

      
        <h1 id='title'>Produtos</h1>

        <div className="form-table">
        
          <form className='add-form'>
            <input id='input-form' type="text" placeholder="Adicionar produtos"/>
            <button className='add-button' onClick={addProdutos} type='submit'>+</button>
          </form>

          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Título</th>
                <th>SKU</th>
                <th>Estoque</th>
                <th>Preço</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {arrayProdutos != null && arrayProdutos.map((produto, i) => (
                
                <RowProduto
                key={i}
                id={produto["id_produto"]}
                titulo={produto["titulo_produto"]}
                sku={produto["sku_produto"]}
                preco={produto["preco"]}
                estoque={produto["estoque"]}
                updateFunction={updateProdutos}
                deleteFunction={deleteProdutos}>
                </RowProduto>
              ))
              }
            </tbody>
          </table>
        </div>


      </div>

    </div>
  )
    
}

export default Produtos;
