const { sequelize } = require("../db")
const jwt = require("jwt-simple")
const bctypt = require("bcrypt")

async function signUp(req, res) {
    const user = { ...req.body }
    if (!user.nome || !user.email || !user.cpf || !user.password || !user.confirmPassword) {
        res.status(400).send("Dados não foram preenchidos corretamente")
        return
    } else if (user.cpf.length < 11) {
        res.status(400).send("CPF inválido")
        return
    } else if (user.password.length < 8) {
        res.status(400).send("Senha precisa ter ao menos 8 digitos")
        return
    }

    if (!user.isAdmin) user.isAdmin = false

    const [checkIfUserAlreadyExists] = await sequelize.query("SELECT email, cpf FROM usuarios WHERE email = :email OR cpf = :cpf", { replacements: { email: user.email, cpf: user.cpf } })
    const [userFromDB] = checkIfUserAlreadyExists.map(user => user)


    if (user.password !== user.confirmPassword) {
        res.status(400).send("Senhas não conferem")
        return
    }

    if (checkIfUserAlreadyExists.length === 0) {
        const cryptPassword = (senha) => {
            const salt = bctypt.genSaltSync(10)
            return bctypt.hashSync(senha, salt)
        }

        user.password = cryptPassword(user.password)
        delete user.confirmPassword

        const save = sequelize.query(`
            INSERT INTO usuarios (nome, cpf, email, password, isAdmin)
            VALUES(?, ?, ?, ?, ?)
        `, { replacements: [user.nome, user.cpf, user.email, user.password, user.isAdmin] })

        save
            .then(resp => res.status(200).send("Usuário cadastrado com sucesso"))
            .catch(err => res.status(500).send("Erro ao cadastrar"))
    } else {
        if(userFromDB.cpf === user.cpf) {
            res.status(400).send("CPF já cadastrado")
            return
        }

        res.status(400).send("Usuário/email já cadastrado")
    }
}

async function signIn(req, res) {
    const user = { ...req.body }

    if (!user.email || !user.password) {
        res.status(400).send("Nome/Senha não informados")
        return
    }

    try {
        const [userFromDb] = await sequelize.query(`
            SELECT id, nome, email, password, isAdmin
            FROM usuarios
            WHERE email = :email
        `, { replacements: { email: user.email } })

        if (userFromDb.length > 0) {
            const [userDB] = userFromDb
            const authSecret = process.env.Auth_secret
            const now = Math.floor(Date.now() / 1000)

            const isMatch = bctypt.compareSync(user.password, userDB.password)

            if (isMatch) {
                delete userDB.password
                userDB.isAdmin = userDB.isAdmin === 0 ? false : true

                const payload = {
                    ...userDB,
                    exp: now + (60 * 60 * 24 * 3) //3 Dias
                }
                res.status(200).json({
                    ...payload,
                    token: jwt.encode(payload, authSecret)
                })
            } else {
                res.status(400).send("Email/Senha inválidos")
            }
        } else {
            res.status(400).send("Usuário não cadastrado")
        }
    } catch (error) {
        res.status(500).send("Erro ao fazer logIn")
    }
}

module.exports = { signUp, signIn }