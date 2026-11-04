const ESTOQUE_BAIXO = 10;

const STATUS = {
  'Em Aberto': { classe: 'aberto', icone: 'schedule' },
  Pago: { classe: 'pago', icone: 'check_circle' },
  Cancelado: { classe: 'cancelado', icone: 'cancel' }
};

const Formatar = {
  moeda: valor => Number(valor || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
  numero: valor => Number(valor || 0).toLocaleString('pt-BR'),
  cpf: cpf => (cpf ? Mascara.cpf(cpf) : '-'),
  data: data => (data ? new Date(`${String(data).slice(0, 10)}T00:00:00`).toLocaleDateString('pt-BR') : '-'),
  dataHora: data => (data ? new Date(data).toLocaleString('pt-BR', { dateStyle: 'short', timeStyle: 'short' }) : '-'),
  desconto: ({ tipo_desconto, desconto }) => ({
    PERCENTUAL: `${Number(desconto)}%`,
    VALOR: Formatar.moeda(desconto)
  })[tipo_desconto] ?? '-'
};

// Máscaras aplicadas a campos com data-mascara="nome".
const Mascara = {
  cpf: valor => String(valor).replace(/\D/g, '').slice(0, 11)
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
};

// Criação de elementos sem innerHTML com dados do usuário (evita XSS).
const Dom = {
  criar(tag, propriedades = {}, ...filhos) {
    const elemento = Object.assign(document.createElement(tag), propriedades);
    elemento.append(...filhos.flat().filter(filho => filho != null && filho !== false));
    return elemento;
  },

  icone: (nome, classe = '') => Dom.criar('span', { className: `material-icons ${classe}`, textContent: nome, ariaHidden: 'true' }),

  botao(icone, texto, aoClicar, classe = '') {
    const botao = Dom.criar('button', { type: 'button', className: `botao ${classe}` }, Dom.icone(icone), texto);
    botao.addEventListener('click', aoClicar);
    return botao;
  },

  botaoIcone(icone, rotulo, aoClicar, classe = '') {
    const botao = Dom.criar('button', { type: 'button', className: `botao-icone ${classe}`, title: rotulo, ariaLabel: rotulo }, Dom.icone(icone));
    botao.addEventListener('click', aoClicar);
    return botao;
  },

  linkIcone: (icone, rotulo, href) => Dom.criar('a', { className: 'botao-icone', href, title: rotulo, ariaLabel: rotulo }, Dom.icone(icone)),

  link: (texto, href) => Dom.criar('a', { href, textContent: texto }),

  avatar(nome, classe = '') {
    const iniciais = String(nome || '?').trim().split(/\s+/).map(parte => parte[0]).filter(Boolean);
    return Dom.criar('span', { className: `avatar ${classe}`, ariaHidden: 'true', textContent: (iniciais[0] + (iniciais.at(-1) ?? '')).toUpperCase().slice(0, 2) });
  },

  comAvatar: (nome, conteudo = nome) => Dom.criar('span', { className: 'com-avatar' }, Dom.avatar(nome), conteudo),

  status: status => Dom.criar('span', { className: `status status-${STATUS[status]?.classe}`, textContent: status }),

  // [['Rótulo', valor], ...] → <dl>
  dados: pares => Dom.criar('dl', { className: 'dados' },
    pares.flatMap(([rotulo, valor]) => [Dom.criar('dt', { textContent: rotulo }), Dom.criar('dd', {}, valor ?? '-')])),

  secao: (titulo, ...conteudo) => Dom.criar('section', { className: 'secao' }, Dom.criar('h4', { textContent: titulo }), ...conteudo),

  lista: (itens, vazio) => (itens.length
    ? Dom.criar('ul', { className: 'lista' }, itens.map(item => Dom.criar('li', {}, item)))
    : Dom.criar('p', { className: 'lista-vazia', textContent: vazio })),

  // Conteúdo de um item de lista de pedidos (detalhe do cliente).
  itemPedido: pedido => [
    Dom.criar('span', { className: 'principal' },
      Dom.link(`Pedido ${pedido.codigo_pedido}`, `/pages/pedidos.html?id=${pedido.id}`),
      Dom.criar('small', { textContent: Formatar.data(pedido.data_pedido) })),
    Dom.status(pedido.status),
    Dom.criar('span', { className: 'valor', textContent: Formatar.moeda(pedido.total) })
  ],

  estoque(estoque) {
    if (estoque === 0) return Dom.criar('span', { className: 'etiqueta etiqueta-perigo', textContent: 'Sem estoque' });
    if (estoque <= ESTOQUE_BAIXO) return Dom.criar('span', { className: 'etiqueta etiqueta-aviso', textContent: `${estoque} · baixo` });
    return Formatar.numero(estoque);
  },

  escapar: texto => String(texto).replace(/[&<>"']/g, caractere => `&#${caractere.charCodeAt(0)};`)
};
