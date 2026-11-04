const { Op, where } = require('sequelize');

const LIMITE_PADRAO = 20;
const LIMITE_MAXIMO = 100;

// "campos" mapeia o nome público do campo para uma expressão SQL (col/literal).
function paginacao(query) {
  const pagina = Math.max(parseInt(query.pagina, 10) || 1, 1);
  const limite = Math.min(Math.max(parseInt(query.limite, 10) || LIMITE_PADRAO, 1), LIMITE_MAXIMO);
  return { pagina, limite, offset: (pagina - 1) * limite };
}

// ?campo=valor filtra por igualdade; ?busca=texto[&campo=nome] filtra por "contém".
function filtro(query, campos) {
  const condicoes = Object.entries(campos)
    .filter(([nome]) => query[nome] !== undefined && query[nome] !== '')
    .map(([nome, coluna]) => where(coluna, query[nome]));

  const busca = String(query.busca ?? '').trim();
  if (busca) {
    const colunas = campos[query.campo] ? [campos[query.campo]] : Object.values(campos);
    condicoes.push({ [Op.or]: colunas.map(coluna => where(coluna, { [Op.like]: `%${busca}%` })) });
  }

  return { [Op.and]: condicoes };
}

function ordenacao(query, campos) {
  const coluna = campos[query.ordenarPor] ?? campos.id;
  const direcao = String(query.ordem).toUpperCase() === 'DESC' ? 'DESC' : 'ASC';
  return [[coluna, direcao]];
}

module.exports = { paginacao, filtro, ordenacao };
