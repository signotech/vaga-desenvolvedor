const { sequelize } = require("../db")
const paginator = require("../util/paginator")

async function getClients(req, res) {
    const page = req.query.page || 1
    const name = req.query.name || ""
    const orderBy = req.query.orderBy || "id"
    const limit = req.query.limit || 20

    const [totalClientsQuery] = await sequelize.query(`SELECT COUNT(id) as total FROM usuarios WHERE nome LIKE ?`, {replacements: [`%${name}%`]})
    const [total] = totalClientsQuery.map(user => user.total)

    const clients = sequelize.query(`
        SELECT id, nome, email, isAdmin
        FROM usuarios
        WHERE nome LIKE ?
        ORDER BY ${orderBy}
        LIMIT ?
        OFFSET ?
    `, {replacements: [`%${name}%`, Number.parseInt(limit), (page * limit - limit)]})

    clients
        .then(([clients]) => {
            const pages = paginator(total, limit)
            res.status(200).json({data: clients, total, pages})
        })
        .catch(err => res.status(500).send())
}

function save(req, res) {
    const user = { ...req.body }

    const atualizarUser = sequelize.query(`
        UPDATE usuarios
        SET isAdmin = ?
        WHERE id = ?
    `, {replacements: [user.admin == 1 ? true : false, user.id]})

    atualizarUser
        .then(resp => res.status(204).send())
        .catch(err => res.status(500).send())
}

async function deleteUser(req, res) {
    const userId = req.params.id

    await sequelize.query("DELETE FROM pedidos WHERE cliente_id = ?", {replacements: [userId]})

    const atualizarUser = sequelize.query(`
        DELETE FROM usuarios
        WHERE id = ?
    `, {replacements: [userId]})

    atualizarUser
        .then(resp => res.status(204).send())
        .catch(err => res.status(500).send())
}

module.exports = { getClients, save, deleteUser }