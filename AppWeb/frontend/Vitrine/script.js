const elemsModal = document.querySelectorAll(".modal");
const instancesModal = M.Modal.init(elemsModal, {});

document.addEventListener('DOMContentLoaded', function () {
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

  // Função para popular os cards com os dados da API
  function popularCards() {
    fetch('http://localhost:3333/produtos', {
      headers: addTokenToHeaders({})
    })
      .then(response => response.json())
      .then(data => {
        const cardContainer = document.getElementById('card-container');

        // Limpar o conteúdo existente
        cardContainer.innerHTML = '';

        // Percorrer os dados da API e criar os cards
        data.forEach(produto => {
          const cardCol = document.createElement('div');
          cardCol.className = 'col s12 m6 l3';

          const card = document.createElement('div');
          card.className = 'card card-custom';

          const cardContent = document.createElement('div');
          cardContent.className = 'card-content';

          const cardTitle = document.createElement('span');
          cardTitle.className = 'card-title activator grey-text text-darken-4 center-align';
          cardTitle.innerHTML = `${produto.titulo}<i class="material-icons right">more_vert</i>`;

          const cardPrice = document.createElement('p');
          cardPrice.innerHTML = `R$ ${produto.preco}`;

          const cardLink = document.createElement('p');
          const cardLinkAnchor = document.createElement('a');
          cardLinkAnchor.href = '/frontend/Pedidos_Compra/index.html';
          cardLinkAnchor.innerHTML = 'Comprar';
          cardLink.appendChild(cardLinkAnchor);

          cardContent.appendChild(cardTitle);
          cardContent.appendChild(cardPrice);
          cardContent.appendChild(cardLink);

          const cardReveal = document.createElement('div');
          cardReveal.className = 'card-reveal';

          const cardRevealTitle = document.createElement('span');
          cardRevealTitle.className = 'card-title grey-text text-darken-4';
          cardRevealTitle.innerHTML = `${produto.titulo}<i class="material-icons right">close</i>`;

          const cardRevealDescription = document.createElement('p');
          cardRevealDescription.innerHTML = `Código do Produto: ${produto.sku}`;

          const cardRevealStock = document.createElement('p');
          cardRevealStock.innerHTML = `Estoque: ${produto.estoque}`;

          cardReveal.appendChild(cardRevealTitle);
          cardReveal.appendChild(cardRevealDescription);
          cardReveal.appendChild(cardRevealStock);

          card.appendChild(cardContent);
          card.appendChild(cardReveal);

          cardCol.appendChild(card);

          cardContainer.appendChild(cardCol);
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

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
  // Chamar a função para popular os cards ao carregar a página
  popularCards();

  // Chamar a função para calcular o tempo restante
  calcularTempoRestante();

  // Atualizar o tempo restante a cada segundo
  setInterval(calcularTempoRestante, 1000);
});
