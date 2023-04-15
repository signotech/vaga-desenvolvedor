export class Customer {
    constructor() {
        this.cpf_cliente = '';
        this.nome_cliente = '';
        this.email_cliente = '';
    }
}

export class Product {
    constructor() {
        this.sku_produto = '';
        this.titulo_produto = '';
        this.estoque = '';
        this.preco = '';
    }
}

export class Order {
    constructor(id_cliente_pedido = null, valor_pedido = '') {
        this.id_cliente_pedido = id_cliente_pedido;
        this.valor_pedido = valor_pedido;
        this.data_pedido = '';
        this.status_pedido = '';
    }
}