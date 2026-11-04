const PADRAO_LISTAGEM = { pagina: 1, limite: 20, ordenarPor: 'id', ordem: 'ASC', campo: '', busca: '' };

/**
 * Página de CRUD genérica:
 *  - listagem (#listagem) com busca por campo, ordenação pelo cabeçalho, paginação e exclusão em massa;
 *  - formulário em modal (#modalFormulario > form#formulario);
 *  - painel lateral com o detalhe do registro (clique na linha).
 *
 * colunas: [{ campo, titulo, numero?, classe?, formatar?(valor, registro) => texto | Node }]
 * acoes(registro): botões/links extras de cada linha.
 * detalhe(registro): async → { titulo, conteudo: Node[], acoes?: Node[] }
 *
 * O estado da listagem fica na URL (?busca=...&pagina=2). ?id=X abre o detalhe;
 * parâmetros com nome de campo viram filtros fixos (ex.: ?cliente_id=3).
 */
class CrudPage {
  constructor({ recurso, titulo, singular, colunas, acoes = () => [], detalhe }) {
    Object.assign(this, { recurso, titulo, singular, colunas, acoes, detalheConfig: detalhe });
    this.lerUrl();

    this.form = document.getElementById('formulario');
    this.botaoSalvar = this.form.querySelector('[type="submit"]');
    this.modalForm = M.Modal.init(document.getElementById('modalFormulario'), { endingTop: '5%' });
    this.form.addEventListener('submit', evento => {
      evento.preventDefault();
      this.salvar();
    });
    this.form.addEventListener('input', ({ target }) => {
      if (target.dataset.mascara) target.value = Mascara[target.dataset.mascara](target.value);
    });
    document.querySelector('[data-novo]').addEventListener('click', () => this.novo());

    this.montarListagem();
  }

  async iniciar() {
    await this.carregar();
    if (this.detalheId) await this.detalhar(this.detalheId);
  }

  // Chamado após qualquer alteração de dados (salvar, excluir...).
  async aoAlterar() {
    await this.carregar();
  }

  get rotulo() {
    return this.singular[0].toUpperCase() + this.singular.slice(1);
  }

  // ---------- Estado na URL ----------

  lerUrl() {
    const parametros = Object.fromEntries(new URLSearchParams(location.search));
    const { id, ...resto } = parametros;
    this.detalheId = id ?? null;
    this.estado = { ...PADRAO_LISTAGEM };
    this.filtrosFixos = {};
    for (const [chave, valor] of Object.entries(resto)) {
      if (chave in PADRAO_LISTAGEM) this.estado[chave] = typeof PADRAO_LISTAGEM[chave] === 'number' ? Number(valor) || PADRAO_LISTAGEM[chave] : valor;
      else this.filtrosFixos[chave] = valor;
    }
  }

  gravarUrl() {
    const parametros = new URLSearchParams(this.filtrosFixos);
    for (const [chave, valor] of Object.entries(this.estado)) {
      if (valor !== PADRAO_LISTAGEM[chave]) parametros.set(chave, valor);
    }
    if (this.detalheId) parametros.set('id', this.detalheId);
    history.replaceState(null, '', parametros.size ? `?${parametros}` : location.pathname);
  }

  // ---------- Listagem ----------

  montarListagem() {
    const container = document.getElementById('listagem');
    container.innerHTML = `
      <div class="ferramentas">
        <label class="busca">
          <span class="material-icons" aria-hidden="true">search</span>
          <input type="search" class="browser-default" data-busca placeholder="Buscar ${this.titulo.toLowerCase()}..." aria-label="Buscar">
        </label>
        <select class="browser-default" data-campo aria-label="Campo da busca">
          <option value="">Em todos os campos</option>
          ${this.colunas.map(coluna => `<option value="${coluna.campo}">${coluna.titulo}</option>`).join('')}
        </select>
        <span class="chip-filtro" data-filtro-fixo hidden></span>
        <button type="button" class="botao botao-perigo" data-excluir-selecionados disabled>
          <span class="material-icons" aria-hidden="true">delete_sweep</span><span data-contador></span>
        </button>
      </div>
      <div class="tabela-responsiva">
        <table>
          <thead>
            <tr>
              <th><label><input type="checkbox" data-selecionar-todos aria-label="Selecionar todos"><span></span></label></th>
              ${this.colunas.map(coluna => `
                <th class="ordenavel ${coluna.numero ? 'numero' : ''}" data-ordenar="${coluna.campo}" tabindex="0">${coluna.titulo}</th>`).join('')}
              <th class="numero"><span class="sr-only">Ações</span></th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
      <div class="paginacao">
        <span class="paginacao-info" data-info></span>
        <div class="paginacao-controles">
          <select class="browser-default" data-limite aria-label="Itens por página">
            ${[10, 20, 50, 100].map(n => `<option value="${n}">${n} por página</option>`).join('')}
          </select>
          <button type="button" class="botao-icone" data-anterior aria-label="Página anterior"><span class="material-icons" aria-hidden="true">chevron_left</span></button>
          <span class="paginacao-pagina" data-pagina-atual></span>
          <button type="button" class="botao-icone" data-proxima aria-label="Próxima página"><span class="material-icons" aria-hidden="true">chevron_right</span></button>
        </div>
      </div>`;

    const $ = seletor => container.querySelector(seletor);
    this.el = {
      corpo: $('tbody'), info: $('[data-info]'), pagina: $('[data-pagina-atual]'), contador: $('[data-contador]'),
      filtroFixo: $('[data-filtro-fixo]'), anterior: $('[data-anterior]'), proxima: $('[data-proxima]'),
      selecionarTodos: $('[data-selecionar-todos]'), excluirSelecionados: $('[data-excluir-selecionados]'),
      cabecalhos: container.querySelectorAll('[data-ordenar]')
    };

    const busca = $('[data-busca]');
    const campo = $('[data-campo]');
    const limite = $('[data-limite]');
    busca.value = this.estado.busca;
    campo.value = this.estado.campo;
    limite.value = this.estado.limite;

    let espera;
    busca.addEventListener('input', () => {
      clearTimeout(espera);
      espera = setTimeout(() => this.filtrar({ busca: busca.value.trim() }), 300);
    });
    campo.addEventListener('change', () => this.filtrar({ campo: campo.value }));
    limite.addEventListener('change', () => this.filtrar({ limite: Number(limite.value) }));
    this.el.anterior.addEventListener('click', () => this.irPara(this.estado.pagina - 1));
    this.el.proxima.addEventListener('click', () => this.irPara(this.estado.pagina + 1));
    this.el.cabecalhos.forEach(cabecalho => {
      const ordenar = () => this.ordenar(cabecalho.dataset.ordenar);
      cabecalho.addEventListener('click', ordenar);
      cabecalho.addEventListener('keydown', evento => evento.key === 'Enter' && ordenar());
    });
    this.el.selecionarTodos.addEventListener('change', () => {
      this.el.corpo.querySelectorAll('.selecao').forEach(caixa => { caixa.checked = this.el.selecionarTodos.checked; });
      this.atualizarSelecao();
    });
    this.el.excluirSelecionados.addEventListener('click', () => this.excluir(this.selecionados()));

    this.el.corpo.replaceChildren(...Array.from({ length: 6 }, () => this.linhaEsqueleto()));
    this.exibirFiltroFixo();
  }

  filtrar(alteracoes) {
    Object.assign(this.estado, alteracoes, { pagina: 1 });
    this.carregar();
  }

  irPara(pagina) {
    this.estado.pagina = pagina;
    this.carregar();
  }

  ordenar(campo) {
    const inverter = this.estado.ordenarPor === campo && this.estado.ordem === 'ASC';
    this.filtrar({ ordenarPor: campo, ordem: inverter ? 'DESC' : 'ASC' });
  }

  async carregar() {
    this.el.corpo.classList.add('carregando');
    try {
      const { dados, pagina, limite, totalPaginas, total } = await Api.listar(this.recurso, { ...this.filtrosFixos, ...this.estado });
      if (!dados.length && pagina > 1) return this.irPara(pagina - 1);

      this.el.corpo.replaceChildren(...(dados.length
        ? dados.map(registro => this.linha(registro))
        : [this.linhaVazia('search_off', 'Nenhum registro encontrado.')]));

      const inicio = total ? (pagina - 1) * limite + 1 : 0;
      this.el.info.textContent = `Mostrando ${inicio}–${Math.min(pagina * limite, total)} de ${Formatar.numero(total)}`;
      this.el.pagina.textContent = `Página ${pagina} de ${totalPaginas}`;
      this.el.anterior.disabled = pagina <= 1;
      this.el.proxima.disabled = pagina >= totalPaginas;
      this.el.cabecalhos.forEach(cabecalho => {
        const ativo = cabecalho.dataset.ordenar === this.estado.ordenarPor;
        cabecalho.setAttribute('aria-sort', ativo ? (this.estado.ordem === 'ASC' ? 'ascending' : 'descending') : 'none');
      });
      this.atualizarSelecao();
      this.gravarUrl();
    } catch (erro) {
      this.el.corpo.replaceChildren(this.linhaVazia('error_outline', 'Não foi possível carregar os registros.'));
      Layout.notificar(erro.message, true);
    } finally {
      this.el.corpo.classList.remove('carregando');
    }
  }

  linha(registro) {
    const caixa = Dom.criar('input', { type: 'checkbox', className: 'selecao', value: registro.id, ariaLabel: `Selecionar #${registro.id}` });
    caixa.addEventListener('change', () => this.atualizarSelecao());

    const celulas = this.colunas.map(({ campo, titulo, numero, classe = '', formatar }) => {
      const celula = Dom.criar('td', { className: `${numero ? 'numero' : ''} ${classe}` },
        formatar ? formatar(registro[campo], registro) : String(registro[campo] ?? '-'));
      celula.dataset.rotulo = titulo;
      return celula;
    });

    const linha = Dom.criar('tr', { className: 'clicavel', tabIndex: 0 },
      Dom.criar('td', {}, Dom.criar('label', {}, caixa, Dom.criar('span'))),
      ...celulas,
      Dom.criar('td', { className: 'acoes' },
        ...this.acoes(registro),
        Dom.botaoIcone('edit', `Editar ${this.singular}`, () => this.editar(registro.id)),
        Dom.botaoIcone('delete', `Excluir ${this.singular}`, () => this.excluir([registro.id]), 'perigo'))
    );

    const abrir = evento => !evento.target.closest('a, button, label, input') && this.detalhar(registro.id);
    linha.addEventListener('click', abrir);
    linha.addEventListener('keydown', evento => evento.key === 'Enter' && abrir(evento));
    return linha;
  }

  linhaVazia(icone, texto) {
    return Dom.criar('tr', {}, Dom.criar('td', { className: 'estado-vazio', colSpan: this.colunas.length + 2 }, Dom.icone(icone), texto));
  }

  linhaEsqueleto() {
    return Dom.criar('tr', {}, Array.from({ length: this.colunas.length + 2 }, () =>
      Dom.criar('td', {}, Dom.criar('span', { className: 'esqueleto' }))));
  }

  selecionados() {
    return [...this.el.corpo.querySelectorAll('.selecao:checked')].map(caixa => Number(caixa.value));
  }

  atualizarSelecao() {
    const caixas = [...this.el.corpo.querySelectorAll('.selecao')];
    const total = this.selecionados().length;
    caixas.forEach(caixa => caixa.closest('tr').classList.toggle('selecionada', caixa.checked));
    this.el.contador.textContent = `Excluir ${total} selecionado(s)`;
    this.el.excluirSelecionados.disabled = total === 0;
    this.el.selecionarTodos.checked = total > 0 && total === caixas.length;
  }

  rotuloFiltro(campo, valor) {
    return `${campo}: ${valor}`;
  }

  exibirFiltroFixo() {
    const filtros = Object.entries(this.filtrosFixos);
    this.el.filtroFixo.hidden = !filtros.length;
    if (!filtros.length) return;

    const remover = Dom.botaoIcone('close', 'Remover filtro', () => {
      this.filtrosFixos = {};
      this.exibirFiltroFixo();
      this.filtrar({});
    });
    this.el.filtroFixo.replaceChildren(filtros.map(([campo, valor]) => this.rotuloFiltro(campo, valor)).join(', '), remover);
  }

  // ---------- Detalhe ----------

  async detalhar(id) {
    try {
      const registro = await Api.buscar(this.recurso, id);
      const { titulo, conteudo, acoes = [] } = await this.detalheConfig(registro);
      this.detalheId = registro.id;
      this.gravarUrl();
      Layout.abrirPainel({
        sobretitulo: `${this.rotulo} #${registro.id}`,
        titulo,
        conteudo,
        acoes: [
          Dom.botao('delete', 'Excluir', () => this.excluir([registro.id]), 'botao-perigo'),
          Dom.criar('span', { className: 'espaco' }),
          ...acoes,
          Dom.botao('edit', 'Editar', () => this.editar(registro.id), 'botao-secundario')
        ],
        aoFechar: () => {
          this.detalheId = null;
          this.gravarUrl();
        }
      });
    } catch (erro) {
      Layout.notificar(erro.message, true);
    }
  }

  // ---------- Formulário ----------

  lerFormulario() {
    const { id, ...dados } = Object.fromEntries(new FormData(this.form));
    return dados;
  }

  preencherFormulario(registro) {
    for (const campo of this.form.elements) {
      if (!(campo.name in registro)) continue;
      const valor = registro[campo.name] ?? '';
      campo.value = campo.dataset.mascara ? Mascara[campo.dataset.mascara](valor) : valor;
    }
  }

  limparFormulario() {
    this.form.reset();
    this.form.elements.id.value = '';
  }

  abrirFormulario(titulo) {
    this.form.querySelector('[data-titulo-formulario]').textContent = titulo;
    Layout.fecharPainel();
    this.modalForm.open();
    setTimeout(() => this.form.querySelector('input:not([type="hidden"]), select')?.focus(), 250);
  }

  novo() {
    this.limparFormulario();
    this.abrirFormulario(`Novo ${this.singular}`);
  }

  async editar(id) {
    try {
      const registro = await Api.buscar(this.recurso, id);
      this.limparFormulario();
      this.preencherFormulario(registro);
      this.abrirFormulario(`Editar ${this.singular} #${registro.id}`);
    } catch (erro) {
      Layout.notificar(erro.message, true);
    }
  }

  async salvar() {
    const id = this.form.elements.id.value;
    const icone = this.botaoSalvar.querySelector('.material-icons');
    this.botaoSalvar.setAttribute('aria-busy', 'true');
    icone.textContent = 'autorenew';

    try {
      await Api.salvar(this.recurso, this.lerFormulario(), id);
      this.modalForm.close();
      Layout.notificar(`${this.rotulo} ${id ? 'atualizado' : 'cadastrado'} com sucesso.`);
      await this.aoAlterar();
    } catch (erro) {
      Layout.notificar(erro.message, true);
    } finally {
      this.botaoSalvar.removeAttribute('aria-busy');
      icone.textContent = 'check';
    }
  }

  async excluir(ids) {
    const texto = ids.length === 1 ? `Deseja excluir o ${this.singular} #${ids[0]}?` : `Deseja excluir ${ids.length} ${this.titulo.toLowerCase()}?`;
    if (!(await Layout.confirmar(texto))) return;

    try {
      await (ids.length === 1 ? Api.excluir(this.recurso, ids[0]) : Api.excluirVarios(this.recurso, ids));
      Layout.fecharPainel();
      Layout.notificar(ids.length === 1 ? `${this.rotulo} excluído com sucesso.` : `${ids.length} registros excluídos com sucesso.`);
      await this.aoAlterar();
    } catch (erro) {
      Layout.notificar(erro.message, true);
    }
  }
}
