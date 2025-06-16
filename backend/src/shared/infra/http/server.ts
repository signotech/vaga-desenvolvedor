import express from "express"
import cors from "cors"
import { routes } from "../http/routes/index"
import { setupSwagger } from "./swagger"

const app = express()

app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  }),
)

app.use(express.json())




setupSwagger(app)

app.use(routes)

app.get("/", (req, res) => {
  res.json({
    message: "Sistema de Gestão de Vagas - API",
    version: "1.0.0",
    documentation: "/api-docs",
    endpoints: {
      jobs: "/jobs",
      candidates: "/candidates",
      applications: "/applications",
    },
  })
})

export { app }
