const { sequelize } = require("../db")
const paginator = require("../util/paginator")

async function get(req, res) {
    const nome = req.query.nome || ""
    const limit = req.query.limit || 20
    const orderBy = req.query.orderBy || "id"
    const page = req.query.page || 1

    try {
        const [totalCategoriaQuery] = await sequelize.query("SELECT COUNT(id) as total FROM categorias WHERE nome LIKE ?", {replacements: [`%${nome}%`]})
        const [total] = totalCategoriaQuery.map(categoria => categoria.total)

        const categorias = sequelize.query(`
            SELECT * 
            FROM categorias
            WHERE nome LIKE ?
            ORDER BY ${orderBy}
            LIMIT ?
            OFFSET ?
        `, { replacements: [`%${nome}%`, Number.parseInt(limit), (page * limit - limit)] })

    function includeParentCategory(categories) {
        return categories.map(category => {
            const parentCategory = categories.filter(parentCategory => parentCategory.id === category.parent_id)

            if(parentCategory[0]) {
                return {
                    ...category,
                    categoriaPai: parentCategory[0].nome
                } 
            } else {
                return {
                    ...category
                }
            }
        })
    }

        categorias
            .then(([categorias]) => {
                const pages = paginator(total, limit)
                res.status(200).json({ data: includeParentCategory(categorias), total: total, pages })
            })
            .catch(err => res.status(500).send())
    } catch (error) {
        res.status(500).send()
    }
}

function save(req, res) {
    const categoryInfo = { ...req.body }

    if (!categoryInfo.nome) {
        res.status(401).send("Nome precisa ser informado")
        return
    }

    if (req.method === "POST") {
        const saveNewCategory = sequelize.query(`
            INSERT INTO categorias(nome, parent_id)
            VALUES (?, ?)
        `, {
            replacements: [categoryInfo.nome, categoryInfo.categoriaPaiId || null]
        })

        saveNewCategory
            .then(resp => res.status(204).send())
            .catch(err => res.status(500).send())
    } else if (req.method === "PUT") {
        const updateCategory = sequelize.query(`
            UPDATE categorias
            SET nome = ?, parent_id = ?
            WHERE id = ?
        `, {replacements: [categoryInfo.nome, categoryInfo.categoriaPaiId || null, categoryInfo.categoryToChangeId]})

        updateCategory
            .then(resp => res.status(204).send())
            .catch(err => res.status(500).send())
    }
}

async function deleteCategory(req, res) {
    const categoryId = req.params.categoryId

    try {
        await sequelize.query("DELETE FROM produtos WHERE categoria_id = ?", {replacements: [categoryId]})
        await sequelize.query("DELETE FROM categorias WHERE parent_id = ?", {replacements: [categoryId]})

        const deleteCategory = sequelize.query("DELETE FROM categorias WHERE id = ?", {replacements: [categoryId]})

        deleteCategory
            .then(resp => res.status(204).send())
            .catch(err => res.status(500).send())
        } catch (error) {
        res.status(500).send()
    }
}

module.exports = { get, save, deleteCategory }