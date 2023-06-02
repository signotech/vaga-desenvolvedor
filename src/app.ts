import "express-async-errors"
import express, { Application } from "express"
import { handleErros } from "./error/error"
import clientRoutes from "./routes/clientRoute/client.routes"
import loginRoutes from "./routes/login/login.routes"
import productsRoutes from "./routes/products/products.routes"

const app:Application = express()

app.use(express.json())

app.use('/client',clientRoutes)

app.use('/login',loginRoutes)

app.use('/products',productsRoutes)

app.use('/order',)

app.use(handleErros)

export default app