const { sequelize } = require("../db")
const fs = require("fs")
const { path } = require("../rootPath")
const paginator = require("../util/paginator")

async function get(req, res) {
    const page = req.query.page || 1
    const limit = req.query.limit || 20
    const orderBy = req.query.orderBy || "id"
    const titulo = req.query.titulo || ""

    try {
        const [totalProductsQuery] = await sequelize.query(`
            SELECT COUNT(id) as total
            FROM produtos
            WHERE titulo LIKE ?
        `, { replacements: [`%${titulo}%`] })
        const [total] = totalProductsQuery.map(product => product.total)

        const allProducts = sequelize.query(`
            SELECT u.*, c.nome as categoria, c.id as categoriaId
            FROM produtos u, categorias c
            WHERE c.id = u.categoria_id
                AND titulo LIKE ?
            ORDER BY ${orderBy}
            LIMIT ?
            OFFSET ?
        `, { replacements: [`%${titulo}%`, Number.parseInt(limit), (page * limit - limit)] })

        function getPriceWithDiscount(products) {
            return products.map(product => {
                if (product.desconto > 0) {
                    const fator = ((product.desconto * product.preco) / 100).toFixed(2)
                    product.preco = (product.preco - fator).toFixed(2)
                }
                return product
            })
        }

        allProducts
            .then(([produtos]) => {
                const pages = paginator(total, limit)
                res.status(200).json({ data: getPriceWithDiscount(produtos), total, pages })
            })
            .catch(err => res.status(500).send(err))
    } catch (error) {
        res.status(500).send()
    }
}

async function save(req, res) {
    const produto = { ...req.body }

    if (!produto) {
        res.status(401).send()
        return
    }

    if (req.method === "POST") {
        const novoProduto = sequelize.query(`
            INSERT INTO produtos(titulo, categoria_id, imagemURL, preco, estoque, desconto)
            VALUES(?, ?, ?, ?, ?, ?)
        `, {
            replacements: [produto.titulo, produto.category, produto.imagemUrl, produto.price, produto.stock, produto.desconto || 0]
        })

        novoProduto
            .then(resp => res.status(204).send())
            .catch(err => res.status(500).send())
    } else if (req.method === "PUT") {
        try {
            const [oldImageURLQuery] = await sequelize.query("SELECT imagemURL FROM produtos WHERE id = ?", { replacements: [produto.id] })
            const [imagemURL] = oldImageURLQuery.map(produto => produto.imagemURL)

            const novoProduto = sequelize.query(`
            UPDATE produtos
            SET titulo = ?, categoria_id = ?, imagemURL = ?, preco = ?, estoque = ?, desconto = ?
            WHERE id = ?
        `, {
                replacements: [produto.titulo, produto.category, produto.imagemUrl || imagemURL, produto.price, produto.stock, produto.desconto || 0, produto.id]
            })

            novoProduto
                .then(resp => {
                    res.status(204).send()

                    if (produto.imagemUrl) {
                        const imageName = imagemURL.split("/")[4]
                        fs.unlink(`${path}/upload/produtoCapa/${imageName}`, err => {
                            console.log(err)
                        })
                    }
                })
                .catch(err => res.status(500).send())
        } catch (error) {
            res.status(500).send()
        }
    }
}

async function atualizarEstoque(req, res) {
    const produto = { ...req.body }

    const novoProduto = sequelize.query(`
            UPDATE produtos
            SET estoque = ?
            WHERE id = ?
        `, {replacements: [produto.estoque, produto.id]}
    )

    novoProduto
        .then(resp => res.status(204).send())
        .catch(err => res.status(500).send())
}

async function produtoVendido(req, res) {
    const produto = { ...req.body }

    if (req.method === "POST") {
        const novoProduto = sequelize.query(`
            INSERT INTO produtos_vendidos(id, titulo, quantidade, pedido_id)
            VALUES(?, ?, ?, ?)
        `, {
            replacements: [produto.id, produto.titulo, produto.quantidade, produto.pedidoId]
        })

        novoProduto
            .then(resp => res.status(204).send())
            .catch(err => res.status(500).send())
    }
}

async function deleteProduct(req, res) {
    const productToDeleteId = req.params.id

    const [oldImageURLQuery] = await sequelize.query("SELECT imagemURL FROM produtos WHERE id = ?", { replacements: [productToDeleteId] })
    const [imagemURL] = oldImageURLQuery.map(produto => produto.imagemURL)

    if (imagemURL) {
        const imageName = imagemURL.split("/")[4]
        fs.unlink(`${path}/upload/produtoCapa/${imageName}`, err => {
            console.log(err)
        })
    }

    const deleteProduct = sequelize.query(`DELETE FROM produtos WHERE id = ?`, { replacements: [productToDeleteId] })

    deleteProduct
        .then(resp => res.status(204).send())
        .catch(err => res.status(500).send())
}

module.exports = { get, save, atualizarEstoque, produtoVendido, deleteProduct }