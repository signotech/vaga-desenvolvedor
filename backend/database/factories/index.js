const { faker } = require('@faker-js/faker/locale/pt_BR');
const { gerarCpf } = require('../../utils/cpf');
const { STATUS_PEDIDO, TIPOS_DESCONTO } = require('../../constants');

const semAcentos = texto => texto.normalize('NFD').replace(/[^\w]/g, '').toLowerCase();
const DIA = 24 * 60 * 60 * 1000;

// Catálogo base para os produtos terem nomes e preços realistas.
const CATALOGO = [
  { titulo: 'Notebook 15,6" Intel Core i5 16GB', sku: 'NTB', preco: [3200, 4500] },
  { titulo: 'Monitor 24" Full HD IPS', sku: 'MON', preco: [700, 1100] },
  { titulo: 'Mouse sem fio 1600 DPI', sku: 'MOU', preco: [59, 129] },
  { titulo: 'Teclado mecânico ABNT2', sku: 'TEC', preco: [199, 399] },
  { titulo: 'Headset USB com microfone', sku: 'HDS', preco: [149, 299] },
  { titulo: 'Webcam Full HD 1080p', sku: 'WEB', preco: [179, 349] },
  { titulo: 'SSD NVMe 1TB', sku: 'SSD', preco: [349, 599] },
  { titulo: 'Hub USB-C 7 em 1', sku: 'HUB', preco: [129, 249] },
  { titulo: 'Cadeira de escritório ergonômica', sku: 'CAD', preco: [899, 1600] },
  { titulo: 'Suporte articulado para monitor', sku: 'SUP', preco: [159, 289] }
];

function clientes(quantidade) {
  const pares = faker.helpers.uniqueArray(() => `${faker.person.firstName()}|${faker.person.lastName()}`, quantidade);
  return pares.map(par => {
    const [nome, sobrenome] = par.split('|');
    return {
      nome: `${nome} ${sobrenome}`,
      cpf: gerarCpf(faker.string.numeric(9)),
      email: `${semAcentos(nome)}.${semAcentos(sobrenome)}@exemplo.com`
    };
  });
}

function produtos(quantidade) {
  return faker.helpers.arrayElements(CATALOGO, quantidade).map(({ titulo, sku, preco: [min, max] }) => ({
    titulo,
    sku: `${sku}-${faker.string.numeric(4)}`,
    preco: faker.number.int({ min, max }) + 0.9,
    estoque: faker.number.int({ min: 15, max: 120 })
  }));
}

// Pedidos com datas crescentes nos últimos dois meses e uma mistura de status e descontos.
function pedidos(quantidade, { clientes, produtos }) {
  const status = [STATUS_PEDIDO.PAGO, STATUS_PEDIDO.PAGO, STATUS_PEDIDO.CANCELADO, STATUS_PEDIDO.ABERTO, STATUS_PEDIDO.ABERTO];

  return Array.from({ length: quantidade }, (_, indice) => {
    const itens = faker.helpers.arrayElements(produtos, { min: 1, max: 3 }).map(produto => ({
      produto_id: produto.id,
      quantidade: faker.number.int({ min: 1, max: 3 }),
      preco_unitario: Number(produto.preco)
    }));
    const tipo_desconto = [TIPOS_DESCONTO.NENHUM, TIPOS_DESCONTO.PERCENTUAL, TIPOS_DESCONTO.NENHUM, TIPOS_DESCONTO.VALOR][indice % 4];
    const diasAtras = (quantidade - indice) * 10 + faker.number.int(5);

    return {
      codigo_pedido: 1001 + indice,
      cliente_id: clientes[indice % clientes.length].id,
      data_pedido: new Date(Date.now() - diasAtras * DIA).toISOString().slice(0, 10),
      status: status[indice % status.length],
      tipo_desconto,
      desconto: { NENHUM: 0, PERCENTUAL: 10, VALOR: 50 }[tipo_desconto],
      itens
    };
  });
}

module.exports = { clientes, produtos, pedidos };
