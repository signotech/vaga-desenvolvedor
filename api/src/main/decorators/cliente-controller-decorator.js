class ClienteControllerDecorator {
  constructor(clienteController) {
    this.clienteController = clienteController;
  }

  async handle(httpRequest) {
    const httpResponse = await this.clienteController.handle(httpRequest);
    if (Array.isArray(httpResponse.body)) {
      httpResponse.body = httpResponse.body.map(ClienteControllerDecorator.addUrlPedidosToCliente);
    } else {
      httpResponse.body = ClienteControllerDecorator.addUrlPedidosToCliente(httpResponse.body);
    }
    return httpResponse;
  }

  static addUrlPedidosToCliente(cliente) {
    const { API_HOST, API_PORT } = process.env;
    return {
      ...cliente,
      urlPedidos:
        `http://${API_HOST}:${API_PORT}/clientes/${cliente.cpfCliente}/pedidos`,
    };
  }
}

module.exports = ClienteControllerDecorator;
