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
    constructor() {
        this.id_cliente_pedido = null;
        this.valor_pedido = '';
        this.data_pedido = '';
        this.status_pedido = '';
    }
}