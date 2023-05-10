const passport = require("../config/passport")
const { authenticate } = passport.passportConfig()
const { isAdmin } = require("../config/isAdmin")

function authRoute(App) {
    const { signUp, signIn } = require("../api/auth")

    App.route("/auth/signUp")
        .post(signUp)

    App.route("/auth/signIn")
        .post(signIn)
}

function usersRoute(App) {
    const { getClients, save, deleteUser } = require("../api/users")

    App.route("/clientes")
        .all(authenticate())
        .all(isAdmin)
        .get(getClients)
        .put(save)

    App.route("/clientes/:id")
        .all(authenticate())
        .all(isAdmin)
        .delete(deleteUser)
}

function categoriaRotas(App) {
    const { get, save, deleteCategory } = require("../api/categories")

    App.route("/categorias")
        .all(authenticate())
        .all(isAdmin)
        .get(get)
        .post(save)
        .put(save)

    App.route("/categorias/:categoryId")
        .all(authenticate())
        .all(isAdmin)
        .delete(deleteCategory)
}

function produtoRotas(App) {
    const { get, save, atualizarEstoque, produtoVendido, deleteProduct } = require("../api/products")

    App.route("/produtos")
        .all(authenticate())
        .get(get)
        .all(isAdmin)
        .post(save)
        .put(save)

    App.route("/produtos/estoque")
        .all(authenticate())
        .put(atualizarEstoque)

    App.route("/produtos/vendidos")
        .all(authenticate())
        .post(produtoVendido)

    App.route("/produtos/:id")
        .all(authenticate())
        .all(isAdmin)
        .delete(deleteProduct)
}

function pedidoRotas(App) {
    const { get, save } = require("../api/pedidos")

    App.route("/pedidos")
        .all(authenticate())
        .get(get)
        .post(save)
        .put(save)
}
 
function upload(App) {
    const { uploadConfig } = require("../config/upload")
    const { path } = require("../rootPath")

    App.route("/upload")
        .all(authenticate())
        .post(uploadConfig(`${path}/upload/produtoCapa`).single("coverFoto"), (req, res) => res.status(204).send())
}

module.exports = { authRoute, usersRoute, categoriaRotas, produtoRotas, pedidoRotas, upload }