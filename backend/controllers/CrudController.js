class CrudController {
  constructor(service) {
    this.service = service;
  }

  listar = async (req, res) => res.json(await this.service.listar(req.query));

  buscar = async (req, res) => res.json(await this.service.buscarPorId(req.params.id));

  criar = async (req, res) => res.status(201).json(await this.service.criar(req.body));

  atualizar = async (req, res) => res.json(await this.service.atualizar(req.params.id, req.body));

  excluir = async (req, res) => {
    await this.service.excluir(req.params.id);
    res.status(204).end();
  };

  excluirVarios = async (req, res) => res.json({ excluidos: await this.service.excluirVarios(req.body.ids) });
}

module.exports = CrudController;
