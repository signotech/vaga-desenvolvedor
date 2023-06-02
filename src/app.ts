import express, { Application } from "express"
import { handleErros } from "./error/error"
import "express-async-errors"
import clientRoutes from "./routes/clientRoute/client.routes"
import loginRoutes from "./routes/login/login.routes"

const app:Application = express()

app.use(express.json())

app.use('/client',clientRoutes)

app.use('/login',loginRoutes)

app.use(handleErros)

export default app