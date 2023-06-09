const elemsModal = document.querySelectorAll(".modal");
const instancesModal = M.Modal.init(elemsModal, {});

//nav lateral
document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.sidenav');
  var instances = M.Sidenav.init(elems);
});

document.addEventListener("DOMContentLoaded", function () {

//token de validação de Admin
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


//abrir o modal vindo de outra url #detalhes clientes
const urlParams = new URLSearchParams(window.location.search);
const clienteId = urlParams.get('clienteId');

if (clienteId) {
  buscarClientePorIdM2(clienteId);
  abrirModalEditar(clienteId);
}
  
  const tableBody = document.getElementById("clientes-table-body");
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  let itemsPerPage = document.getElementById("itemsporpagina").value;
  
  let currentPage = 1;
  
//checkbox
// Função para manipular o evento de clique em um checkbox
const handleCheckboxClick = (checkboxId) => {
  const checkboxes = ['ordenar-checkbox', 'ordenar-checkbox2', 'ordenar-checkbox3'];

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

  // Função para obter os dados dos clientes da API ------------
  const getClientes = async (page) => {
    const response = await fetch(`http://localhost:3333/clientes?page=${page}`, {
      headers: addTokenToHeaders({})
    });
    const data = await response.json();
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    // Verifica se o checkbox está marcado
    const ordenarCheckbox = document.getElementById('ordenar-checkbox');
    if (ordenarCheckbox.checked) {
      // Ordena os clientes por ordem alfabética pelo nome
      data.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    const ordenarCheckbox2 = document.getElementById('ordenar-checkbox2');
    if (ordenarCheckbox2.checked) {
      // Ordena os clientes por ordem alfabética pelo cpf
      data.sort((a, b) => a.cpf.localeCompare(b.cpf));
    }
    
    const ordenarCheckbox3 = document.getElementById('ordenar-checkbox3');
    if (ordenarCheckbox3.checked) {
      // Ordena os clientes por ordem alfabética pelo email
      data.sort((a, b) => a.email.localeCompare(b.email));
    }
    return data.slice(startIndex, endIndex);
  };

  const updateTable = async () => {
    //mudando os itens por pagina
    let inputElement = document.getElementById("itemsporpagina");
    inputElement.addEventListener("input", function() {
      //let inputValue = inputElement.value;
      itemsPerPage = document.getElementById("itemsporpagina").value;
      updateTable();
    });

    const clientes = await getClientes(currentPage);
    tableBody.innerHTML = "";
  
    clientes.forEach((cliente) => {
      const row = document.createElement("tr");
      const nomeCell = document.createElement("td");
      nomeCell.textContent = cliente.nome;
      nomeCell.classList.add('center-align');
      row.appendChild(nomeCell);
      const cpfCell = document.createElement("td");
      cpfCell.textContent = cliente.cpf;
      cpfCell.classList.add('center-align');
      row.appendChild(cpfCell);
      const emailCell = document.createElement("td");
      emailCell.textContent = cliente.email;
      emailCell.classList.add('center-align');
      row.appendChild(emailCell);
      const actionsCell = document.createElement("td");
      actionsCell.classList.add('center-align');

     
      // Criando botao de editar
      const editLink = document.createElement("a");
      editLink.href = `#`;
      editLink.addEventListener("click", () => {
        buscarClientePorIdM2(cliente.id);
        abrirModalEditar(cliente.id);
      });
      const editIcon = document.createElement("i");
      editIcon.classList.add("material-icons");
      editIcon.textContent = "edit";
      editLink.appendChild(editIcon);
      const textNode = document.createTextNode("");
      editLink.appendChild(textNode);
      actionsCell.appendChild(editLink);
      //--Criando botao de excluir
      const deleteLink = document.createElement("a");
      deleteLink.href = `#`;
      deleteLink.addEventListener("click", () => {
        buscarClientePorIdM3(cliente.id);
        abrirModalExcluir(cliente.id);
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
    nextButton.disabled = clientes.length < itemsPerPage;
  };

  async function buscarClientePorIdM2(id) {
    try {
      const response = await fetch(`http://localhost:3333/cliente/${id}`,{
        headers: addTokenToHeaders({})
      });
      const data = await response.json();
      document.getElementById('nome2').value = data.nome;
      document.getElementById('cpf2').value = data.cpf;
      document.getElementById('email2').value = data.email;
      document.getElementById('clienteId').value = id;

    } catch (error) {
      console.log(error);
    }
  }
  async function buscarClientePorIdM3(id) {
    try {
      const response = await fetch(`http://localhost:3333/cliente/${id}`,{
        headers: addTokenToHeaders({})
      });
      const data = await response.json();
      document.getElementById('nome3').value = data.nome;
      document.getElementById('cpf3').value = data.cpf;
      document.getElementById('email3').value = data.email;
      document.getElementById('clienteId3').value = id;
    } catch (error) {
      console.log(error);
    }
  }

  //Criar
  const form = document.getElementById('cadastroForm');
  form.addEventListener('submit', async function (event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const cpf = document.getElementById('cpf').value;
    const email = document.getElementById('email').value;

    const data = {
      nome: nome,
      cpf: cpf,
      email: email
    };

    try {
      const response = await fetch('http://localhost:3333/cliente', {
        method: 'POST',
        headers: addTokenToHeaders({}),
        body: JSON.stringify(data)
      });
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Cliente Cadastrado!',
          text: 'O Cliente foi criado com sucesso.',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.href = '/frontend/Cadastrar_Cliente/index.html';
        });
      } else {
        console.error('Erro ao cadastrar o cliente');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  });

  //Atualizar
  const form2 = document.getElementById('cadastroForm2');
  form2.addEventListener('submit', async function (event) {
    event.preventDefault();

    const id = document.getElementById('clienteId').value;
    const nome2 = document.getElementById('nome2').value;
    const cpf2 = document.getElementById('cpf2').value;
    const email2 = document.getElementById('email2').value;

    const data2 = {
      nome: nome2,
      cpf: cpf2,
      email: email2
    };

    try {
      const response = await fetch(`http://localhost:3333/cliente/${id}`, {
        method: 'PUT',
        headers: addTokenToHeaders({}),
        body: JSON.stringify(data2)
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Cliente Editado!',
          text: 'O Cliente foi editado com sucesso.',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          window.location.href = '/frontend/Cadastrar_Cliente/index.html';
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
    const inputElement2 = document.getElementById('nome3');
    const inputElement3 = document.getElementById('cpf3')
    const inputElement4 = document.getElementById('email3')
    inputElement2.disabled = true;
    inputElement3.disabled = true;
    inputElement4.disabled = true;
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
  const id = document.getElementById('clienteId3').value;
  try {
    const response = await fetch(`http://localhost:3333/cliente/${id}`, { 
      headers: addTokenToHeaders({}),
      method: 'DELETE' 
    });
    if (response.ok) {
      Swal.fire({
        icon: 'success',
        title: 'Cliente Deletado!',
        text: 'O Cliente foi excluido com sucesso.',
        showConfirmButton: false,
        timer: 1500
      }).then(() => {
        window.location.href = '/frontend/Cadastrar_Cliente/index.html';
      });
    } else {
      console.error('Erro ao excluir o cliente');
    }
  } catch (error) {
    console.error('Erro na requisição:', error);
  }
});
  
// Event listener para o botão "Anterior"
previousButton.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updateTable();
  }
});

// Event listener para o botão "Próximo"
nextButton.addEventListener("click", () => {
  currentPage++;
  updateTable();
});

// Inicializar a tabela com os dados da primeira página
updateTable();

//Filtro
function filtrarClientes() {
  const filtroInput = document.getElementById('filtro');
  const filtroValor = filtroInput.value.toLowerCase();
  const linhasClientes = Array.from(document.querySelectorAll('#clientes-table-body tr'));

  linhasClientes.forEach(function (linha) {
    const nome = linha.querySelector('td:nth-child(1)').textContent.toLowerCase();
    const cpf = linha.querySelector('td:nth-child(2)').textContent.toLowerCase();
    const email = linha.querySelector('td:nth-child(3)').textContent.toLowerCase();

    if (nome.includes(filtroValor) || cpf.includes(filtroValor) || email.includes(filtroValor)) {
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
// Fim do filtro

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

