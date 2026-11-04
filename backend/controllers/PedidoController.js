const CrudController = require('./CrudController');

class PedidoController extends CrudController {
  alterarStatus = async (req, res) => res.json(await this.service.alterarStatus(req.params.id, req.body.status));
}

module.exports = PedidoController;
