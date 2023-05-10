function isAdmin(req, res, next) {
    if(!req.user.isAdmin) {
        res.status(401).send("Usuário não é um administrador")
    } else {
        next()
    }
}

module.exports = { isAdmin }