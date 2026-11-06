
const express = require('express')
const router = express.Router()

const db = require('../config/database')

// LISTAR TODAS AS VAGAS
router.get('/', async (req, res) => {
  try {
    const [vagas] = await db.query(
      'SELECT * FROM vagas ORDER BY id DESC'
    )

    res.json(vagas)
  } catch (erro) {
    console.error('Erro ao listar vagas:', erro.message)
    res.status(500).json({ mensagem: 'Erro ao listar vagas.' })
  }
})

// CADASTRAR UMA NOVA VAGA
router.post('/', async (req, res) => {
  try {
    const {
      titulo,
      descricao,
      tipo,
      salario,
      local,
      status,
    } = req.body

    if (
      !titulo?.trim() ||
      !descricao?.trim() ||
      !tipo ||
      salario === undefined ||
      salario === null ||
      salario === '' ||
      !local?.trim() ||
      !status
    ) {
      return res.status(400).json({
        mensagem: 'Preencha todos os campos obrigatórios.',
      })
    }

    const tiposPermitidos = ['CLT', 'PJ', 'Freelancer']
    const statusPermitidos = ['Aberta', 'Pausada']

    if (!tiposPermitidos.includes(tipo)) {
      return res.status(400).json({
        mensagem: 'Tipo de contratação inválido.',
      })
    }

    if (!statusPermitidos.includes(status)) {
      return res.status(400).json({
        mensagem: 'Status da vaga inválido.',
      })
    }

    const salarioNumerico = Number(salario)

    if (!Number.isFinite(salarioNumerico) || salarioNumerico < 0) {
      return res.status(400).json({
        mensagem: 'Informe um salário válido.',
      })
    }

    const [resultado] = await db.query(
      `INSERT INTO vagas
      (titulo, descricao, tipo, salario, local_trabalho, status)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [titulo.trim(), descricao.trim(), tipo, salarioNumerico, local.trim(), status]
    )

    const [novaVaga] = await db.query(
      'SELECT * FROM vagas WHERE id = ?',
      [resultado.insertId]
    )

    res.status(201).json(novaVaga[0])
  } catch (erro) {
    console.error('Erro ao cadastrar vaga:', erro.message)
    res.status(500).json({ mensagem: 'Erro ao cadastrar vaga.' })
  }
})

// EDITAR UMA VAGA
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const {
      titulo,
      descricao,
      tipo,
      salario,
      local,
      status,
    } = req.body

    if (
      !titulo?.trim() ||
      !descricao?.trim() ||
      !tipo ||
      salario === undefined ||
      salario === null ||
      salario === '' ||
      !local?.trim() ||
      !status
    ) {
      return res.status(400).json({
        mensagem: 'Preencha todos os campos obrigatórios.',
      })
    }

    const tiposPermitidos = ['CLT', 'PJ', 'Freelancer']
    const statusPermitidos = ['Aberta', 'Pausada']

    if (!tiposPermitidos.includes(tipo)) {
      return res.status(400).json({
        mensagem: 'Tipo de contratação inválido.',
      })
    }

    if (!statusPermitidos.includes(status)) {
      return res.status(400).json({
        mensagem: 'Status da vaga inválido.',
      })
    }

    const salarioNumerico = Number(salario)

    if (!Number.isFinite(salarioNumerico) || salarioNumerico < 0) {
      return res.status(400).json({
        mensagem: 'Informe um salário válido.',
      })
    }

    const [resultado] = await db.query(
      `UPDATE vagas
       SET titulo = ?, descricao = ?, tipo = ?, salario = ?,
           local_trabalho = ?, status = ?
       WHERE id = ?`,
      [
        titulo.trim(),
        descricao.trim(),
        tipo,
        salarioNumerico,
        local.trim(),
        status,
        id,
      ]
    )

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: 'Vaga não encontrada.',
      })
    }

    const [vagaAtualizada] = await db.query(
      'SELECT * FROM vagas WHERE id = ?',
      [id]
    )

    res.json(vagaAtualizada[0])
  } catch (erro) {
    console.error('Erro ao editar vaga:', erro.message)
    res.status(500).json({ mensagem: 'Erro ao editar vaga.' })
  }
})


// EXCLUIR UMA VAGA
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const [resultado] = await db.query(
      'DELETE FROM vagas WHERE id = ?',
      [id]
    )

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: 'Vaga não encontrada.',
      })
    }

    res.json({
      mensagem: 'Vaga excluída com sucesso!',
    })
  } catch (erro) {
    console.error('Erro ao excluir vaga:', erro.message)
    res.status(500).json({
      mensagem: 'Erro ao excluir vaga.',
    })
  }
})


module.exports = router
