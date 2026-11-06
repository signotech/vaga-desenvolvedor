
const express = require('express')
const router = express.Router()

const db = require('../config/database')

// LISTAR TODAS AS INSCRIÇÕES
router.get('/', async (req, res) => {
  try {
    const [inscricoes] = await db.query(`
      SELECT
        i.id,
        i.candidato_id,
        i.vaga_id,
        i.data_inscricao,
        i.status,
        c.nome AS candidato,
        c.email,
        v.titulo AS vaga,
        v.tipo AS tipo_contratacao,
        v.status AS status_vaga
      FROM inscricoes i
      INNER JOIN candidatos c ON i.candidato_id = c.id
      INNER JOIN vagas v ON i.vaga_id = v.id
      ORDER BY i.id DESC
    `)

    res.json(inscricoes)
  } catch (erro) {
    console.error('Erro ao listar inscrições:', erro.message)

    res.status(500).json({
      mensagem: 'Erro ao listar inscrições.',
    })
  }
})

// CADASTRAR UMA INSCRIÇÃO
router.post('/', async (req, res) => {
  try {
    const { candidato_id, vaga_id } = req.body

    if (!candidato_id || !vaga_id) {
      return res.status(400).json({
        mensagem: 'Informe o candidato e a vaga.',
      })
    }

    // VERIFICAR SE O CANDIDATO EXISTE
    const [candidatos] = await db.query(
      'SELECT id FROM candidatos WHERE id = ?',
      [candidato_id]
    )

    if (candidatos.length === 0) {
      return res.status(404).json({
        mensagem: 'Candidato não encontrado.',
      })
    }

    // VERIFICAR SE A VAGA EXISTE E ESTÁ ABERTA
    const [vagas] = await db.query(
      'SELECT id, status FROM vagas WHERE id = ?',
      [vaga_id]
    )

    if (vagas.length === 0) {
      return res.status(404).json({
        mensagem: 'Vaga não encontrada.',
      })
    }

    if (vagas[0].status !== 'Aberta') {
      return res.status(400).json({
        mensagem: 'Não é possível se inscrever em uma vaga pausada.',
      })
    }

    // CADASTRAR INSCRIÇÃO
    const [resultado] = await db.query(
      `INSERT INTO inscricoes
       (candidato_id, vaga_id)
       VALUES (?, ?)`,
      [candidato_id, vaga_id]
    )

    const [novaInscricao] = await db.query(
      'SELECT * FROM inscricoes WHERE id = ?',
      [resultado.insertId]
    )

    res.status(201).json(novaInscricao[0])
  } catch (erro) {
    if (erro.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        mensagem: 'Este candidato já está inscrito nesta vaga.',
      })
    }

    console.error('Erro ao cadastrar inscrição:', erro.message)

    res.status(500).json({
      mensagem: 'Erro ao cadastrar inscrição.',
    })
  }
})

// ATUALIZAR STATUS DA INSCRIÇÃO
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const statusPermitidos = [
      'Em análise',
      'Aprovado',
      'Reprovado',
    ]

    if (!statusPermitidos.includes(status)) {
      return res.status(400).json({
        mensagem: 'Status da inscrição inválido.',
      })
    }

    const [resultado] = await db.query(
      'UPDATE inscricoes SET status = ? WHERE id = ?',
      [status, id]
    )

    if (resultado.affectedRows === 0) {
      const [existente] = await db.query(
        'SELECT id FROM inscricoes WHERE id = ?',
        [id]
      )

      if (existente.length === 0) {
        return res.status(404).json({
          mensagem: 'Inscrição não encontrada.',
        })
      }
    }

    const [inscricaoAtualizada] = await db.query(
      'SELECT * FROM inscricoes WHERE id = ?',
      [id]
    )

    res.json(inscricaoAtualizada[0])
  } catch (erro) {
    console.error('Erro ao atualizar inscrição:', erro.message)

    res.status(500).json({
      mensagem: 'Erro ao atualizar inscrição.',
    })
  }
})

// EXCLUIR INSCRIÇÃO
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const [resultado] = await db.query(
      'DELETE FROM inscricoes WHERE id = ?',
      [id]
    )

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        mensagem: 'Inscrição não encontrada.',
      })
    }

    res.json({
      mensagem: 'Inscrição excluída com sucesso!',
    })
  } catch (erro) {
    console.error('Erro ao excluir inscrição:', erro.message)

    res.status(500).json({
      mensagem: 'Erro ao excluir inscrição.',
    })
  }
})

module.exports = router
