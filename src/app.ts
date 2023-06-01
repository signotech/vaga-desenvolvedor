import express, { Application } from "express"
import { handleErros } from "./error/error"
import "express-async-errors"
import clientRoutes from "./routes/clientRoute/client.routes"

const app:Application = express()

app.use(express.json())

app.use('/client',clientRoutes)

app.use(handleErros)

export default app