
import { useEffect, useState } from 'react'

function Inscricoes() {
  const [inscricoes, setInscricoes] = useState([])
  const [candidatos, setCandidatos] = useState([])
  const [vagas, setVagas] = useState([])

  const [candidatoId, setCandidatoId] = useState('')
  const [vagaId, setVagaId] = useState('')
  const [carregando, setCarregando] = useState(false)

  const carregarDados = async () => {
    try {
      const [resInscricoes, resCandidatos, resVagas] =
        await Promise.all([
          fetch('http://127.0.0.1:3000/api/inscricoes'),
          fetch('http://127.0.0.1:3000/api/candidatos'),
          fetch('http://127.0.0.1:3000/api/vagas'),
        ])

      if (!resInscricoes.ok || !resCandidatos.ok || !resVagas.ok) {
        throw new Error('Não foi possível carregar os dados.')
      }

      const dadosInscricoes = await resInscricoes.json()
      const dadosCandidatos = await resCandidatos.json()
      const dadosVagas = await resVagas.json()

      setInscricoes(dadosInscricoes)
      setCandidatos(dadosCandidatos)
      setVagas(dadosVagas)
    } catch (erro) {
      console.error('Erro ao carregar inscrições:', erro)
      alert('Erro ao carregar os dados das inscrições.')
    }
  }

  useEffect(() => {
    carregarDados()
  }, [])

  const cadastrarInscricao = async (evento) => {
    evento.preventDefault()

    if (!candidatoId || !vagaId) {
      alert('Selecione um candidato e uma vaga.')
      return
    }

    setCarregando(true)

    try {
      const resposta = await fetch(
        'http://127.0.0.1:3000/api/inscricoes',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            candidato_id: Number(candidatoId),
            vaga_id: Number(vagaId),
          }),
        }
      )

      const resultado = await resposta.json()

      if (!resposta.ok) {
        throw new Error(resultado.mensagem || 'Erro ao cadastrar inscrição.')
      }

      alert('Inscrição cadastrada com sucesso!')

      setCandidatoId('')
      setVagaId('')

      await carregarDados()
    } catch (erro) {
      alert(erro.message)
    } finally {
      setCarregando(false)
    }
  }

  const atualizarStatus = async (id, novoStatus) => {
    try {
      const resposta = await fetch(
        `http://127.0.0.1:3000/api/inscricoes/${id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            status: novoStatus,
          }),
        }
      )

      const resultado = await resposta.json()

      if (!resposta.ok) {
        throw new Error(resultado.mensagem || 'Erro ao atualizar status.')
      }

      alert('Status da inscrição atualizado com sucesso!')

      await carregarDados()
    } catch (erro) {
      alert(erro.message)
    }
  }

  const excluirInscricao = async (id) => {
    const confirmar = window.confirm(
      'Tem certeza que deseja excluir esta inscrição?'
    )

    if (!confirmar) return

    try {
      const resposta = await fetch(
        `http://127.0.0.1:3000/api/inscricoes/${id}`,
        {
          method: 'DELETE',
        }
      )

      const resultado = await resposta.json()

      if (!resposta.ok) {
        throw new Error(resultado.mensagem || 'Erro ao excluir inscrição.')
      }

      alert('Inscrição excluída com sucesso!')

      await carregarDados()
    } catch (erro) {
      alert(erro.message)
    }
  }

  const vagasAbertas = vagas.filter(
    (vaga) => vaga.status === 'Aberta'
  )

  const formatarData = (data) => {
    if (!data) return '-'

    return new Date(data).toLocaleDateString('pt-BR')
  }

  return (
    <section className="content-section">
      <div className="vagas-header">
        <div>
          <h2>Gerenciamento de inscrições</h2>
          <p>Cadastre e acompanhe as inscrições dos candidatos.</p>
        </div>
      </div>

      <form className="form-vaga" onSubmit={cadastrarInscricao}>
        <h3>Nova inscrição</h3>

        <div className="formulario-linha">
          <div className="campo-formulario">
            <label htmlFor="candidato">Candidato</label>

            <select
              id="candidato"
              value={candidatoId}
              onChange={(evento) => setCandidatoId(evento.target.value)}
              required
            >
              <option value="">Selecione um candidato</option>

              {candidatos.map((candidato) => (
                <option key={candidato.id} value={candidato.id}>
                  {candidato.nome}
                </option>
              ))}
            </select>
          </div>

          <div className="campo-formulario">
            <label htmlFor="vaga">Vaga disponível</label>

            <select
              id="vaga"
              value={vagaId}
              onChange={(evento) => setVagaId(evento.target.value)}
              required
            >
              <option value="">Selecione uma vaga</option>

              {vagasAbertas.map((vaga) => (
                <option key={vaga.id} value={vaga.id}>
                  {vaga.titulo} - {vaga.tipo}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="formulario-acoes">
          <button
            type="submit"
            className="btn-primary"
            disabled={carregando}
          >
            {carregando ? 'Cadastrando...' : 'Cadastrar inscrição'}
          </button>
        </div>
      </form>

      <div className="table-container">
        <table className="vagas-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Candidato</th>
              <th>E-mail</th>
              <th>Vaga</th>
              <th>Tipo</th>
              <th>Data</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {inscricoes.length === 0 ? (
              <tr>
                <td colSpan="8">
                  Nenhuma inscrição cadastrada.
                </td>
              </tr>
            ) : (
              inscricoes.map((inscricao) => (
                <tr key={inscricao.id}>
                  <td>{inscricao.id}</td>
                  <td>{inscricao.candidato}</td>
                  <td>{inscricao.email}</td>
                  <td>{inscricao.vaga}</td>
                  <td>{inscricao.tipo_contratacao}</td>
                  <td>{formatarData(inscricao.data_inscricao)}</td>

                  <td>
                    <select
                      value={inscricao.status}
                      onChange={(evento) =>
                        atualizarStatus(inscricao.id, evento.target.value)
                      }
                    >
                      <option value="Em análise">Em análise</option>
                      <option value="Aprovado">Aprovado</option>
                      <option value="Reprovado">Reprovado</option>
                    </select>
                  </td>

                  <td>
                    <button
                      type="button"
                      className="btn-action"
                      onClick={() => excluirInscricao(inscricao.id)}
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default Inscricoes
