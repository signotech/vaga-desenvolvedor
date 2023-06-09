const elemsModal = document.querySelectorAll(".modal");
const instancesModal = M.Modal.init(elemsModal, {});
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


    const tableBody = document.getElementById("produtos-table-body");
    const previousButton = document.getElementById("previous");
    const nextButton = document.getElementById("next");
    let itemsPerPage = document.getElementById("itemsporpagina").value;

    let currentPage = 1;

//checkbox
// Função para manipular o evento de clique em um checkbox
const handleCheckboxClick = (checkboxId) => {
  const checkboxes = ['ordenar-checkbox', 'ordenar-checkbox2', 'ordenar-checkbox3','ordenar-checkbox4'];

  // Percorre todos os checkboxes
  checkboxes.forEach((checkbox) => {
    // Verifica se o checkbox não é o atualmente clicado
    if (checkbox !== checkboxId) {
      // Desmarca o checkbox
      const otherCheckbox = document.getElementById(checkbox);
      otherCheckbox.checked = false;
    }
  });
  // Atualiza a tabela
  updateTable();
};

//checkbox
const ordenarCheckbox = document.getElementById('ordenar-checkbox');
ordenarCheckbox.addEventListener('click', () => {
  handleCheckboxClick('ordenar-checkbox');
});

//checkbox2
const ordenarCheckbox2 = document.getElementById('ordenar-checkbox2');
ordenarCheckbox2.addEventListener('click', () => {
  handleCheckboxClick('ordenar-checkbox2');
});

//checkbox3
const ordenarCheckbox3 = document.getElementById('ordenar-checkbox3');
ordenarCheckbox3.addEventListener('click', () => {
  handleCheckboxClick('ordenar-checkbox3');
});

//checkbox4
const ordenarCheckbox4 = document.getElementById('ordenar-checkbox4');
ordenarCheckbox4.addEventListener('click', () => {
  handleCheckboxClick('ordenar-checkbox4');
});
  


// Função para obter os dados dos produtos da API
    const getProdutos = async (page) => {
    const response = await fetch(`http://localhost:3333/produtos`,{
      headers: addTokenToHeaders({})
    });
    const data = await response.json();
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    const ordenarCheckbox = document.getElementById('ordenar-checkbox');
    if (ordenarCheckbox.checked) {
      // Ordena os clientes por ordem alfabética pelo sku, é do tipo str nao int.
      data.sort((a, b) => a.sku.localeCompare(b.sku));
    }

    const ordenarCheckbox2 = document.getElementById('ordenar-checkbox2');
    if (ordenarCheckbox2.checked) {
      // Ordena os clientes por ordem alfabética pelo titulo
      data.sort((a, b) => a.titulo.localeCompare(b.titulo));
    }
    
    const ordenarCheckbox3 = document.getElementById('ordenar-checkbox3');
    if (ordenarCheckbox3.checked) {
      // Ordena os clientes por ordem alfabética pelo preco
      data.sort((a, b) => parseFloat(a.preco) - parseFloat(b.preco));
    }

    const ordenarCheckbox4 = document.getElementById('ordenar-checkbox4');
    if (ordenarCheckbox4.checked) {
      // Ordena os produtos por estoque (convertendo para números)
      data.sort((a, b) => parseFloat(a.estoque) - parseFloat(b.estoque));
    }
   
    return data.slice(startIndex, endIndex);
};
  
const updateTable = async () => {
    // Mudando os itens por página
    let inputElement = document.getElementById("itemsporpagina");
    inputElement.addEventListener("input", function () {
    itemsPerPage = document.getElementById("itemsporpagina").value;
    updateTable();
    
    });

    const produtos = await getProdutos(currentPage);

    tableBody.innerHTML = "";

    produtos.forEach((produto) => {
    const row = document.createElement("tr");
    const skuCell = document.createElement("td");
    skuCell.textContent = produto.sku;
    skuCell.classList.add('center-align');

    row.appendChild(skuCell);
    const tituloCell = document.createElement("td");
    tituloCell.textContent = produto.titulo;
    skuCell.classList.add('center-align');
    row.appendChild(tituloCell);

    const precoCell = document.createElement("td");
    precoCell.textContent = produto.preco;
    precoCell.classList.add('center-align');
    row.appendChild(precoCell);

    const estoqueCell = document.createElement("td");
    estoqueCell.textContent = produto.estoque;
    estoqueCell.classList.add('center-align');
    row.appendChild(estoqueCell);

    const actionsCell = document.createElement("td");
    actionsCell.classList.add('center-align');

    // Criando botão de editar
    const editLink = document.createElement("a");
    editLink.href = `#`;
    editLink.addEventListener("click", () => {
        buscarProdutoPorIdM2(produto.id);
        abrirModalEditar(produto.id);
    });
    const editIcon = document.createElement("i");
    editIcon.classList.add("material-icons");
    editIcon.textContent = "edit";
    editLink.appendChild(editIcon);
    const textNode = document.createTextNode("");
    editLink.appendChild(textNode);
    actionsCell.appendChild(editLink);

    // Criando botão de excluir
    const deleteLink = document.createElement("a");
    deleteLink.href = `#`;
    deleteLink.addEventListener("click", () => {
        buscarProdutoPorIdM3(produto.id);
        abrirModalExcluir(produto.id);
    });
    const deleteIcon = document.createElement("i");
    deleteIcon.classList.add("material-icons");
    deleteIcon.textContent = "delete";
    deleteLink.appendChild(deleteIcon);
    const textNode2 = document.createTextNode("");
    deleteLink.appendChild(textNode2);
    actionsCell.appendChild(deleteLink);

    row.appendChild(actionsCell);
    tableBody.appendChild(row);
    });

    previousButton.disabled = currentPage === 1;
    nextButton.disabled = produtos.length < itemsPerPage;
};

//Buscar por (editar)
async function buscarProdutoPorIdM2(id) {
    try {
    const response = await fetch(`http://localhost:3333/produto/${id}`,{
      headers: addTokenToHeaders({})
    });
    const data = await response.json();

    document.getElementById('produtoId2').value = data.id;
    document.getElementById('sku2').value = data.sku;
    document.getElementById('titulo2').value = data.titulo;
    
    document.getElementById('preco2').value = data.preco;
    document.getElementById('estoque2').value = data.estoque;

    } catch (error) {
    console.log(error);
    }
}
  //buscar um produto por ID (excluir)
async function buscarProdutoPorIdM3(id) {
  try {
    const response = await fetch(`http://localhost:3333/produto/${id}`,{
      headers: addTokenToHeaders({})
    });
    const data = await response.json();
    document.getElementById('produtoId3').value = data.id;
    document.getElementById('sku3').value = data.sku;
    document.getElementById('titulo3').value = data.titulo;
    document.getElementById('preco3').value= data.preco;
    document.getElementById('estoque3').value = data.estoque;
  } catch (error) {
    console.log(error);
  }
}

//Criar
const form = document.getElementById('cadastroForm');
form.addEventListener('submit', async function (event) {
event.preventDefault();

const sku = document.getElementById('sku').value;
const titulo = document.getElementById('titulo').value;
const preco = document.getElementById('preco').value;
const estoque = document.getElementById('estoque').value;

const data = {
    sku: sku,
    titulo: titulo,
    preco: preco,
    estoque:estoque
};

try {
    const response = await fetch('http://localhost:3333/produto', {
    method: 'POST',
    headers: addTokenToHeaders({}),
    body: JSON.stringify(data)
    });

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Produto Criado',
        text: 'O produto foi criado com sucesso.',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.href = '/frontend/Cadastrar_Produto/index.html';
      });
    
    } else {
    console.error('Erro ao cadastrar o produto');
    }
} catch (error) {
    console.error('Erro na requisição:', error);
}
});

//Atualizar
const form2 = document.getElementById('editForm');
form2.addEventListener('submit', async function (event) {
event.preventDefault();

const id = document.getElementById('produtoId2').value;
const sku2 = document.getElementById('sku2').value;
const titulo2 = document.getElementById('titulo2').value;
const preco2 = document.getElementById('preco2').value;
const estoque2 = document.getElementById('estoque2').value;

const data2 = {
    sku: sku2,
    titulo: titulo2,
    preco: preco2,
    estoque: estoque2
};

try {
    const response = await fetch(`http://localhost:3333/produto/${id}`, {
        method: 'PUT',
        headers: addTokenToHeaders({}),
        body: JSON.stringify(data2)
    });

    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Produto Editado!',
        text: 'O produto foi editado com sucesso.',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.href = '/frontend/Cadastrar_Produto/index.html';
      });
           
    } else {
        console.error('Erro ao atualizar o cliente');
    }
    } catch (error) {
    console.error('Erro na requisição:', error);
    }
});

function abrirModalEditar(clienteId) {
  const modal = document.querySelector('#modal2');
  const instance = M.Modal.init(modal);
  instance.open();
}
  
function abrirModalExcluir(clienteId) {
  const inputElement2 = document.getElementById('sku3');
  const inputElement3 = document.getElementById('titulo3')
  const inputElement4 = document.getElementById('preco3')
  const inputElement5 = document.getElementById('estoque3')
  inputElement2.disabled = true;
  inputElement3.disabled = true;
  inputElement4.disabled = true;
  inputElement5.disabled = true;
  
  const modal = document.querySelector('#modal3');
  const instance = M.Modal.init(modal);
  instance.open();
}

const deleteForm = document.getElementById('deleteForm');

//Cancelar o modal
const btnNao = document.getElementById('btnNao');
btnNao.addEventListener('click', function(event) {
event.preventDefault();
});

// Delete
deleteForm.addEventListener('submit', async function (event) {
    event.preventDefault();
  
    const id = document.getElementById('produtoId3').value;
  
    try {
      const response = await fetch(`http://localhost:3333/produto/${id}`, {
         method: 'DELETE',
         headers: addTokenToHeaders({})
        });
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Produto Excluido!',
          text: 'O produto foi deletado com sucesso.',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.href = '/frontend/Cadastrar_Produto/index.html';
        });
       
      } else {
        console.error('Erro ao excluir o produto');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  });

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
  
// Atualizar a tabela ao carregar a página
updateTable();

function filtrarClientes() {
    const filtroInput = document.getElementById('filtro');
    const filtroValor = filtroInput.value.toLowerCase();
  
    const linhasProdutos= Array.from(document.querySelectorAll('#produtos-table-body tr'));
  
    linhasProdutos.forEach(function (linha) {
      const sku = linha.querySelector('td:nth-child(1)').textContent.toLowerCase();
      const titulo = linha.querySelector('td:nth-child(2)').textContent.toLowerCase();
      const preco = linha.querySelector('td:nth-child(3)').textContent.toLowerCase();
      const estoque = linha.querySelector('td:nth-child(4)').textContent.toLowerCase();
  
      if (sku.includes(filtroValor) || titulo.includes(filtroValor) || preco.includes(filtroValor)||estoque.includes(filtroValor)) {
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
//Fim Filtro

updateTable();

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
  