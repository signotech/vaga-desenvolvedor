class PedidoControllerDecorator {
  constructor(pedidoController) {
    this.pedidoController = pedidoController;
  }

  async handle(httpRequest) {
    const httpResponse = await this.pedidoController.handle(httpRequest);
    if (Array.isArray(httpResponse.body)) {
      httpResponse.body = httpResponse.body.map(PedidoControllerDecorator.replaceEntitiesWithUrls);
    } else {
      httpResponse.body = PedidoControllerDecorator.replaceEntitiesWithUrls(httpResponse.body);
    }
    return httpResponse;
  }

  static replaceEntitiesWithUrls(pedido) {
    const { API_HOST, API_PORT } = process.env;
    const apiUrl = `http://${API_HOST}:${API_PORT}`;
    const newPedido = {
      ...pedido,
      urlCliente: `${apiUrl}/clientes/${pedido.cliente.cpfCliente}`,
      urlProdutos: `${apiUrl}/pedidos/${pedido.codigoPedido}/produtos`,
    };
    delete newPedido.cliente;
    delete newPedido.produtos;
    return newPedido;
  }
}

module.exports = PedidoControllerDecorator;
