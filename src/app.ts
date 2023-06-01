import express, { Application } from "express"

const app:Application = express()

app.use(express.json())


export default app