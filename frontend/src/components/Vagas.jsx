
import { useState, useEffect } from 'react'
import FormularioVaga from './FormularioVaga'

function Vagas() {
  const [vagas, setVagas] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState('')
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [vagaParaEditar, setVagaParaEditar] = useState(null)

  // ESTADOS DOS FILTROS E DA PAGINAÇÃO
  const [pesquisa, setPesquisa] = useState('')
  const [filtroTipo, setFiltroTipo] = useState('')
  const [filtroStatus, setFiltroStatus] = useState('')
  const [ordenacao, setOrdenacao] = useState('id')
  const [direcao, setDirecao] = useState('desc')
  const [paginaAtual, setPaginaAtual] = useState(1)
  const [itensPorPagina, setItensPorPagina] = useState(20)

  // CARREGAR VAGAS DO BANCO DE DADOS
  useEffect(() => {
    async function carregarVagas() {
      try {
        const resposta = await fetch('http://127.0.0.1:3000/api/vagas')

        if (!resposta.ok) {
          throw new Error('Não foi possível carregar as vagas.')
        }

        const dados = await resposta.json()

        setVagas(
          dados.map((vaga) => ({
            ...vaga,
            local: vaga.local_trabalho,
          }))
        )
      } catch (erro) {
        setErro(erro.message)
      } finally {
        setCarregando(false)
      }
    }

    carregarVagas()
  }, [])

  // CADASTRAR OU EDITAR UMA VAGA
  async function salvarVaga(vagaRecebida) {
    try {
      const estaEditando = Boolean(vagaParaEditar)

      const url = estaEditando
        ? `http://127.0.0.1:3000/api/vagas/${vagaRecebida.id}`
        : 'http://127.0.0.1:3000/api/vagas'

      const resposta = await fetch(url, {
        method: estaEditando ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vagaRecebida),
      })

      if (!resposta.ok) {
        const dadosErro = await resposta.json()
        throw new Error(
          dadosErro.mensagem || 'Não foi possível salvar a vaga.'
        )
      }

      const vagaSalva = await resposta.json()

      const vagaFormatada = {
        ...vagaSalva,
        local: vagaSalva.local_trabalho,
      }

      if (estaEditando) {
        setVagas((listaAtual) =>
          listaAtual.map((vaga) =>
            vaga.id === vagaFormatada.id ? vagaFormatada : vaga
          )
        )
      } else {
        setVagas((listaAtual) => [
          vagaFormatada,
          ...listaAtual,
        ])
        setPaginaAtual(1)
      }

      setMostrarFormulario(false)
      setVagaParaEditar(null)

      alert(
        estaEditando
          ? 'Vaga atualizada com sucesso!'
          : 'Vaga cadastrada com sucesso!'
      )
    } catch (erro) {
      alert(erro.message)
    }
  }

  // EXCLUIR UMA VAGA DO BANCO DE DADOS
  async function excluirVaga(id) {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir esta vaga?'
    )

    if (!confirmar) return

    try {
      const resposta = await fetch(
        `http://127.0.0.1:3000/api/vagas/${id}`,
        {
          method: 'DELETE',
        }
      )

      if (!resposta.ok) {
        const dadosErro = await resposta.json()
        throw new Error(
          dadosErro.mensagem || 'Não foi possível excluir a vaga.'
        )
      }

      setVagas((listaAtual) =>
        listaAtual.filter((vaga) => vaga.id !== id)
      )

      alert('Vaga excluída com sucesso!')
    } catch (erro) {
      alert(erro.message)
    }
  }

  // EDITAR UMA VAGA
  function editarVaga(vaga) {
    setVagaParaEditar(vaga)
    setMostrarFormulario(true)
  }

  // ABRIR FORMULÁRIO DE NOVA VAGA
  function novaVaga() {
    setVagaParaEditar(null)
    setMostrarFormulario(true)
  }

  // CANCELAR FORMULÁRIO
  function cancelarFormulario() {
    setMostrarFormulario(false)
    setVagaParaEditar(null)
  }

  // PAUSAR OU REABRIR UMA VAGA
  async function alternarStatus(vaga) {
    const novoStatus = vaga.status === 'Aberta'
      ? 'Pausada'
      : 'Aberta'

    const dadosAtualizados = {
      titulo: vaga.titulo,
      descricao: vaga.descricao,
      tipo: vaga.tipo,
      salario: vaga.salario,
      local: vaga.local,
      status: novoStatus,
    }

    try {
      const resposta = await fetch(
        `http://127.0.0.1:3000/api/vagas/${vaga.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dadosAtualizados),
        }
      )

      if (!resposta.ok) {
        const dadosErro = await resposta.json()
        throw new Error(
          dadosErro.mensagem || 'Não foi possível alterar o status.'
        )
      }

      const vagaAtualizada = await resposta.json()

      const vagaFormatada = {
        ...vagaAtualizada,
        local: vagaAtualizada.local_trabalho,
      }

      setVagas((listaAtual) =>
        listaAtual.map((item) =>
          item.id === vagaFormatada.id ? vagaFormatada : item
        )
      )

      alert(`Vaga ${novoStatus.toLowerCase()} com sucesso!`)
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
  }

  // FILTRAR VAGAS
  const vagasFiltradas = vagas.filter((vaga) => {
    const termo = normalizarTexto(pesquisa)

    const correspondePesquisa =
      normalizarTexto(vaga.titulo).includes(termo) ||
      normalizarTexto(vaga.local).includes(termo)

    const correspondeTipo =
      filtroTipo === '' || vaga.tipo === filtroTipo

    const correspondeStatus =
      filtroStatus === '' || vaga.status === filtroStatus

    return (
      correspondePesquisa &&
      correspondeTipo &&
      correspondeStatus
    )
  })

  // ORDENAR VAGAS
  const vagasOrdenadas = [...vagasFiltradas].sort((a, b) => {
    let valorA = a[ordenacao]
    let valorB = b[ordenacao]

    if (ordenacao === 'salario' || ordenacao === 'id') {
      valorA = Number(valorA) || 0
      valorB = Number(valorB) || 0
    } else {
      valorA = normalizarTexto(valorA)
      valorB = normalizarTexto(valorB)
    }

    let resultado

    if (valorA < valorB) {
      resultado = -1
    } else if (valorA > valorB) {
      resultado = 1
    } else {
      resultado = 0
    }

    return direcao === 'asc' ? resultado : -resultado
  })

  // PAGINAÇÃO
  const totalPaginas = Math.max(
    1,
    Math.ceil(vagasOrdenadas.length / itensPorPagina)
  )

  const vagasExibidas = vagasOrdenadas.slice(
    (paginaAtual - 1) * itensPorPagina,
    paginaAtual * itensPorPagina
  )

  const primeiroRegistro =
    vagasOrdenadas.length === 0
      ? 0
      : (paginaAtual - 1) * itensPorPagina + 1

  const ultimoRegistro = Math.min(
    paginaAtual * itensPorPagina,
    vagasOrdenadas.length
  )

  // ALTERAR ORDENAÇÃO
  function alterarOrdenacao(campo) {
    if (ordenacao === campo) {
      setDirecao(direcao === 'asc' ? 'desc' : 'asc')
    } else {
      setOrdenacao(campo)
      setDirecao('asc')
    }

    setPaginaAtual(1)
  }

  // LIMPAR FILTROS
  function limparFiltros() {
    setPesquisa('')
    setFiltroTipo('')
    setFiltroStatus('')
    setPaginaAtual(1)
  }

  // TELA DE CARREGAMENTO
  if (carregando) {
    return (
      <section className="content-section">
        Carregando vagas...
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
      <FormularioVaga
        aoSalvar={salvarVaga}
        aoCancelar={cancelarFormulario}
        vagaParaEditar={vagaParaEditar}
      />
    )
  }

  // LISTAGEM DE VAGAS
  return (
    <section className="content-section">
      <div className="vagas-header">
        <div>
          <h2>Vagas cadastradas</h2>
          <p>Gerencie as oportunidades disponíveis.</p>
        </div>

        <button className="btn-primary" onClick={novaVaga}>
          + Nova vaga
        </button>
      </div>

      {/* FILTROS */}
      <div className="form-vaga">
        <h3>Pesquisar e filtrar vagas</h3>

        <div className="formulario-linha">
          <div className="campo-formulario">
            <label htmlFor="pesquisa-vaga">
              Pesquisar por título ou local
            </label>

            <input
              id="pesquisa-vaga"
              type="text"
              placeholder="Digite o título ou local..."
              value={pesquisa}
              onChange={(evento) => {
                setPesquisa(evento.target.value)
                setPaginaAtual(1)
              }}
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="filtro-tipo">
              Tipo de contratação
            </label>

            <select
              id="filtro-tipo"
              value={filtroTipo}
              onChange={(evento) => {
                setFiltroTipo(evento.target.value)
                setPaginaAtual(1)
              }}
            >
              <option value="">Todos os tipos</option>
              <option value="CLT">CLT</option>
              <option value="PJ">PJ</option>
              <option value="Freelancer">Freelancer</option>
            </select>
          </div>

          <div className="campo-formulario">
            <label htmlFor="filtro-status">
              Situação da vaga
            </label>

            <select
              id="filtro-status"
              value={filtroStatus}
              onChange={(evento) => {
                setFiltroStatus(evento.target.value)
                setPaginaAtual(1)
              }}
            >
              <option value="">Todas as situações</option>
              <option value="Aberta">Aberta</option>
              <option value="Pausada">Pausada</option>
            </select>
          </div>
        </div>

        <div className="formulario-acoes">
          <button
            type="button"
            className="btn-action"
            onClick={limparFiltros}
          >
            Limpar filtros
          </button>
        </div>
      </div>

      {/* QUANTIDADE DE REGISTROS */}
      <div className="formulario-linha">
        <div className="campo-formulario">
          <label htmlFor="itens-pagina">
            Registros por página
          </label>

          <select
            id="itens-pagina"
            value={itensPorPagina}
            onChange={(evento) => {
              setItensPorPagina(Number(evento.target.value))
              setPaginaAtual(1)
            }}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="vagas-table">
          <thead>
            <tr>
              <th>
                <button className="btn-action" onClick={() => alterarOrdenacao('titulo')}>
                  Vaga {ordenacao === 'titulo' && (direcao === 'asc' ? '↑' : '↓')}
                </button>
              </th>

              <th>
                <button className="btn-action" onClick={() => alterarOrdenacao('tipo')}>
                  Contratação {ordenacao === 'tipo' && (direcao === 'asc' ? '↑' : '↓')}
                </button>
              </th>

              <th>
                <button className="btn-action" onClick={() => alterarOrdenacao('salario')}>
                  Salário {ordenacao === 'salario' && (direcao === 'asc' ? '↑' : '↓')}
                </button>
              </th>

              <th>
                <button className="btn-action" onClick={() => alterarOrdenacao('local')}>
                  Local {ordenacao === 'local' && (direcao === 'asc' ? '↑' : '↓')}
                </button>
              </th>

              <th>
                <button className="btn-action" onClick={() => alterarOrdenacao('status')}>
                  Status {ordenacao === 'status' && (direcao === 'asc' ? '↑' : '↓')}
                </button>
              </th>

              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {vagasExibidas.map((vaga) => (
              <tr key={vaga.id}>
                <td>{vaga.titulo}</td>
                <td>{vaga.tipo}</td>

                <td>
                  {Number(vaga.salario).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </td>

                <td>{vaga.local}</td>

                <td>
                  <span className={`status ${vaga.status.toLowerCase()}`}>
                    {vaga.status}
                  </span>
                </td>

                <td>
                  <button
                    className="btn-action"
                    onClick={() => editarVaga(vaga)}
                  >
                    Editar
                  </button>

                  <button
                    className="btn-action"
                    onClick={() => alternarStatus(vaga)}
                  >
                    {vaga.status === 'Aberta' ? 'Pausar' : 'Reabrir'}
                  </button>

                  <button
                    className="btn-action delete"
                    onClick={() => excluirVaga(vaga.id)}
                  >
                    Excluir
                  </button>
                </td>
              </tr>
            ))}

            {vagasExibidas.length === 0 && (
              <tr>
                <td colSpan="6">
                  Nenhuma vaga encontrada com os filtros selecionados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* INFORMAÇÕES E CONTROLES DA PAGINAÇÃO */}
      <div className="formulario-linha">
        <p>
          Exibindo {primeiroRegistro} a {ultimoRegistro} de{' '}
          {vagasOrdenadas.length} vagas.
        </p>

        <div className="formulario-acoes">
          <button
            type="button"
            className="btn-action"
            disabled={paginaAtual === 1}
            onClick={() => setPaginaAtual(paginaAtual - 1)}
          >
            Anterior
          </button>

          <span>
            Página {paginaAtual} de {totalPaginas}
          </span>

          <button
            type="button"
            className="btn-action"
            disabled={paginaAtual === totalPaginas}
            onClick={() => setPaginaAtual(paginaAtual + 1)}
          >
            Próxima
          </button>
        </div>
      </div>
    </section>
  )
}

export default Vagas
