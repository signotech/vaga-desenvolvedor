const { test, before, after } = require('node:test');
const assert = require('node:assert/strict');
const { execSync } = require('node:child_process');
const { once } = require('node:events');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');

// Banco temporário criado pelas migrations reais + seed do usuário administrador.
const banco = path.join(os.tmpdir(), `pedidos-teste-${process.pid}.sqlite`);
process.env.DB_STORAGE = banco;
execSync('npx sequelize-cli db:migrate', { stdio: 'ignore' });
execSync('npx sequelize-cli db:seed --seed 20261103200000-usuario-admin.js', { stdio: 'ignore' });

const app = require('../backend/app');
const { sequelize } = require('../backend/database/models');

let servidor;
let token;

async function api(metodo, caminho, corpo) {
  const resposta = await fetch(`http://localhost:${servidor.address().port}/api${caminho}`, {
    method: metodo,
    headers: { 'Content-Type': 'application/json', ...(token && { Authorization: `Bearer ${token}` }) },
    body: corpo && JSON.stringify(corpo)
  });
  return { status: resposta.status, corpo: resposta.status === 204 ? null : await resposta.json() };
}

const estoqueDe = async id => (await api('GET', `/produtos/${id}`)).corpo.estoque;

before(async () => {
  servidor = app.listen(0);
  await once(servidor, 'listening');
});

after(async () => {
  servidor.close();
  await sequelize.close();
  fs.rmSync(banco, { force: true });
});

test('exige autenticação e valida credenciais', async () => {
  assert.equal((await api('GET', '/clientes')).status, 401);
  assert.equal((await api('POST', '/auth/login', { email: 'admin@teste.com', senha: 'errada' })).status, 401);

  const { status, corpo } = await api('POST', '/auth/login', { email: 'admin@teste.com', senha: '123456' });
  assert.equal(status, 200);
  token = corpo.token;
});

test('valida e cria clientes, ignorando campos não permitidos', async () => {
  assert.equal((await api('POST', '/clientes', { nome: 'Ana', email: 'ana@x.com', cpf: '12345678900' })).status, 422);

  const criado = await api('POST', '/clientes', { id: 999, nome: 'Ana', email: 'ANA@x.com', cpf: '529.982.247-25' });
  assert.equal(criado.status, 201);
  assert.notEqual(criado.corpo.id, 999);
  assert.equal(criado.corpo.email, 'ana@x.com');
  assert.equal(criado.corpo.cpf, '52998224725');

  const duplicado = await api('POST', '/clientes', { nome: 'Outra', email: 'ana@x.com' });
  assert.equal(duplicado.status, 409);
  assert.equal(duplicado.corpo.mensagem, 'E-mail já cadastrado.');
});

test('filtra, ordena e pagina', async () => {
  for (const [titulo, preco] of [['Caneta azul', 3], ['Caderno', 20], ['Caneta preta', 4]]) {
    await api('POST', '/produtos', { titulo, preco, estoque: 10 });
  }

  const busca = await api('GET', '/produtos?busca=caneta&campo=titulo&ordenarPor=preco&ordem=DESC');
  assert.deepEqual(busca.corpo.dados.map(produto => produto.titulo), ['Caneta preta', 'Caneta azul']);

  const exato = await api('GET', '/produtos?preco=20');
  assert.deepEqual(exato.corpo.dados.map(produto => produto.titulo), ['Caderno']);

  const pagina = await api('GET', '/produtos?limite=2&pagina=2');
  assert.equal(pagina.corpo.totalPaginas, 2);
  assert.equal(pagina.corpo.dados.length, 1);
});

test('controla estoque e totais de pedidos', async () => {
  const cliente = (await api('POST', '/clientes', { nome: 'Bruno', email: 'bruno@x.com' })).corpo;
  const produto = (await api('POST', '/produtos', { titulo: 'Mouse', preco: 50, estoque: 5 })).corpo;
  const pedido = {
    codigo_pedido: 1,
    cliente_id: cliente.id,
    status: 'Pago',
    tipo_desconto: 'PERCENTUAL',
    desconto: 10,
    itens: [{ produto_id: produto.id, quantidade: 5 }]
  };

  const criado = await api('POST', '/pedidos', pedido);
  assert.equal(criado.status, 201);
  assert.equal(criado.corpo.subtotal, 250);
  assert.equal(criado.corpo.total, 225);
  assert.equal(await estoqueDe(produto.id), 0);

  // Editar um pedido pago que consumiu todo o estoque não pode acusar falta de estoque.
  assert.equal((await api('PUT', `/pedidos/${criado.corpo.id}`, pedido)).status, 200);

  const semEstoque = await api('POST', '/pedidos', { ...pedido, codigo_pedido: 2, itens: [{ produto_id: produto.id, quantidade: 1 }] });
  assert.equal(semEstoque.status, 422);
  assert.match(semEstoque.corpo.mensagem, /Estoque insuficiente/);

  assert.equal((await api('POST', '/pedidos', { ...pedido, codigo_pedido: 1 })).status, 409);

  // Cancelar devolve o estoque.
  await api('PUT', `/pedidos/${criado.corpo.id}`, { ...pedido, status: 'Cancelado' });
  assert.equal(await estoqueDe(produto.id), 5);

  // Exclusão em massa de pedidos pagos também devolve o estoque.
  const outro = (await api('POST', '/pedidos', { ...pedido, codigo_pedido: 3, itens: [{ produto_id: produto.id, quantidade: 2 }] })).corpo;
  assert.equal(await estoqueDe(produto.id), 3);
  assert.equal((await api('DELETE', '/pedidos', { ids: [outro.id] })).status, 200);
  assert.equal(await estoqueDe(produto.id), 5);

  const lista = await api('GET', `/pedidos?cliente_id=${cliente.id}&ordenarPor=total`);
  assert.equal(lista.corpo.total, 1);
  assert.equal(lista.corpo.dados[0].cliente.nome, 'Bruno');

  // Cliente com pedidos não pode ser excluído.
  assert.equal((await api('DELETE', `/clientes/${cliente.id}`)).status, 409);
});

test('rejeita pedidos inválidos', async () => {
  const cliente = (await api('POST', '/clientes', { nome: 'Carla', email: 'carla@x.com' })).corpo;
  const produto = (await api('POST', '/produtos', { titulo: 'Teclado', preco: 100, estoque: 5 })).corpo;
  const base = { codigo_pedido: 10, cliente_id: cliente.id, status: 'Em Aberto', itens: [{ produto_id: produto.id, quantidade: 1 }] };

  const casos = [
    { ...base, status: 'Enviado' },
    { ...base, tipo_desconto: 'PERCENTUAL', desconto: 150 },
    { ...base, tipo_desconto: 'VALOR', desconto: 101 },
    { ...base, itens: [] },
    { ...base, itens: [...base.itens, ...base.itens] }
  ];
  for (const caso of casos) assert.equal((await api('POST', '/pedidos', caso)).status, 422);
});

test('altera status do pedido movimentando o estoque', async () => {
  const cliente = (await api('POST', '/clientes', { nome: 'Davi', email: 'davi@x.com' })).corpo;
  const produto = (await api('POST', '/produtos', { titulo: 'Monitor', preco: 800, estoque: 4 })).corpo;
  const pedido = (await api('POST', '/pedidos', {
    codigo_pedido: 20, cliente_id: cliente.id, status: 'Em Aberto', itens: [{ produto_id: produto.id, quantidade: 3 }]
  })).corpo;

  assert.equal((await api('PATCH', `/pedidos/${pedido.id}/status`, { status: 'Pago' })).corpo.status, 'Pago');
  assert.equal(await estoqueDe(produto.id), 1);
  assert.equal((await api('PATCH', `/pedidos/${pedido.id}/status`, { status: 'Cancelado' })).status, 200);
  assert.equal(await estoqueDe(produto.id), 4);
  assert.equal((await api('PATCH', `/pedidos/${pedido.id}/status`, { status: 'Enviado' })).status, 422);
});

