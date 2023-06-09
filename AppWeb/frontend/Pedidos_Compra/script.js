const elemsModal = document.querySelectorAll(".modal");
const instancesModal = M.Modal.init(elemsModal,{
});
//nav lateral
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

document.addEventListener("DOMContentLoaded", function () {

  function addTokenToHeaders(headers) {
    const token = localStorage.getItem('token');
    return {
      ...headers,
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  const sair = document.getElementById('sair');

  sair.addEventListener('click', () => {
    Swal.fire({
      title: 'Deseja sair?',
      text: "Tem certeza que deseja deslogar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Remover o token do armazenamento local
        localStorage.removeItem('token');
  
        // Redirecionar o usuário para a página de login
        window.location.href = '/frontend/index.html';
      }
    });
  });







  //window.addEventListener("load", obterDadosPedidos);
  const tableBody = document.getElementById("pedidos-table-body");
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  let itemsPerPage = document.getElementById("itemsporpagina").value; // Define o número máximo de pessoas por tabela como 20
  let currentPage = 1;

  const ordenarCheckbox = document.getElementById('ordenar-checkbox');
    ordenarCheckbox.addEventListener('click', () => {
    updateTable();
  });

// Função para obter os dados dos clientes da API
const getPedidos = async (page) => {
  const response = await fetch(`http://localhost:3333/pedidos`,{
    headers: addTokenToHeaders({})
  });
  const data = await response.json();
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
 
  const ordenarCheckbox = document.getElementById('ordenar-checkbox');
  if (ordenarCheckbox.checked) {
    // Ordena os clientes por ordem alfabética pelo nome
    data.sort((a, b) => a.status.localeCompare(b.status));
  }
  return data.slice(startIndex, endIndex);
};

 // Função para atualizar a tabela
 const updateTable = async () => {
  // Mudando os itens por página
  let inputElement = document.getElementById("itemsporpagina");
  inputElement.addEventListener("input", function () {
    itemsPerPage = document.getElementById("itemsporpagina").value;
    updateTable();
  });

  const pedidos = await getPedidos(currentPage);

  tableBody.innerHTML = "";

  for (const pedido of pedidos) {
    const row = document.createElement('tr');

    const col1 = document.createElement('td');
    col1.textContent = pedido.id;
    col1.classList.add('center-align');
    row.appendChild(col1);

    const col2 = document.createElement('td');
    col2.textContent = pedido.status;
    col2.classList.add('center-align');
    row.appendChild(col2);

    const col3 = document.createElement('td');
    col3.classList.add('center-align');
    const clienteLink = document.createElement('a');
    clienteLink.textContent = `${pedido.cliente_id} - Nome do Cliente não encontrado`; // Valor padrão

    fetch(`http://localhost:3333/cliente/${pedido.cliente_id}`,{
      headers: addTokenToHeaders({}),
    })
      .then(response => response.json())
      .then(data => {
        const nomeCliente = data.nome;
        clienteLink.textContent = `${pedido.cliente_id} - ${nomeCliente}`;
      })
      .catch(error => {
        console.error('Erro ao obter o nome do cliente:', error);
      });

    clienteLink.href = '#';
    clienteLink.addEventListener('click', () => {
      abrirModalOutraPagina(pedido.cliente_id);
    });
    col3.appendChild(clienteLink);
    row.appendChild(col3);

    const col4 = document.createElement('td');
    const produtoLink = document.createElement('a');

    fetch(`http://localhost:3333/produto/${pedido.produto_id}`,{
      headers: addTokenToHeaders({}),
    })
      .then(response => response.json())
      .then(data => {
        const tituloProduto = data.titulo;
        col4.textContent = `${pedido.produto_id} - ${tituloProduto}`;
      })
      .catch(error => {
        console.error('Erro ao obter o título do produto:', error);
      });

    col4.classList.add('center-align');
    row.appendChild(col4);

    // ------------ data-hora -------------------

    const coldata = document.createElement('td');
    const createdAtFormatted = formatarData(pedido.createdAt);
    coldata.textContent = createdAtFormatted;
    coldata.classList.add('center-align');
    row.appendChild(coldata);

    const actionsCell = document.createElement('td');
    actionsCell.classList.add('center-align');

    // Criando botão de editar
    const editLink = document.createElement('a');
    editLink.href = `#`;
    editLink.addEventListener('click', () => {
      buscarPedidoPorIdM2(pedido.id);
      abrirModalEditar(pedido.id);
    });

    const editIcon = document.createElement('i');
    editIcon.classList.add('material-icons');
    editIcon.textContent = 'edit';
    editLink.appendChild(editIcon);
    actionsCell.appendChild(editLink);

    // Criando botão de excluir
    const deleteLink = document.createElement('a');
    deleteLink.href = `#`;
    deleteLink.addEventListener('click', () => {
      buscarPedidoPorIdM3(pedido.id);
      abrirModalExcluir(pedido.id);
    });
    const deleteIcon = document.createElement('i');
    deleteIcon.classList.add('material-icons');
    deleteIcon.textContent = 'delete';
    deleteLink.appendChild(deleteIcon);
    actionsCell.appendChild(deleteLink);

    row.appendChild(actionsCell);
    tableBody.appendChild(row);
  }

  previousButton.disabled = currentPage === 1;
  nextButton.disabled = pedidos.length < itemsPerPage;
};


 // Função para avançar para a próxima página
 nextButton.addEventListener("click", () => {
  currentPage++;
  updateTable();
});

// Função para voltar para a página anterior
previousButton.addEventListener("click", () => {
  currentPage--;
  updateTable();
});

  function formatarData(data) {
    const dataObj = new Date(data);
  
    const hora = formatarNumero(dataObj.getHours());
    const minuto = formatarNumero(dataObj.getMinutes());
    const segundo = formatarNumero(dataObj.getSeconds());
    const dia = formatarNumero(dataObj.getDate());
    const mes = formatarNumero(dataObj.getMonth() + 1); // Mês começa em 0
    const ano = dataObj.getFullYear();
  
    return `${hora}:${minuto}:${segundo}, ${dia}/${mes}/${ano}`;
  }
  
  function formatarNumero(numero) {
    return numero.toString().padStart(2, '0');
  }

  function abrirModalOutraPagina(clienteId) {
    // Construir a URL com os parâmetros do pedido
    const url = `/frontend/Cadastrar_Cliente/index.html?clienteId=${clienteId}`;
    // Abrir a nova página
    window.open(url, '_blank');
  }
  
//Buscar por (editar)
async function buscarPedidoPorIdM2(id) {
    try {
      const response = await fetch(`http://localhost:3333/pedido/${id}`,{
        headers: addTokenToHeaders({}),
      });
      const data = await response.json();
      document.getElementById('pedidoId2').value = data.id;
      document.getElementById('status2').value = data.status;
      popularInputsModal(data.cliente_id, data.produto_id);
      
    } catch (error) {
      console.log(error);
    }
  }
  
//Atualizar abrir modal editar 
function abrirModalEditar(clienteId) {
const modal = document.querySelector('#modal2');
const instance = M.Modal.init(modal);
instance.open();

}
  

//buscar um produto por ID (excluir) ok
async function buscarPedidoPorIdM3(id) {
try {
    const response = await fetch(`http://localhost:3333/pedido/${id}`,{
      headers: addTokenToHeaders({}),
    });
    const data = await response.json();
    //document.getElementById('produtoId3').value = data.id;
    document.getElementById('status3').value = data.status;
    document.getElementById('pedidoId3').value = data.id;
    popularInputsModal(data.cliente_id, data.produto_id);
    
    console.log(data.id);
    
} catch (error) {
    console.log(error);
}
}

//abrir o modal excluir 
function abrirModalExcluir(clienteId) {
    const modal = document.querySelector('#modal3');
    const instance = M.Modal.init(modal);
    instance.open();
  }

//Atualizar
const form2 = document.getElementById('editForm');
form2.addEventListener('submit', async function (event) {
event.preventDefault();
const id = document.getElementById('pedidoId2').value;
const status2 = document.getElementById('status2').value;
const data2 = {
    status: status2,
    clienteId: clienteId2,
    produtoId: produtoId2
  };

try {
    const response = await fetch(`http://localhost:3333/pedido/${id}`, {
        method: 'PUT',
        headers: addTokenToHeaders({}),
        body: JSON.stringify(data2)
    });
    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Pedido alterado!',
        text: 'O pedido foi atualizado com sucesso.',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.href = '/frontend/Pedidos_Compra/index.html';
      });
    } else {
        console.error('Erro ao atualizar o Pedido');
    }
    } catch (error) {
    console.error('Erro na requisição:', error);
    }
});

deleteForm.addEventListener('submit', async function (event) {
    event.preventDefault();
    const id = document.getElementById('pedidoId3').value;
    try {
      const response = await fetch(`http://localhost:3333/pedido/${id}`, {
         method: 'DELETE' ,
         headers: addTokenToHeaders({})
        });
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Pedido Excluido!',
          text: 'O pedido foi deletado com sucesso.',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.href = '/frontend/Pedidos_Compra/index.html';
        });
        
      } else {
        console.error('Erro ao excluir o produto');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  });

function obterNomeCliente(clienteId) {
return fetch(`http://localhost:3333/cliente/${clienteId}`,{
  headers: addTokenToHeaders({}),
})
    .then((response) => response.json())
    .then((data) => data.nome)
    .catch((error) => console.error('Erro ao obter o nome do cliente:', error));
}

function obterTituloProduto(produtoId) {
return fetch(`http://localhost:3333/produto/${produtoId}`,{
  headers: addTokenToHeaders({}),
})
    .then((response) => response.json())
    .then((data) => data.titulo)
    .catch((error) => console.error('Erro ao obter o nome do produto:', error));
}
  
// Função para popular os inputs com os valores obtidos
function popularInputs(nomeCliente, tituloProduto) {
    document.getElementById('nome2').value = nomeCliente;
    document.getElementById('pedido2').value = tituloProduto;
    document.getElementById('nome2').disabled = true;
    document.getElementById('pedido2').disabled = true;

    document.getElementById('nome3').value = nomeCliente;
    document.getElementById('pedido3').value = tituloProduto;
    document.getElementById('nome3').disabled = true;
    document.getElementById('pedido3').disabled = true;
    document.getElementById('status3').disabled = true;
}

// Função para buscar e popular os valores dos inputs
async function popularInputsModal(clienteId, produtoId) {
    try {
        const nomeCliente = await obterNomeCliente(clienteId);
        const tituloProduto = await obterTituloProduto(produtoId); 
        popularInputs(nomeCliente, tituloProduto);
    } catch (error) {
        console.error('Erro ao popular os inputs:', error);
    }
}

// Chamada da função para obter e popular os dados dos pedidos ao carregar a página
//window.addEventListener('load', obterDadosPedidos);
  // post e pegar itens da api pra popular as opçoes
  // Função para fazer a requisição à API e preencher as opções do select
function preencherOpcoesSelect(url, selectId, optionValueKey, optionTextKey, customHeaders = {}) {
  const headers = addTokenToHeaders(customHeaders);
    fetch(url,{headers})
        .then(response => response.json())
        .then(data => {
            const select = document.getElementById(selectId);
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item[optionValueKey];
                option.text = item[optionTextKey];
                select.appendChild(option);
            });
        })
        .catch(error => console.log(error));
}

// Chamada para preencher as opções do select de clientes
preencherOpcoesSelect('http://localhost:3333/clientes', 'cliente', 'id', 'nome');
// Chamada para preencher as opções do select de produtos
preencherOpcoesSelect('http://localhost:3333/produtos', 'produto', 'id', 'titulo');

//Criar
const form = document.getElementById('cadastroForm');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const status = document.getElementById('status').value;
    const clientSelect = document.getElementById('cliente');
    const clienteId = clientSelect.options[clientSelect.selectedIndex].value;
    const produtoSelect = document.getElementById('produto');
    const produtoId = produtoSelect.options[produtoSelect.selectedIndex].value;
    const data = {
      status: status,
      clienteId: clienteId,
      produtoId: produtoId
    };
    fetch('http://localhost:3333/pedido', {
        method: 'POST',
        headers: addTokenToHeaders({}),
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      Swal.fire({
        icon: 'success',
        title: 'Pedido Criado',
        text: 'O pedido foi criado com sucesso.',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.href = '/frontend/Pedidos_Compra/index.html';
      });
        
    })
    .catch(error => {
        console.log('Erro ao criar o Pedido:', error);
    });
});


//Filtro ordena tudo por string
function filtrarClientes() {
  const filtroInput = document.getElementById('filtro');
  const filtroValor = filtroInput.value.toLowerCase();
  const linhasClientes = Array.from(document.querySelectorAll('#pedidos-table-body tr'));
  linhasClientes.forEach(function (linha) {
    const pedido = linha.querySelector('td:nth-child(1)').textContent.toLowerCase();
    const status = linha.querySelector('td:nth-child(2)').textContent.toLowerCase();
    const nome = linha.querySelector('td:nth-child(3)').textContent.toLowerCase();
    const produto = linha.querySelector('td:nth-child(4)').textContent.toLowerCase();
    const data = linha.querySelector('td:nth-child(5)').textContent.toLowerCase();
    
    if (pedido.includes(filtroValor) || status.includes(filtroValor) || nome.includes(filtroValor)||produto.includes(filtroValor)||data.includes(filtroValor)) {
      linha.style.display = 'table-row';
    } else {
      linha.style.display = 'none';
    }
  });
}
// Adicionar evento de clique ao botão de filtrar
const btnFiltrar = document.getElementById('btnFiltrar');
btnFiltrar.addEventListener('click', filtrarClientes);

// Adicionar evento de pressionar Enter ao campo de filtro
const filtroInput = document.getElementById('filtro');
filtroInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    filtrarClientes();
    event.preventDefault();
  }
});
updateTable();

//Cancelar o modal
const btnNao = document.getElementById('btnNao');
btnNao.addEventListener('click', function(event) {
event.preventDefault();
});

// Função para exibir o tempo restante
function exibirTempoRestante(tempoRestante) {
  const minutosRestantes = Math.floor(tempoRestante / 60);
  const segundosRestantes = tempoRestante % 60;
  const elementoTempoRestante = document.getElementById("tempo-restante");
  elementoTempoRestante.innerText = `${minutosRestantes} minutos : ${segundosRestantes} segundos`;
}

// Função para calcular o tempo restante com base na data de expiração do token
function calcularTempoRestante() {
  const token = localStorage.getItem('token');
  if (token) {
    // Calcular o tempo restante com base na data de expiração do token
    const tokenData = token.split('.')[1];
    const decodedTokenData = JSON.parse(atob(tokenData));
    const expTime = decodedTokenData.exp * 1000;
    const tempoRestante = Math.floor((expTime - Date.now()) / 1000);
    exibirTempoRestante(tempoRestante);

    // Verificar se o tempo restante é menor ou igual a zero
    if (tempoRestante <= 0) {
      localStorage.removeItem('token');
      Swal.fire({
        title: 'Ops....',
        text: 'O seu token expirou! Refaça o login.',
        icon: 'warning',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Ok',
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          // Remover o token do armazenamento local
          localStorage.removeItem('token');
          window.location.href = '/frontend/index.html';
        }
      });
      Swal.getPopup().addEventListener('mouseleave', () => {
        window.location.href = '/frontend/index.html';
      });
    }
  }
}
  // Chamar a função para calcular o tempo restante
  calcularTempoRestante();

  // Atualizar o tempo restante a cada segundo
  setInterval(calcularTempoRestante, 1000);

});