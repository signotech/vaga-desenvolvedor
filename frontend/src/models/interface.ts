export interface categoriaModel {
    id: number
    nome: string
    parentId: string | any
    categoriaPai: string | any
}

export interface produtoModel {
    id: number
    titulo: string
    sku: string | any
    preco: number
    estoque: number
    imagemURL: string
    desconto: number
    categoria_id: number
    categoria: string
    amount?: number
    total?: number
}

export interface usuarioModel {
    id: number
    nome: string
    email: string
    cpf: string
    isAdmin: number
}

export interface pedidoModel {
    id: number
    client_id: number
    total: number
    status: string
}