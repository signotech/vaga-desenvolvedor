
function FormularioVaga({ aoSalvar, aoCancelar, vagaParaEditar }) {
  function handleSubmit(evento) {
    evento.preventDefault()

    const formulario = evento.target

    const vaga = {
      id: vagaParaEditar ? vagaParaEditar.id : Date.now(),
      titulo: formulario.titulo.value,
      descricao: formulario.descricao.value,
      tipo: formulario.tipo.value,
      salario: formulario.salario.value,
      local: formulario.local.value,
      status: formulario.status.value,
    }

    aoSalvar(vaga)
  }

  return (
    <section className="content-section">
      <div className="vagas-header">
        <div>
          <h2>{vagaParaEditar ? 'Editar vaga' : 'Cadastro de nova vaga'}</h2>
          <p>Preencha os dados da oportunidade.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="form-vaga">
        <div className="campo-formulario">
          <label htmlFor="titulo">Título da vaga</label>
          <input
            type="text"
            id="titulo"
            name="titulo"
            defaultValue={vagaParaEditar?.titulo || ''}
            placeholder="Ex.: Assistente de TI"
            required
          />
        </div>

        <div className="campo-formulario">
          <label htmlFor="descricao">Descrição</label>
          <textarea
            id="descricao"
            name="descricao"
            defaultValue={vagaParaEditar?.descricao || ''}
            placeholder="Descreva as atividades da vaga"
            rows="4"
            required
          />
        </div>

        <div className="formulario-linha">
          <div className="campo-formulario">
            <label htmlFor="tipo">Tipo de contratação</label>
            <select
              id="tipo"
              name="tipo"
              defaultValue={vagaParaEditar?.tipo || ''}
              required
            >
              <option value="">Selecione</option>
              <option value="CLT">CLT</option>
              <option value="PJ">PJ</option>
              <option value="Freelancer">Freelancer</option>
            </select>
          </div>

          <div className="campo-formulario">
            <label htmlFor="salario">Salário (R$)</label>
            <input
              type="number"
              id="salario"
              name="salario"
              defaultValue={vagaParaEditar?.salario || ''}
              placeholder="Ex.: 2500"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>

        <div className="formulario-linha">
          <div className="campo-formulario">
            <label htmlFor="local">Local de trabalho</label>
            <input
              type="text"
              id="local"
              name="local"
              defaultValue={vagaParaEditar?.local || ''}
              placeholder="Ex.: Curitiba - PR"
              required
            />
          </div>

          <div className="campo-formulario">
            <label htmlFor="status">Status da vaga</label>
            <select
              id="status"
              name="status"
              defaultValue={vagaParaEditar?.status || 'Aberta'}
              required
            >
              <option value="Aberta">Aberta</option>
              <option value="Pausada">Pausada</option>
            </select>
          </div>
        </div>

        <div className="formulario-acoes">
          <button type="button" className="btn-cancelar" onClick={aoCancelar}>
            Cancelar
          </button>

          <button type="submit" className="btn-primary">
            {vagaParaEditar ? 'Salvar alterações' : 'Salvar vaga'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default FormularioVaga
