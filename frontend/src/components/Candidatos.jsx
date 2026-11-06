
import { useState, useEffect } from 'react'

function Candidatos() {
  const [candidatos, setCandidatos] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [candidatoParaEditar, setCandidatoParaEditar] = useState(null)

  const [formulario, setFormulario] = useState({
    nome: '',
    email: '',
    telefone: '',
    cpf: '',
    endereco: ''
  })

  // CONTROLES DE PESQUISA, FILTRO E PAGINAÇÃO
  const [pesquisa, setPesquisa] = useState('')
  const [campoPesquisa, setCampoPesquisa] = useState('todos')
  const [ordenacao, setOrdenacao] = useState('nome')
  const [direcao, setDirecao] = useState('asc')
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [itensPorPagina, setItensPorPagina] = useState(20)

  // CARREGAR CANDIDATOS DO BANCO DE DADOS
  useEffect(() => {
    async function carregarCandidatos() {
      try {
        const resposta = await fetch(
          'http://127.0.0.1:3000/api/candidatos'
        )

        if (!resposta.ok) {
          throw new Error('Não foi possível carregar os candidatos.')
        }

        const dados = await resposta.json()
        setCandidatos(dados)
      } catch (erro) {
        setErro(erro.message)
      } finally {
        setCarregando(false)
      }
    }

    carregarCandidatos()
  }, [])

  // ATUALIZAR OS CAMPOS DO FORMULÁRIO
  function atualizarCampo(evento) {
    const { name, value } = evento.target

    setFormulario((dadosAtuais) => ({
      ...dadosAtuais,
      [name]: value
    }))
  }

  // ABRIR FORMULÁRIO PARA NOVO CANDIDATO
  function novoCandidato() {
    setCandidatoParaEditar(null)

    setFormulario({
      nome: '',
      email: '',
      telefone: '',
      cpf: '',
      endereco: ''
    })

    setMostrarFormulario(true)
  }

  // ABRIR FORMULÁRIO PARA EDITAR CANDIDATO
  function editarCandidato(candidato) {
    setCandidatoParaEditar(candidato)

    setFormulario({
      nome: candidato.nome,
      email: candidato.email,
      telefone: candidato.telefone,
      cpf: candidato.cpf,
      endereco: candidato.endereco
    })

    setMostrarFormulario(true)
  }

  // CANCELAR FORMULÁRIO
  function cancelarFormulario() {
    setMostrarFormulario(false)
    setCandidatoParaEditar(null)
  }

  // CADASTRAR OU EDITAR CANDIDATO
  async function salvarCandidato(evento) {
    evento.preventDefault()

    try {
      const estaEditando = Boolean(candidatoParaEditar)

      const url = estaEditando
        ? `http://127.0.0.1:3000/api/candidatos/${candidatoParaEditar.id}`
        : 'http://127.0.0.1:3000/api/candidatos'

      const resposta = await fetch(url, {
        method: estaEditando ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formulario)
      })

      if (!resposta.ok) {
        const dadosErro = await resposta.json()

        throw new Error(
          dadosErro.mensagem || 'Não foi possível salvar o candidato.'
        )
      }

      const candidatoSalvo = await resposta.json()

      if (estaEditando) {
        setCandidatos((listaAtual) =>
          listaAtual.map((candidato) =>
            candidato.id === candidatoSalvo.id
              ? candidatoSalvo
              : candidato
          )
        )
      } else {
        setCandidatos((listaAtual) => [
          candidatoSalvo,
          ...listaAtual
        ])
        setPaginaAtual(1)
      }

      setMostrarFormulario(false)
      setCandidatoParaEditar(null)

      setFormulario({
        nome: '',
        email: '',
        telefone: '',
        cpf: '',
        endereco: ''
      })

      alert(
        estaEditando
          ? 'Candidato atualizado com sucesso!'
          : 'Candidato cadastrado com sucesso!'
      )
    } catch (erro) {
      alert(erro.message)
    }
  }

  // EXCLUIR CANDIDATO
  async function excluirCandidato(id) {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir este candidato?'
    )

    if (!confirmar) {
      return
    }

    try {
      const resposta = await fetch(
        `http://127.0.0.1:3000/api/candidatos/${id}`,
        {
          method: 'DELETE'
        }
      )

      if (!resposta.ok) {
        const dadosErro = await resposta.json()

        throw new Error(
          dadosErro.mensagem || 'Não foi possível excluir o candidato.'
        )
      }

      setCandidatos((listaAtual) =>
        listaAtual.filter((candidato) => candidato.id !== id)
      )

      alert('Candidato excluído com sucesso!')
    } catch (erro) {
      alert(erro.message)
    }
  }

  // NORMALIZAR TEXTO PARA PESQUISA
  function normalizarTexto(texto) {
    return String(texto || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim()
  }

  // FILTRAR CANDIDATOS
  const candidatosFiltrados = candidatos.filter((candidato) => {
    const termo = normalizarTexto(pesquisa)

    if (!termo) {
      return true
    }

    if (campoPesquisa === 'todos') {
      return [
        candidato.nome,
        candidato.email,
        candidato.telefone,
        candidato.cpf,
        candidato.endereco
      ].some((valor) => normalizarTexto(valor).includes(termo))
    }

    return normalizarTexto(candidato[campoPesquisa]).includes(termo)
  })

  // ORDENAR CANDIDATOS
  const candidatosOrdenados = [...candidatosFiltrados].sort((a, b) => {
    const valorA = String(a[ordenacao] || '')
    const valorB = String(b[ordenacao] || '')

    const comparacao = valorA.localeCompare(valorB, 'pt-BR', {
      numeric: true,
      sensitivity: 'base'
    })

    return direcao === 'asc' ? comparacao : -comparacao
  })

  // CONFIGURAÇÃO DA PAGINAÇÃO
  const totalPaginas = Math.max(
    1,
    Math.ceil(candidatosOrdenados.length / itensPorPagina)
  )

  const paginaSegura = Math.min(paginaAtual, totalPaginas)

  const indiceInicial = (paginaSegura - 1) * itensPorPagina

  const candidatosPaginados = candidatosOrdenados.slice(
    indiceInicial,
    indiceInicial + itensPorPagina
  )

  // ALTERAR ORDENAÇÃO
  function alterarOrdenacao(campo) {
    if (ordenacao === campo) {
      setDirecao(direcao === 'asc' ? 'desc' : 'asc')
    } else {
      setOrdenacao(campo)
      setDirecao('asc')
    }
  }

  // TELA DE CARREGAMENTO
  if (carregando) {
    return (
      <section className="content-section">
        Carregando candidatos...
      </section>
    )
  }

  // TELA DE ERRO
  if (erro) {
    return (
      <section className="content-section">
        Erro: {erro}
      </section>
    )
  }

  // FORMULÁRIO DE CADASTRO OU EDIÇÃO
  if (mostrarFormulario) {
    return (
      <section className="content-section">
        <div className="vagas-header">
          <div>
            <h2>
              {candidatoParaEditar
                ? 'Editar candidato'
                : 'Cadastro de novo candidato'}
            </h2>
            <p>Preencha os dados do candidato.</p>
          </div>
        </div>

        <form className="form-vaga" onSubmit={salvarCandidato}>
          <div className="campo-formulario">
            <label htmlFor="nome">Nome completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formulario.nome}
              onChange={atualizarCampo}
              placeholder="Digite o nome completo"
              maxLength="150"
              required
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="email">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formulario.email}
              onChange={atualizarCampo}
              placeholder="exemplo@email.com"
              maxLength="150"
              required
            />
          </div>

          <div className="formulario-linha">
            <div className="campo-formulario">
              <label htmlFor="telefone">Telefone</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                value={formulario.telefone}
                onChange={atualizarCampo}
                placeholder="(41) 99999-9999"
                maxLength="20"
                required
              />
            </div>

            <div className="campo-formulario">
              <label htmlFor="cpf">CPF</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                value={formulario.cpf}
                onChange={atualizarCampo}
                placeholder="000.000.000-00"
                maxLength="14"
                required
              />
            </div>
          </div>

          <div className="campo-formulario">
            <label htmlFor="endereco">Endereço</label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              value={formulario.endereco}
              onChange={atualizarCampo}
              placeholder="Cidade, bairro e endereço"
              maxLength="255"
              required
            />
          </div>

          <div className="formulario-acoes">
            <button
              type="button"
              className="btn-cancelar"
              onClick={cancelarFormulario}
            >
              Cancelar
            </button>

            <button type="submit" className="btn-primary">
              {candidatoParaEditar
                ? 'Salvar alterações'
                : 'Salvar candidato'}
            </button>
          </div>
        </form>
      </section>
    )
  }

  // LISTAGEM DE CANDIDATOS
  return (
    <section className="content-section">
      <div className="vagas-header">
        <div>
          <h2>Candidatos cadastrados</h2>
          <p>Gerencie os candidatos registrados no sistema.</p>
        </div>

        <button className="btn-primary" onClick={novoCandidato}>
          + Novo candidato
        </button>
      </div>

      {/* PESQUISA E FILTROS */}
      <div className="formulario-linha">
        <div className="campo-formulario">
          <label htmlFor="pesquisaCandidato">
            Pesquisar candidatos
          </label>
          <input
            type="text"
            id="pesquisaCandidato"
            value={pesquisa}
            onChange={(evento) => {
              setPesquisa(evento.target.value)
              setPaginaAtual(1)
            }}
            placeholder="Digite o que deseja pesquisar..."
          />
        </div>

        <div className="campo-formulario">
          <label htmlFor="campoPesquisa">
            Pesquisar em
          </label>
          <select
            id="campoPesquisa"
            value={campoPesquisa}
            onChange={(evento) => {
              setCampoPesquisa(evento.target.value)
              setPaginaAtual(1)
            }}
          >
            <option value="todos">Todos os campos</option>
            <option value="nome">Nome</option>
            <option value="email">E-mail</option>
            <option value="telefone">Telefone</option>
            <option value="cpf">CPF</option>
            <option value="endereco">Endereço</option>
          </select>
        </div>
      </div>

      <p>
        Total de candidatos encontrados: {candidatosFiltrados.length}
      </p>

      <div className="table-container">
        <table className="vagas-table">
          <thead>
            <tr>
              <th
                onClick={() => alterarOrdenacao('nome')}
                style={{ cursor: 'pointer' }}
              >
                Nome {ordenacao === 'nome' && (direcao === 'asc' ? '↑' : '↓')}
              </th>

              <th
                onClick={() => alterarOrdenacao('email')}
                style={{ cursor: 'pointer' }}
              >
                E-mail {ordenacao === 'email' && (direcao === 'asc' ? '↑' : '↓')}
              </th>

              <th
                onClick={() => alterarOrdenacao('telefone')}
                style={{ cursor: 'pointer' }}
              >
                Telefone {ordenacao === 'telefone' && (direcao === 'asc' ? '↑' : '↓')}
              </th>

              <th
                onClick={() => alterarOrdenacao('cpf')}
                style={{ cursor: 'pointer' }}
              >
                CPF {ordenacao === 'cpf' && (direcao === 'asc' ? '↑' : '↓')}
              </th>

              <th
                onClick={() => alterarOrdenacao('endereco')}
                style={{ cursor: 'pointer' }}
              >
                Endereço {ordenacao === 'endereco' && (direcao === 'asc' ? '↑' : '↓')}
              </th>

              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {candidatosPaginados.map((candidato) => (
              <tr key={candidato.id}>
                <td>{candidato.nome}</td>
                <td>{candidato.email}</td>
                <td>{candidato.telefone}</td>
                <td>{candidato.cpf}</td>
                <td>{candidato.endereco}</td>

                <td>
                  <button
                    className="btn-action"
                    onClick={() => editarCandidato(candidato)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-action delete"
                    onClick={() => excluirCandidato(candidato.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}

            {candidatosPaginados.length === 0 && (
              <tr>
                <td colSpan="6">
                  Nenhum candidato encontrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* CONTROLES DE PAGINAÇÃO */}
      <div className="formulario-linha" style={{ marginTop: '20px' }}>
        <div className="campo-formulario">
          <label htmlFor="itensPorPagina">
            Itens por página
          </label>

          <select
            id="itensPorPagina"
            value={itensPorPagina}
            onChange={(evento) => {
              setItensPorPagina(Number(evento.target.value))
              setPaginaAtual(1)
            }}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <div className="formulario-acoes">
          <button
            type="button"
            className="btn-action"
            disabled={paginaSegura === 1}
            onClick={() => setPaginaAtual(paginaSegura - 1)}
          >
            Anterior
          </button>

          <span>
            Página {paginaSegura} de {totalPaginas}
          </span>

          <button
            type="button"
            className="btn-action"
            disabled={paginaSegura === totalPaginas}
            onClick={() => setPaginaAtual(paginaSegura + 1)}
          >
            Próxima
          </button>
        </div>
      </div>
    </section>
  )
}

export default Candidatos
