
function Sidebar({ paginaAtiva, mudarPagina }) {
  const itens = [
    { id: 'painel', nome: 'Painel inicial' },
    { id: 'vagas', nome: 'Vagas' },
    { id: 'candidatos', nome: 'Candidatos' },
    { id: 'inscricoes', nome: 'Inscrições' },
  ]

  return (
    <aside className="sidebar">
      <div className="brand">
        <h2>Portal RH</h2>
        <span>Recrutamento</span>
      </div>

      <nav>
        {itens.map((item) => (
          <a
            key={item.id}
            href="#"
            className={paginaAtiva === item.id ? 'active' : ''}
            onClick={(evento) => {
              evento.preventDefault()
              mudarPagina(item.id)
            }}
          >
            {item.nome}
          </a>
        ))}
      </nav>

      <div className="sidebar-footer">
        Sistema de Recrutamento
      </div>
    </aside>
  )
}

export default Sidebar
