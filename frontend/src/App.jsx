
import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import Vagas from './components/Vagas'
import Candidatos from './components/Candidatos'
import Inscricoes from './components/Inscricoes'
import './App.css'

function App() {
  const [paginaAtiva, setPaginaAtiva] = useState('painel')

  const [indicadores, setIndicadores] = useState({
    vagas: 0,
    vagasAbertas: 0,
    candidatos: 0,
    inscricoes: 0
  })

  useEffect(() => {
    async function carregarIndicadores() {
      try {
        const [resVagas, resCandidatos, resInscricoes] =
          await Promise.all([
            fetch('http://127.0.0.1:3000/api/vagas'),
            fetch('http://127.0.0.1:3000/api/candidatos'),
            fetch('http://127.0.0.1:3000/api/inscricoes')
          ])

        if (!resVagas.ok || !resCandidatos.ok || !resInscricoes.ok) {
          throw new Error('Erro ao consultar os dados do painel.')
        }

        const vagas = await resVagas.json()
        const candidatos = await resCandidatos.json()
        const inscricoes = await resInscricoes.json()

        setIndicadores({
          vagas: vagas.length,
          vagasAbertas: vagas.filter(
            vaga => vaga.status === 'Aberta'
          ).length,
          candidatos: candidatos.length,
          inscricoes: inscricoes.length
        })
      } catch (erro) {
        console.error('Erro ao carregar indicadores:', erro)
      }
    }

    carregarIndicadores()
  }, [])

  return (
    <div className="app">
      <Sidebar
        paginaAtiva={paginaAtiva}
        mudarPagina={setPaginaAtiva}
      />

      <main className="main-content">
        <header className="topbar">
          <div>
            <h1>
              {paginaAtiva === 'painel' && 'Painel inicial'}
              {paginaAtiva === 'vagas' && 'Gerenciamento de vagas'}
              {paginaAtiva === 'candidatos' && 'Gerenciamento de candidatos'}
              {paginaAtiva === 'inscricoes' && 'Gerenciamento de inscrições'}
            </h1>
            <p>Bem-vindo ao sistema de recrutamento.</p>
          </div>

          <div className="user-info">Administrador</div>
        </header>

        {paginaAtiva === 'painel' && (
          <>
            <section className="welcome">
              <h2>Visão geral</h2>
              <p>
                Acompanhe as vagas, os candidatos e as inscrições
                em um só lugar.
              </p>
            </section>

            <section className="dashboard-cards">
              <article className="card">
                <span>Vagas cadastradas</span>
                <strong>{indicadores.vagas}</strong>
                <small>Total de vagas no sistema</small>
              </article>

              <article className="card">
                <span>Vagas abertas</span>
                <strong>{indicadores.vagasAbertas}</strong>
                <small>Disponíveis para candidatura</small>
              </article>

              <article className="card">
                <span>Candidatos</span>
                <strong>{indicadores.candidatos}</strong>
                <small>Total de candidatos cadastrados</small>
              </article>

              <article className="card">
                <span>Inscrições</span>
                <strong>{indicadores.inscricoes}</strong>
                <small>Candidaturas realizadas</small>
              </article>
            </section>

            <section className="content-section">
              <h2>Bem-vindo ao Portal de Recrutamento</h2>
              <p>
                Utilize o menu lateral para gerenciar vagas,
                candidatos e inscrições.
              </p>
            </section>
          </>
        )}

        {paginaAtiva === 'vagas' && <Vagas />}
        {paginaAtiva === 'candidatos' && <Candidatos />}
        {paginaAtiva === 'inscricoes' && <Inscricoes />}
      </main>
    </div>
  )
}

export default App
