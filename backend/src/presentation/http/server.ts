import app from '@presentation/http/app'
import conn from '@infra/db/config'

conn.sync().then(() => app.listen(3000, () => console.log("Servidor iniciado em localhost:3000"))).catch(err => console.log(err))

