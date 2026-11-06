
const express = require('express')
const router = express.Router()

const db = require('../config/database')

// LISTAR TODOS OS CANDIDATOS
router.get('/', async (req, res) => {
  try {
    const [candidatos] = await db.query(
      'SELECT * FROM candidatos ORDER BY id DESC'
    )

    res.json(candidatos)
  } catch (erro) {
    console.error('Erro ao listar candidatos:', erro.message)
    res.status(500).json({
      mensagem: 'Erro ao listar candidatos.',
    })
  }
})

// CADASTRAR CANDIDATO
router.post('/', async (req, res) => {
  try {
    const {
      nome,
      email,
      telefone,
      cpf,
      endereco,
    } = req.body

    if (
      !nome?.trim() ||
      !email?.trim() ||
      !telefone?.trim() ||
      !cpf?.trim() ||
      !endereco?.trim()
    ) {
      return res.status(400).json({
        mensagem: 'Preencha todos os campos obrigatórios.',
      })
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailValido.test(email.trim())) {
      return res.status(400).json({
        mensagem: 'Informe um e-mail válido.',
      })
    }

    const [resultado] = await db.query(
      `INSERT INTO candidatos
      (nome, email, telefone, cpf, endereco)
      VALUES (?, ?, ?, ?, ?)`,
      [
        nome.trim(),
        email.trim(),
        telefone.trim(),
        cpf.trim(),
        endereco.trim(),
      ]
    )

    const [novoCandidato] = await db.query(
      'SELECT * FROM candidatos WHERE id = ?',
      [resultado.insertId]
    )

    res.status(201).json(novoCandidato[0])
  } catch (erro) {
    if (erro.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        mensagem: 'Este e-mail ou CPF já está cadastrado.',
      })
    }

    console.error('Erro ao cadastrar candidato:', erro.message)

    res.status(500).json({
      mensagem: 'Erro ao cadastrar candidato.',
    })
  }
})

// EDITAR CANDIDATO
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const {
      nome,
      email,
      telefone,
      cpf,
      endereco,
    } = req.body

    if (
      !nome?.trim() ||
      !email?.trim() ||
      !telefone?.trim() ||
      !cpf?.trim() ||
      !endereco?.trim()
    ) {
      return res.status(400).json({
        mensagem: 'Preencha todos os campos obrigatórios.',
      })
    }

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailValido.test(email.trim())) {
      return res.status(400).json({
        mensagem: 'Informe um e-mail válido.',
      })
    }

    const [resultado] = await db.query(
      `UPDATE candidatos
       SET nome = ?, email = ?, telefone = ?, cpf = ?, endereco = ?
       WHERE id = ?`,
      [
        nome.trim(),
        email.trim(),
        telefone.trim(),
        cpf.trim(),
        endereco.trim(),
        id,
      ]
    )

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: 'Candidato não encontrado.',
      })
    }

    const [candidatoAtualizado] = await db.query(
      'SELECT * FROM candidatos WHERE id = ?',
      [id]
    )

    res.json(candidatoAtualizado[0])
  } catch (erro) {
    if (erro.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        mensagem: 'Este e-mail ou CPF já está cadastrado.',
      })
    }

    console.error('Erro ao editar candidato:', erro.message)

    res.status(500).json({
      mensagem: 'Erro ao editar candidato.',
    })
  }
})

// EXCLUIR CANDIDATO
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const [resultado] = await db.query(
      'DELETE FROM candidatos WHERE id = ?',
      [id]
    )

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: 'Candidato não encontrado.',
      })
    }

    res.json({
      mensagem: 'Candidato excluído com sucesso!',
    })
  } catch (erro) {
    console.error('Erro ao excluir candidato:', erro.message)

    res.status(500).json({
      mensagem: 'Erro ao excluir candidato.',
    })
  }
})

module.exports = router
