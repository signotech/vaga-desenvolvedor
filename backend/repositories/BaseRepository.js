class BaseRepository {
  constructor(Model, { incluirNaLista = [], incluirNoDetalhe = incluirNaLista } = {}) {
    this.Model = Model;
    this.incluirNaLista = incluirNaLista;
    this.incluirNoDetalhe = incluirNoDetalhe;
  }

  listar(opcoes) {
    return this.Model.findAndCountAll({ include: this.incluirNaLista, distinct: true, ...opcoes });
  }

  buscarPorId(id, opcoes = {}) {
    return this.Model.findByPk(id, { include: this.incluirNoDetalhe, ...opcoes });
  }

  buscarPorIds(ids, opcoes = {}) {
    return this.Model.findAll({ where: { id: ids }, ...opcoes });
  }

  criar(dados, opcoes) {
    return this.Model.create(dados, opcoes);
  }

  criarVarios(lista, opcoes) {
    return this.Model.bulkCreate(lista, opcoes);
  }

  excluirOnde(where, opcoes = {}) {
    return this.Model.destroy({ where, ...opcoes });
  }

  transacao(callback) {
    return this.Model.sequelize.transaction(callback);
  }
}

module.exports = BaseRepository;
