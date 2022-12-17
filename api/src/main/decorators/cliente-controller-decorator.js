class ClienteControllerDecorator {
  constructor(clienteController) {
    this.clienteController = clienteController;
  }

  async handle(httpRequest) {
    const httpResponse = await this.clienteController.handle(httpRequest);
    if (typeof httpResponse.body === 'array') {
      httpResponse.body = httpResponse.body.map(this.addUrlPedidosToCliente);
    } else {
      httpResponse.body = this.addUrlPedidosToCliente(httpResponse.body);
    }
    return httpResponse;
  }

  addUrlPedidosToCliente(cliente) {
    const { API_HOST, API_PORT } = process.env;
    return {
      ...cliente,
      urlPedidos: 
        `http://${API_HOST}:${API_PORT}/clientes/${cliente.cpfCliente}/pedidos`
    };
  }
}

module.exports = ClienteControllerDecorator;
