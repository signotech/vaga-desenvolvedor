
require('dotenv').config()

const { test, after } = require('node:test')
const assert = require('node:assert/strict')

const app = require('../app')
const db = require('../config/database')

let servidor
let endereco

// INICIAR SERVIDOR DE TESTES
test('A API deve responder corretamente na rota inicial', async () => {
  servidor = app.listen(0)

  await new Promise((resolve) => {
    servidor.once('listening', resolve)
  })

  const porta = servidor.address().port
  endereco = `http://127.0.0.1:${porta}`

  const resposta = await fetch(endereco)
  const dados = await resposta.json()

  assert.equal(resposta.status, 200)
  assert.equal(dados.mensagem, 'API do Portal RH funcionando!')
})

// TESTAR LISTAGEM DE VAGAS
test('A API deve listar as vagas corretamente', async (t) => {
  const vagasEsperadas = [
    {
      id: 1,
      titulo: 'Analista de Suporte',
      tipo: 'CLT',
      status: 'Aberta'
    }
  ]

  t.mock.method(db, 'query', async () => [
    vagasEsperadas,
    []
  ])

  const resposta = await fetch(`${endereco}/api/vagas`)
  const dados = await resposta.json()

  assert.equal(resposta.status, 200)
  assert.deepEqual(dados, vagasEsperadas)
})

// TESTAR CAMPOS OBRIGATÓRIOS DA VAGA
test('A API deve impedir cadastro de vaga sem campos obrigatórios', async () => {
  const resposta = await fetch(`${endereco}/api/vagas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 400)
  assert.equal(dados.mensagem, 'Preencha todos os campos obrigatórios.')
})

// TESTAR TIPO DE CONTRATAÇÃO
test('A API deve rejeitar tipo de contratação inválido', async () => {
  const resposta = await fetch(`${endereco}/api/vagas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      titulo: 'Desenvolvedor',
      descricao: 'Vaga para desenvolvedor',
      tipo: 'Estágio',
      salario: 3000,
      local: 'Curitiba',
      status: 'Aberta'
    })
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 400)
  assert.equal(dados.mensagem, 'Tipo de contratação inválido.')
})

// TESTAR SALÁRIO INVÁLIDO
test('A API deve rejeitar salário negativo', async () => {
  const resposta = await fetch(`${endereco}/api/vagas`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      titulo: 'Desenvolvedor',
      descricao: 'Vaga para desenvolvedor',
      tipo: 'CLT',
      salario: -1000,
      local: 'Curitiba',
      status: 'Aberta'
    })
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 400)
  assert.equal(dados.mensagem, 'Informe um salário válido.')
})

// TESTAR LISTAGEM DE CANDIDATOS
test('A API deve listar os candidatos corretamente', async (t) => {
  const candidatosEsperados = [
    {
      id: 3,
      nome: 'Candidato Portal RH',
      email: 'portal@teste.com.br'
    }
  ]

  t.mock.method(db, 'query', async () => [
    candidatosEsperados,
    []
  ])

  const resposta = await fetch(`${endereco}/api/candidatos`)
  const dados = await resposta.json()

  assert.equal(resposta.status, 200)
  assert.deepEqual(dados, candidatosEsperados)
})

// TESTAR CAMPOS OBRIGATÓRIOS DO CANDIDATO
test('A API deve impedir cadastro de candidato sem campos obrigatórios', async () => {
  const resposta = await fetch(`${endereco}/api/candidatos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 400)
  assert.equal(dados.mensagem, 'Preencha todos os campos obrigatórios.')
})

// TESTAR E-MAIL INVÁLIDO
test('A API deve rejeitar e-mail inválido no cadastro de candidato', async () => {
  const resposta = await fetch(`${endereco}/api/candidatos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: 'Candidato Teste',
      email: 'email-invalido',
      telefone: '41999999999',
      cpf: '12345678900',
      endereco: 'Curitiba - PR'
    })
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 400)
  assert.equal(dados.mensagem, 'Informe um e-mail válido.')
})

// TESTAR LISTAGEM DE INSCRIÇÕES
test('A API deve listar as inscrições corretamente', async (t) => {
  const inscricoesEsperadas = [
    {
      id: 3,
      candidato_id: 3,
      vaga_id: 3,
      status: 'Em análise',
      candidato: 'Candidato Portal RH',
      vaga: 'Analista de Suporte'
    }
  ]

  t.mock.method(db, 'query', async () => [
    inscricoesEsperadas,
    []
  ])

  const resposta = await fetch(`${endereco}/api/inscricoes`)
  const dados = await resposta.json()

  assert.equal(resposta.status, 200)
  assert.deepEqual(dados, inscricoesEsperadas)
})

// TESTAR CAMPOS OBRIGATÓRIOS DA INSCRIÇÃO
test('A API deve impedir inscrição sem candidato ou vaga', async () => {
  const resposta = await fetch(`${endereco}/api/inscricoes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({})
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 400)
  assert.equal(dados.mensagem, 'Informe o candidato e a vaga.')
})

// TESTAR CANDIDATO INEXISTENTE
test('A API deve impedir inscrição com candidato inexistente', async (t) => {
  t.mock.method(db, 'query', async () => [[], []])

  const resposta = await fetch(`${endereco}/api/inscricoes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      candidato_id: 999,
      vaga_id: 3
    })
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 404)
  assert.equal(dados.mensagem, 'Candidato não encontrado.')
})

// TESTAR VAGA INEXISTENTE
test('A API deve impedir inscrição em vaga inexistente', async (t) => {
  let chamadas = 0

  t.mock.method(db, 'query', async () => {
    chamadas++

    if (chamadas === 1) {
      return [[{ id: 3 }], []]
    }

    return [[], []]
  })

  const resposta = await fetch(`${endereco}/api/inscricoes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      candidato_id: 3,
      vaga_id: 999
    })
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 404)
  assert.equal(dados.mensagem, 'Vaga não encontrada.')
})

// TESTAR VAGA PAUSADA
test('A API deve impedir inscrição em vaga pausada', async (t) => {
  let chamadas = 0

  t.mock.method(db, 'query', async () => {
    chamadas++

    if (chamadas === 1) {
      return [[{ id: 3 }], []]
    }

    return [[{ id: 3, status: 'Pausada' }], []]
  })

  const resposta = await fetch(`${endereco}/api/inscricoes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      candidato_id: 3,
      vaga_id: 3
    })
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 400)
  assert.equal(
    dados.mensagem,
    'Não é possível se inscrever em uma vaga pausada.'
  )
})

// TESTAR EDIÇÃO DE VAGA
test('A API deve editar uma vaga corretamente', async (t) => {
  const vagaAtualizada = {
    id: 3,
    titulo: 'Desenvolvedor Full Stack',
    descricao: 'Desenvolvimento web',
    tipo: 'CLT',
    salario: 5000,
    local_trabalho: 'Curitiba',
    status: 'Aberta'
  }

  let chamadas = 0

  t.mock.method(db, 'query', async () => {
    chamadas++

    if (chamadas === 1) {
      return [{ affectedRows: 1 }, []]
    }

    return [[vagaAtualizada], []]
  })

  const resposta = await fetch(`${endereco}/api/vagas/3`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      titulo: 'Desenvolvedor Full Stack',
      descricao: 'Desenvolvimento web',
      tipo: 'CLT',
      salario: 5000,
      local: 'Curitiba',
      status: 'Aberta'
    })
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 200)
  assert.equal(dados.titulo, 'Desenvolvedor Full Stack')
  assert.equal(chamadas, 2)
})

// TESTAR EDIÇÃO DE VAGA INEXISTENTE
test('A API deve impedir edição de vaga inexistente', async (t) => {
  t.mock.method(db, 'query', async () => [
    { affectedRows: 0 },
    []
  ])

  const resposta = await fetch(`${endereco}/api/vagas/999`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      titulo: 'Desenvolvedor',
      descricao: 'Descrição da vaga',
      tipo: 'CLT',
      salario: 4000,
      local: 'Curitiba',
      status: 'Aberta'
    })
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 404)
  assert.equal(dados.mensagem, 'Vaga não encontrada.')
})

// TESTAR EXCLUSÃO DE VAGA
test('A API deve excluir uma vaga corretamente', async (t) => {
  t.mock.method(db, 'query', async () => [
    { affectedRows: 1 },
    []
  ])

  const resposta = await fetch(`${endereco}/api/vagas/3`, {
    method: 'DELETE'
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 200)
  assert.equal(dados.mensagem, 'Vaga excluída com sucesso!')
})

// TESTAR EXCLUSÃO DE VAGA INEXISTENTE
test('A API deve impedir exclusão de vaga inexistente', async (t) => {
  t.mock.method(db, 'query', async () => [
    { affectedRows: 0 },
    []
  ])

  const resposta = await fetch(`${endereco}/api/vagas/999`, {
    method: 'DELETE'
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 404)
  assert.equal(dados.mensagem, 'Vaga não encontrada.')
})

// TESTAR EDIÇÃO DE CANDIDATO
test('A API deve editar um candidato corretamente', async (t) => {
  const candidatoAtualizado = {
    id: 3,
    nome: 'Candidato Atualizado',
    email: 'atualizado@teste.com.br',
    telefone: '41988888888',
    cpf: '12345678900',
    endereco: 'Curitiba - PR'
  }

  let chamadas = 0

  t.mock.method(db, 'query', async () => {
    chamadas++

    if (chamadas === 1) {
      return [{ affectedRows: 1 }, []]
    }

    return [[candidatoAtualizado], []]
  })

  const resposta = await fetch(`${endereco}/api/candidatos/3`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: 'Candidato Atualizado',
      email: 'atualizado@teste.com.br',
      telefone: '41988888888',
      cpf: '12345678900',
      endereco: 'Curitiba - PR'
    })
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 200)
  assert.equal(dados.nome, 'Candidato Atualizado')
  assert.equal(chamadas, 2)
})

// TESTAR EDIÇÃO DE CANDIDATO INEXISTENTE
test('A API deve impedir edição de candidato inexistente', async (t) => {
  t.mock.method(db, 'query', async () => [
    { affectedRows: 0 },
    []
  ])

  const resposta = await fetch(`${endereco}/api/candidatos/999`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      nome: 'Candidato Teste',
      email: 'teste@teste.com.br',
      telefone: '41999999999',
      cpf: '12345678900',
      endereco: 'Curitiba - PR'
    })
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 404)
  assert.equal(dados.mensagem, 'Candidato não encontrado.')
})

// TESTAR EXCLUSÃO DE CANDIDATO
test('A API deve excluir um candidato corretamente', async (t) => {
  t.mock.method(db, 'query', async () => [
    { affectedRows: 1 },
    []
  ])

  const resposta = await fetch(`${endereco}/api/candidatos/3`, {
    method: 'DELETE'
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 200)
  assert.equal(dados.mensagem, 'Candidato excluído com sucesso!')
})

// TESTAR EXCLUSÃO DE CANDIDATO INEXISTENTE
test('A API deve impedir exclusão de candidato inexistente', async (t) => {
  t.mock.method(db, 'query', async () => [
    { affectedRows: 0 },
    []
  ])

  const resposta = await fetch(`${endereco}/api/candidatos/999`, {
    method: 'DELETE'
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 404)
  assert.equal(dados.mensagem, 'Candidato não encontrado.')
})

// TESTAR ATUALIZAÇÃO DO STATUS DA INSCRIÇÃO
test('A API deve atualizar o status da inscrição corretamente', async (t) => {
  const inscricaoAtualizada = {
    id: 3,
    candidato_id: 3,
    vaga_id: 3,
    status: 'Aprovado'
  }

  let chamadas = 0

  t.mock.method(db, 'query', async () => {
    chamadas++

    if (chamadas === 1) {
      return [{ affectedRows: 1 }, []]
    }

    return [[inscricaoAtualizada], []]
  })

  const resposta = await fetch(`${endereco}/api/inscricoes/3`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'Aprovado'
    })
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 200)
  assert.equal(dados.status, 'Aprovado')
  assert.equal(chamadas, 2)
})

// TESTAR STATUS INVÁLIDO NA INSCRIÇÃO
test('A API deve rejeitar status inválido na inscrição', async () => {
  const resposta = await fetch(`${endereco}/api/inscricoes/3`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'Cancelado'
    })
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 400)
  assert.equal(dados.mensagem, 'Status da inscrição inválido.')
})

// TESTAR ATUALIZAÇÃO DE INSCRIÇÃO INEXISTENTE
test('A API deve impedir atualização de inscrição inexistente', async (t) => {
  let chamadas = 0

  t.mock.method(db, 'query', async () => {
    chamadas++

    if (chamadas === 1) {
      return [{ affectedRows: 0 }, []]
    }

    return [[], []]
  })

  const resposta = await fetch(`${endereco}/api/inscricoes/999`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      status: 'Aprovado'
    })
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 404)
  assert.equal(dados.mensagem, 'Inscrição não encontrada.')
  assert.equal(chamadas, 2)
})

// TESTAR EXCLUSÃO DE INSCRIÇÃO
test('A API deve excluir uma inscrição corretamente', async (t) => {
  t.mock.method(db, 'query', async () => [
    { affectedRows: 1 },
    []
  ])

  const resposta = await fetch(`${endereco}/api/inscricoes/3`, {
    method: 'DELETE'
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 200)
  assert.equal(dados.mensagem, 'Inscrição excluída com sucesso!')
})

// TESTAR EXCLUSÃO DE INSCRIÇÃO INEXISTENTE
test('A API deve impedir exclusão de inscrição inexistente', async (t) => {
  t.mock.method(db, 'query', async () => [
    { affectedRows: 0 },
    []
  ])

  const resposta = await fetch(`${endereco}/api/inscricoes/999`, {
    method: 'DELETE'
  })

  const dados = await resposta.json()

  assert.equal(resposta.status, 404)
  assert.equal(dados.mensagem, 'Inscrição não encontrada.')
})

// ENCERRAR SERVIDOR DE TESTES
after(() => {
  if (servidor) {
    servidor.close()
  }
})
