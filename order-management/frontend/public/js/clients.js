/**
 * OrderFlow — Página de Clientes
 */

if (!Auth.requireAuth()) throw new Error('Redirect');
Components.renderSidebar('clients');

// ─── Estado ─────────────────────────────────────────────────────
let state = {
  page: 1,
  limit: 20,
  search: '',
  sortBy: 'name',
  sortOrder: 'ASC',
  dateFrom: '',
  dateTo: '',
  selected: new Set(),
  total: 0,
  totalPages: 1,
};

let modalClient = null;
let modalDetail = null;
let detailClientId = null;

// ─── Inicialização ──────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  M.Modal.init(document.querySelectorAll('.modal'));
  modalClient = M.Modal.getInstance(document.getElementById('clientModal'));
  modalDetail = M.Modal.getInstance(document.getElementById('detailModal'));

  loadClients();
  setupEventListeners();
  setupSortableHeaders();
  const clientId = new URLSearchParams(window.location.search).get('id');
  if (clientId) openDetail(Number(clientId));
});

// ─── Carregamento de Dados ──────────────────────────────────────
async function loadClients() {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = `<tr><td colspan="6" class="center-align" style="padding:40px;">
    <div class="preloader-wrapper small active" style="display:block;margin:auto;">
      <div class="spinner-layer spinner-blue-only">
        <div class="circle-clipper left"><div class="circle"></div></div>
        <div class="gap-patch"><div class="circle"></div></div>
        <div class="circle-clipper right"><div class="circle"></div></div>
      </div>
    </div>
  </td></tr>`;

  try {
    const res = await Api.getQuery('/clients', {
      page: state.page,
      limit: state.limit,
      search: state.search,
      sortBy: state.sortBy,
      sortOrder: state.sortOrder,
      dateFrom: state.dateFrom,
      dateTo: state.dateTo,
    });

    const clients = res.data;
    state.total = res.meta.total;
    state.totalPages = res.meta.totalPages;

    renderTable(clients);
    Components.renderPagination('paginationContainer', res.meta, (p) => {
      state.page = p;
      loadClients();
    });
  } catch (err) {
    tbody.innerHTML = `<tr><td colspan="6" class="center-align">
      <div class="empty-state"><i class="material-icons">error_outline</i>Erro ao carregar: ${Components.escapeHtml(err.message)}</div>
    </td></tr>`;
  }
}

// ─── Renderização da Tabela ─────────────────────────────────────
function renderTable(clients) {
  const tbody = document.getElementById('tableBody');

  if (!clients || clients.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6">
      <div class="empty-state">
        <i class="material-icons">people_outline</i>
        <p>Nenhum cliente encontrado</p>
      </div>
    </td></tr>`;
    return;
  }

  tbody.innerHTML = clients.map((c) => `
    <tr data-id="${c.id}">
      <td><label><input type="checkbox" class="row-check" data-id="${c.id}" ${state.selected.has(c.id) ? 'checked' : ''} /><span></span></label></td>
      <td>
        <a href="/pages/clients.html?id=${Number(c.id)}" class="blue-text client-detail" data-id="${Number(c.id)}" style="font-weight:500;">${Components.escapeHtml(c.name)}</a>
        ${c.deleted_at ? '<span class="badge-low-stock" style="margin-left:4px;">Arquivado</span>' : ''}
      </td>
      <td>${Components.escapeHtml(Components.formatCpf(c.cpf))}</td>
      <td>${Components.escapeHtml(c.email)}</td>
      <td>${Components.formatDate(c.created_at)}</td>
      <td>
        <div class="actions">
          <button class="btn-icon view client-view" data-id="${c.id}" title="Ver detalhes"><i class="material-icons">visibility</i></button>
          <button class="btn-icon edit client-edit" data-id="${c.id}" title="Editar"><i class="material-icons">edit</i></button>
          <button class="btn-icon delete client-delete" data-id="${c.id}" title="Excluir"><i class="material-icons">delete</i></button>
        </div>
      </td>
    </tr>`).join('');

  // Associa eventos às linhas
  document.querySelectorAll('.row-check').forEach((cb) => {
    cb.addEventListener('change', () => {
      const id = parseInt(cb.dataset.id);
      cb.checked ? state.selected.add(id) : state.selected.delete(id);
      updateSelectionBar();
    });
  });

  document.querySelectorAll('.client-view, .client-detail').forEach((btn) => {
    btn.addEventListener('click', () => openDetail(parseInt(btn.dataset.id)));
  });
  document.querySelectorAll('.client-edit').forEach((btn) => {
    btn.addEventListener('click', () => openEdit(parseInt(btn.dataset.id)));
  });
  document.querySelectorAll('.client-delete').forEach((btn) => {
    btn.addEventListener('click', () => deleteClient(parseInt(btn.dataset.id)));
  });

  // Restaura a caixa de seleção de todos
  const selectAll = document.getElementById('selectAll');
  selectAll.checked = false;
}

// ─── Seleção ────────────────────────────────────────────────────
function updateSelectionBar() {
  const bar = document.getElementById('selectionBar');
  const count = state.selected.size;
  document.getElementById('selectionCount').textContent = `${count} selecionado(s)`;
  bar.classList.toggle('visible', count > 0);
}

// ─── Operações de CRUD ──────────────────────────────────────────
function openCreate() {
  document.getElementById('clientId').value = '';
  document.getElementById('clientForm').reset();
  document.getElementById('modalTitle').textContent = 'Novo Cliente';
  document.getElementById('formErrors').textContent = '';
  M.updateTextFields();
  modalClient.open();
}

async function openEdit(id) {
  try {
    const res = await Api.get(`/clients/${id}`);
    const c = res.data;
    document.getElementById('clientId').value = c.id;
    document.getElementById('fieldName').value = c.name;
    document.getElementById('fieldCpf').value = Components.formatCpf(c.cpf);
    document.getElementById('fieldEmail').value = c.email;
    document.getElementById('modalTitle').textContent = 'Editar Cliente';
    document.getElementById('formErrors').textContent = '';
    M.updateTextFields();
    modalClient.open();
  } catch (err) {
    Components.toast('Erro ao carregar cliente: ' + err.message, 'error');
  }
}

async function openDetail(id) {
  detailClientId = id;
  try {
    const res = await Api.get(`/clients/${id}`);
    const c = res.data;
    document.getElementById('detailBody').innerHTML = `
      <div class="detail-grid">
        <div class="detail-item"><label>Nome</label><div class="detail-value">${Components.escapeHtml(c.name)}</div></div>
        <div class="detail-item"><label>CPF</label><div class="detail-value">${Components.escapeHtml(Components.formatCpf(c.cpf))}</div></div>
        <div class="detail-item"><label>E-mail</label><div class="detail-value">${Components.escapeHtml(c.email)}</div></div>
        <div class="detail-item"><label>Cadastrado em</label><div class="detail-value">${Components.formatDateTime(c.created_at)}</div></div>
        <div class="detail-item"><label>Atualizado em</label><div class="detail-value">${Components.formatDateTime(c.updated_at)}</div></div>
        <div class="detail-item"><label>Status</label><div class="detail-value">${c.deleted_at ? '<span class="badge-low-stock">Arquivado</span>' : '<span style="color:#2e7d32">Ativo</span>'}</div></div>
      </div>
      <div style="margin-top:16px;">
        <a href="/pages/orders.html?clientId=${c.id}" class="btn btn-outline waves-effect" style="font-size:0.85rem;">
          <i class="material-icons left" style="font-size:1rem">receipt_long</i>Ver Pedidos
        </a>
      </div>`;
    modalDetail.open();
  } catch (err) {
    Components.toast('Erro: ' + err.message, 'error');
  }
}

async function saveClient() {
  const id = document.getElementById('clientId').value;
  const cpfRaw = document.getElementById('fieldCpf').value.replace(/\D/g, '');
  const data = {
    name: document.getElementById('fieldName').value.trim(),
    cpf: cpfRaw,
    email: document.getElementById('fieldEmail').value.trim(),
  };

  document.getElementById('formErrors').textContent = '';
  document.getElementById('btnSave').disabled = true;

  try {
    if (id) {
      await Api.put(`/clients/${id}`, data);
      Components.toast('Cliente atualizado com sucesso!', 'success');
    } else {
      await Api.post('/clients', data);
      Components.toast('Cliente criado com sucesso!', 'success');
    }
    modalClient.close();
    state.page = 1;
    loadClients();
  } catch (err) {
    if (err.errors) {
      document.getElementById('formErrors').textContent = err.errors.map((e) => e.message).join(', ');
    } else {
      document.getElementById('formErrors').textContent = err.message;
    }
  } finally {
    document.getElementById('btnSave').disabled = false;
  }
}

async function deleteClient(id) {
  const confirmed = await Components.confirm(
    'Excluir cliente?',
    'Clientes com pedidos vinculados serão arquivados. Esta ação não pode ser desfeita.',
    'danger'
  );
  if (!confirmed) return;

  try {
    await Api.delete(`/clients/${id}`);
    Components.toast('Cliente removido com sucesso!', 'success');
    state.selected.delete(id);
    updateSelectionBar();
    loadClients();
  } catch (err) {
    Components.toast('Erro: ' + err.message, 'error');
  }
}

async function bulkDelete() {
  const ids = [...state.selected];
  if (ids.length === 0) return;

  const confirmed = await Components.confirm(
    `Excluir ${ids.length} cliente(s)?`,
    'Clientes com pedidos vinculados serão arquivados.',
    'danger'
  );
  if (!confirmed) return;

  try {
    const res = await Api.delete('/clients/bulk', { ids });
    const r = res.data;
    Components.toast(`${r.deleted.length} cliente(s) removido(s).`, 'success');
    if (r.cannotDelete.length > 0) {
      Components.toast(`Não foi possível remover: ${r.cannotDelete.map((item) => `#${item.id}: ${item.reason}`).join('; ')}`, 'warning', 6000);
    }
    state.selected.clear();
    updateSelectionBar();
    loadClients();
  } catch (err) {
    Components.toast('Erro: ' + err.message, 'error');
  }
}

// ─── Ouvintes de Eventos ────────────────────────────────────────
function setupEventListeners() {
  document.getElementById('btnNew').addEventListener('click', openCreate);
  document.getElementById('btnSave').addEventListener('click', saveClient);
  document.getElementById('btnBulkDelete').addEventListener('click', bulkDelete);
  document.getElementById('btnClearSelection').addEventListener('click', () => {
    state.selected.clear();
    document.querySelectorAll('.row-check').forEach((cb) => (cb.checked = false));
    document.getElementById('selectAll').checked = false;
    updateSelectionBar();
  });

  document.getElementById('btnEditFromDetail').addEventListener('click', () => {
    modalDetail.close();
    if (detailClientId) openEdit(detailClientId);
  });

  // Selecionar todos
  document.getElementById('selectAll').addEventListener('change', (e) => {
    document.querySelectorAll('.row-check').forEach((cb) => {
      cb.checked = e.target.checked;
      const id = parseInt(cb.dataset.id);
      e.target.checked ? state.selected.add(id) : state.selected.delete(id);
    });
    updateSelectionBar();
  });

  // Pesquisa com atraso para evitar chamadas excessivas
  let searchTimer;
  document.getElementById('searchInput').addEventListener('input', (e) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.search = e.target.value;
      state.page = 1;
      loadClients();
    }, 400);
  });

  document.getElementById('sortBy').addEventListener('change', (e) => {
    state.sortBy = e.target.value;
    state.page = 1;
    loadClients();
  });

  document.getElementById('sortOrder').addEventListener('change', (e) => {
    state.sortOrder = e.target.value;
    state.page = 1;
    loadClients();
  });

  document.getElementById('limitSelect').addEventListener('change', (e) => {
    state.limit = parseInt(e.target.value);
    state.page = 1;
    loadClients();
  });

  ['dateFrom', 'dateTo'].forEach((id) => {
    document.getElementById(id).addEventListener('change', () => {
      state.dateFrom = document.getElementById('dateFrom').value;
      state.dateTo = document.getElementById('dateTo').value;
      if (state.dateFrom && state.dateTo && state.dateFrom > state.dateTo) {
        Components.toast('A data inicial deve ser anterior à data final.', 'warning');
        return;
      }
      state.page = 1;
      loadClients();
    });
  });

  // Máscara de CPF
  document.getElementById('fieldCpf').addEventListener('input', (e) => {
    let v = e.target.value.replace(/\D/g, '');
    if (v.length <= 11) {
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d)/, '$1.$2');
      v = v.replace(/(\d{3})(\d{2})$/, '$1-$2');
    }
    e.target.value = v;
  });
}

function setupSortableHeaders() {
  document.querySelectorAll('th.sortable').forEach((th) => {
    th.addEventListener('click', () => {
      const field = th.dataset.field;
      if (state.sortBy === field) {
        state.sortOrder = state.sortOrder === 'ASC' ? 'DESC' : 'ASC';
      } else {
        state.sortBy = field;
        state.sortOrder = 'ASC';
      }
      document.getElementById('sortBy').value = state.sortBy;
      document.getElementById('sortOrder').value = state.sortOrder;
      state.page = 1;
      loadClients();
    });
  });
}
