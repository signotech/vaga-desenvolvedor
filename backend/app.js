
const express = require('express')
const cors = require('cors')

const db = require('./config/database')
const vagasRoutes = require('./routes/vagas')
const candidatosRoutes = require('./routes/candidatos')
const inscricoesRoutes = require('./routes/inscricoes')

const app = express()

app.use(cors())
app.use(express.json())

// ROTA INICIAL
app.get('/', (req, res) => {
  res.json({
    mensagem: 'API do Portal RH funcionando!'
  })
})

// TESTE DE CONEXÃO COM MYSQL
app.get('/api/teste-banco', async (req, res) => {
  try {
    const [resultado] = await db.query(
      'SELECT DATABASE() AS banco'
    )

    res.json({
      mensagem: 'Conexão com MySQL realizada com sucesso!',
      banco: resultado[0].banco
    })
  } catch (erro) {
    console.error('Erro ao conectar com MySQL:', erro.message)

    res.status(500).json({
      mensagem: 'Erro ao conectar com o banco de dados.'
    })
  }
})

// ROTAS
app.use('/api/vagas', vagasRoutes)
app.use('/api/candidatos', candidatosRoutes)
app.use('/api/inscricoes', inscricoesRoutes)

module.exports = app
