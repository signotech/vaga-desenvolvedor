const { sequelize } = require("../db")
const dotenv = require("dotenv/config")
const passport = require("passport")
const { Strategy, ExtractJwt } = require("passport-jwt")

function passportConfig() {
    const params = {
        secretOrKey: process.env.Auth_secret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    const strategy = new Strategy(params, (params, (payload, done) => {
        const usuario = sequelize.query(`SELECT * FROM usuarios WHERE id = :id`, {replacements: {id: payload.id}})

        usuario
            .then(([usuario]) => done(null, usuario ? {...payload } : false))
            .catch(err => done(err, false))
    }))

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate("jwt", {session: false})
    }
}

module.exports = { passportConfig }