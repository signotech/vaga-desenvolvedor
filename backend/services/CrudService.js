const { col } = require('sequelize');
const { NaoEncontradoError } = require('../errors');
const { paginacao, filtro, ordenacao } = require('../utils/consulta');

class CrudService {
  // campos: { nomePublico: 'coluna' | expressão SQL } — define o que pode ser filtrado e ordenado.
  constructor(repository, { campos }) {
    this.repository = repository;
    const tabela = repository.Model.name;
    this.campos = Object.fromEntries(Object.entries(campos).map(([nome, coluna]) =>
      [nome, typeof coluna === 'string' ? col(`${tabela}.${coluna}`) : coluna]));
  }

  async listar(query) {
    const { pagina, limite, offset } = paginacao(query);
    const { count, rows } = await this.repository.listar({
      where: filtro(query, this.campos),
      order: ordenacao(query, this.campos),
      limit: limite,
      offset
    });
    return { dados: rows, pagina, limite, total: count, totalPaginas: Math.max(Math.ceil(count / limite), 1) };
  }

  async buscarPorId(id, opcoes) {
    const registro = await this.repository.buscarPorId(id, opcoes);
    if (!registro) throw new NaoEncontradoError();
    return registro;
  }

  criar(dados) {
    return this.repository.criar(dados);
  }

  async atualizar(id, dados) {
    const registro = await this.buscarPorId(id);
    return registro.update(dados);
  }

  async excluir(id, transaction) {
    const registro = await this.buscarPorId(id, { transaction });
    await registro.destroy({ transaction });
  }

  // Tudo ou nada: se um item falhar, nenhum é excluído.
  excluirVarios(ids) {
    return this.repository.transacao(async transaction => {
      for (const id of ids) await this.excluir(id, transaction);
      return ids.length;
    });
  }
}

module.exports = CrudService;
