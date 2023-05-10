const express = require("express")
const App = express()
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require("path")

const routes = require("./config/routes")

App.use(cors({origin: "http://localhost:3000"}))
App.use(bodyParser.json())
App.use(express.static(__dirname + "/upload"))

routes.authRoute(App)
routes.usersRoute(App)
routes.categoriaRotas(App)
routes.produtoRotas(App)
routes.pedidoRotas(App)
routes.upload(App)

App.listen(3001, () => console.log("Executando"))