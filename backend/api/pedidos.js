const { sequelize } = require("../db")
const paginator = require("../util/paginator")

async function get(req, res) {
    const orderBy = req.query.orderBy || "id"
    const page = req.query.page || 1
    const limit = req.query.limit || 20
    const userId = req.query.userId


    try {
        const [userFazendoAlteracaoIsAdminQuery] = await sequelize.query(`SELECT isAdmin FROM usuarios WHERE id = ?`, { replacements: [userId] })
        const [userFazendoAlteracaoIsAdmin] = userFazendoAlteracaoIsAdminQuery.map(pedido => pedido.isAdmin)

        let todosPedidos
        let totalPedidosQuery

        if (userFazendoAlteracaoIsAdmin === 1) {
            [totalPedidosQuery] = await sequelize.query(`SELECT COUNT(id) as total FROM pedidos`)

            todosPedidos = sequelize.query(`
                SELECT * 
                FROM pedidos
                ORDER BY ${orderBy}
                LIMIT ?
                OFFSET ?
            `, { replacements: [Number.parseInt(limit), (page * limit - limit)] })
        } else {
            [totalPedidosQuery] = await sequelize.query(`SELECT COUNT(id) as total FROM pedidos WHERE cliente_id = ?`, { replacements: [userId] })

            todosPedidos = sequelize.query(`
                SELECT * 
                FROM pedidos
                WHERE cliente_id = ?
                ORDER BY ${orderBy}
                LIMIT ?
                OFFSET ?
            `, { replacements: [userId, Number.parseInt(limit), (page * limit - limit)] })
        }

        const [totalPedidos] = totalPedidosQuery.map(pedido => pedido.total)

        todosPedidos
            .then(([pedidos]) => {
                const pages = paginator(totalPedidos, limit)
                res.status(200).json({ data: pedidos, totalPedidos, pages })
            })
            .catch(err => res.status(500).send())
    } catch (error) {
        res.status(500).send()
    }
}

async function save(req, res) {
    const pedido = { ...req.body }

    if (!pedido) {
        res.status(401).send()
        return
    }

    if (req.method === "POST") {
        const save = sequelize.query(`
            INSERT INTO pedidos(cliente_id, total, status)
            VALUES(?, ?, ?)
        `, { replacements: [pedido.clientId, pedido.total, "Em aberto"] })

        save
            .then(([resp]) => res.status(200).json(resp))
            .catch(err => res.status(500).send())
    } else if (req.method === "PUT") {
        const pedido = { ...req.body }
        console.log(pedido)
        const setStatus = sequelize.query(`
            UPDATE pedidos
            SET status = ?
            WHERE id = ?
        `, { replacements: [pedido.status, pedido.id] })

        setStatus
            .then(resp => res.status(204).send())
            .catch(err => res.status(500).send())
    }
}

module.exports = { get, save }