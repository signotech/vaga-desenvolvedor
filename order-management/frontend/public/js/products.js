/**
 * OrderFlow — Página de Produtos
 */

if (!Auth.requireAuth()) throw new Error('Redirect');
Components.renderSidebar('products');

const state = {
  page: 1,
  limit: 20,
  search: '',
  sortBy: 'title',
  sortOrder: 'ASC',
  priceMin: '',
  priceMax: '',
  stockMin: '',
  stockMax: '',
  lowStock: false,
  selected: new Set(),
};

let productModal;
let detailModal;
let detailProductId;
let searchTimer;

document.addEventListener('DOMContentLoaded', () => {
  M.Modal.init(document.querySelectorAll('.modal'));
  productModal = M.Modal.getInstance(document.getElementById('productModal'));
  detailModal = M.Modal.getInstance(document.getElementById('detailModal'));
  wireEvents();
  if (new URLSearchParams(window.location.search).get('lowStock') === 'true') {
    state.lowStock = true;
    document.getElementById('lowStock').checked = true;
  }
  loadProducts();

  const productId = new URLSearchParams(window.location.search).get('id');
  if (productId) openDetail(Number(productId));
});

function queryParams() {
  return {
    page: state.page,
    limit: state.limit,
    search: state.search,
    sortBy: state.sortBy,
    sortOrder: state.sortOrder,
    priceMin: state.priceMin,
    priceMax: state.priceMax,
    stockMin: state.stockMin,
    stockMax: state.stockMax,
    lowStock: state.lowStock ? true : '',
  };
}

async function loadProducts() {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state">Carregando produtos…</div></td></tr>';
  try {
    const response = await Api.getQuery('/products', queryParams());
    renderProducts(response.data || []);
    Components.renderPagination('paginationContainer', response.meta, (page) => {
      state.page = page;
      loadProducts();
    });
  } catch (error) {
    tbody.innerHTML = `<tr><td colspan="6"><div class="empty-state">${Components.escapeHtml(error.message)}</div></td></tr>`;
  }
}

function renderProducts(products) {
  const tbody = document.getElementById('tableBody');
  if (!products.length) {
    tbody.innerHTML = '<tr><td colspan="6"><div class="empty-state"><i class="material-icons">inventory_2</i><p>Nenhum produto encontrado</p></div></td></tr>';
    return;
  }

  tbody.innerHTML = products.map((product) => {
    const id = Number(product.id);
    const stock = Number(product.stock);
    const stockLabel = stock <= 5
      ? `<span class="badge-low-stock">${stock} — baixo</span>`
      : String(stock);
    return `<tr>
      <td><label><input type="checkbox" class="row-check" data-id="${id}" ${state.selected.has(id) ? 'checked' : ''} /><span></span></label></td>
      <td>${Components.escapeHtml(product.sku)}</td>
      <td><a href="/pages/products.html?id=${id}" class="blue-text">${Components.escapeHtml(product.title)}</a></td>
      <td>${Components.formatCurrency(product.price)}</td>
      <td>${stockLabel}</td>
      <td><div class="actions">
        <a class="btn-icon view" href="/pages/products.html?id=${id}" aria-label="Ver produto"><i class="material-icons">visibility</i></a>
        <button class="btn-icon edit" data-action="edit" data-id="${id}" aria-label="Editar produto"><i class="material-icons">edit</i></button>
        <button class="btn-icon delete" data-action="delete" data-id="${id}" aria-label="Excluir produto"><i class="material-icons">delete</i></button>
      </div></td>
    </tr>`;
  }).join('');

  tbody.querySelectorAll('.row-check').forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const id = Number(checkbox.dataset.id);
      checkbox.checked ? state.selected.add(id) : state.selected.delete(id);
      updateSelection();
    });
  });
  tbody.querySelectorAll('[data-action="edit"]').forEach((button) => {
    button.addEventListener('click', () => openEdit(Number(button.dataset.id)));
  });
  tbody.querySelectorAll('[data-action="delete"]').forEach((button) => {
    button.addEventListener('click', () => deleteProduct(Number(button.dataset.id)));
  });
  document.getElementById('selectAll').checked = false;
  updateSelection();
}

function updateSelection() {
  document.getElementById('selectionCount').textContent = `${state.selected.size} selecionado(s)`;
  document.getElementById('selectionBar').classList.toggle('visible', state.selected.size > 0);
}

function openCreate() {
  document.getElementById('productForm').reset();
  document.getElementById('productId').value = '';
  document.getElementById('modalTitle').textContent = 'Novo Produto';
  document.getElementById('formErrors').textContent = '';
  M.updateTextFields();
  productModal.open();
}

async function openEdit(id) {
  try {
    const { data: product } = await Api.get(`/products/${id}`);
    document.getElementById('productId').value = product.id;
    document.getElementById('fieldSku').value = product.sku;
    document.getElementById('fieldTitle').value = product.title;
    document.getElementById('fieldPrice').value = product.price;
    document.getElementById('fieldStock').value = product.stock;
    document.getElementById('modalTitle').textContent = 'Editar Produto';
    document.getElementById('formErrors').textContent = '';
    M.updateTextFields();
    productModal.open();
  } catch (error) {
    Components.toast(`Não foi possível carregar o produto: ${error.message}`, 'error');
  }
}

async function openDetail(id) {
  if (!Number.isInteger(id) || id < 1) return;
  detailProductId = id;
  try {
    const { data: product } = await Api.get(`/products/${id}`);
    document.getElementById('detailBody').innerHTML = `<div class="detail-grid">
      <div class="detail-item"><label>SKU</label><div class="detail-value">${Components.escapeHtml(product.sku)}</div></div>
      <div class="detail-item"><label>Título</label><div class="detail-value">${Components.escapeHtml(product.title)}</div></div>
      <div class="detail-item"><label>Preço</label><div class="detail-value">${Components.formatCurrency(product.price)}</div></div>
      <div class="detail-item"><label>Estoque</label><div class="detail-value">${Number(product.stock)}</div></div>
      <div class="detail-item"><label>Cadastrado em</label><div class="detail-value">${Components.formatDateTime(product.created_at)}</div></div>
      <div class="detail-item"><label>Atualizado em</label><div class="detail-value">${Components.formatDateTime(product.updated_at)}</div></div>
    </div>`;
    detailModal.open();
  } catch (error) {
    Components.toast(`Não foi possível carregar o produto: ${error.message}`, 'error');
  }
}

async function saveProduct() {
  const id = document.getElementById('productId').value;
  const formErrors = document.getElementById('formErrors');
  const button = document.getElementById('btnSave');
  const price = Number(document.getElementById('fieldPrice').value);
  const stock = Number(document.getElementById('fieldStock').value);
  const stockValue = document.getElementById('fieldStock').value.trim();
  const priceValue = document.getElementById('fieldPrice').value.trim();
  const product = {
    sku: document.getElementById('fieldSku').value.trim(),
    title: document.getElementById('fieldTitle').value.trim(),
    price,
    stock,
  };
  formErrors.textContent = '';

  if (!product.sku || !product.title || !priceValue || !Number.isFinite(price) || price <= 0 ||
      Math.abs(price * 100 - Math.round(price * 100)) > Number.EPSILON * 10 ||
      !stockValue ||
      !Number.isInteger(stock) || stock < 0) {
    formErrors.textContent = 'Informe SKU, título, preço maior que zero e estoque inteiro não negativo.';
    return;
  }

  button.disabled = true;
  try {
    if (id) {
      await Api.put(`/products/${id}`, product);
      Components.toast('Produto atualizado com sucesso.', 'success');
    } else {
      await Api.post('/products', product);
      Components.toast('Produto cadastrado com sucesso.', 'success');
    }
    productModal.close();
    state.page = 1;
    await loadProducts();
  } catch (error) {
    formErrors.textContent = error.errors
      ? error.errors.map((item) => item.message).join(', ')
      : error.message;
  } finally {
    button.disabled = false;
  }
}

async function deleteProduct(id) {
  if (!await Components.confirm('Excluir produto?', 'Produtos vinculados a pedidos serão arquivados para preservar o histórico.')) return;
  try {
    const response = await Api.delete(`/products/${id}`);
    Components.toast(response.message || 'Produto removido.', 'success');
    state.selected.delete(id);
    await loadProducts();
  } catch (error) {
    Components.toast(`Não foi possível excluir o produto: ${error.message}`, 'error');
  }
}

async function bulkDelete() {
  const ids = [...state.selected];
  if (!ids.length) return;
  if (!await Components.confirm(`Excluir ${ids.length} produto(s)?`, 'Produtos vinculados a pedidos serão arquivados.')) return;
  try {
    const { data: result } = await Api.delete('/products/bulk', { ids });
    const removed = result.deleted || [];
    const skipped = result.cannotDelete || [];
    if (removed.length) Components.toast(`${removed.length} produto(s) removido(s) ou arquivado(s).`, 'success');
    if (skipped.length) {
      Components.toast(`Não foi possível remover: ${skipped.map((item) => `#${item.id}: ${item.reason}`).join('; ')}`, 'warning', 6000);
    }
    state.selected.clear();
    await loadProducts();
  } catch (error) {
    Components.toast(`Falha na exclusão em massa: ${error.message}`, 'error');
  }
}

function applyFilters() {
  state.page = 1;
  state.priceMin = document.getElementById('priceMin').value;
  state.priceMax = document.getElementById('priceMax').value;
  state.stockMin = document.getElementById('stockMin').value;
  state.stockMax = document.getElementById('stockMax').value;
  state.lowStock = document.getElementById('lowStock').checked;
  loadProducts();
}

function wireEvents() {
  document.getElementById('btnNew').addEventListener('click', openCreate);
  document.getElementById('btnSave').addEventListener('click', saveProduct);
  document.getElementById('btnBulkDelete').addEventListener('click', bulkDelete);
  document.getElementById('btnClearSelection').addEventListener('click', () => {
    state.selected.clear();
    document.getElementById('selectAll').checked = false;
    document.querySelectorAll('.row-check').forEach((checkbox) => { checkbox.checked = false; });
    updateSelection();
  });
  document.getElementById('btnEditFromDetail').addEventListener('click', () => {
    detailModal.close();
    if (detailProductId) openEdit(detailProductId);
  });
  document.getElementById('selectAll').addEventListener('change', (event) => {
    document.querySelectorAll('.row-check').forEach((checkbox) => {
      checkbox.checked = event.target.checked;
      const id = Number(checkbox.dataset.id);
      event.target.checked ? state.selected.add(id) : state.selected.delete(id);
    });
    updateSelection();
  });
  document.getElementById('searchInput').addEventListener('input', (event) => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => {
      state.search = event.target.value.trim();
      state.page = 1;
      loadProducts();
    }, 350);
  });
  ['priceMin', 'priceMax', 'stockMin', 'stockMax', 'lowStock'].forEach((id) => {
    document.getElementById(id).addEventListener('change', applyFilters);
  });
  ['sortBy', 'sortOrder', 'limitSelect'].forEach((id) => {
    document.getElementById(id).addEventListener('change', (event) => {
      if (id === 'sortBy') state.sortBy = event.target.value;
      if (id === 'sortOrder') state.sortOrder = event.target.value;
      if (id === 'limitSelect') state.limit = Number(event.target.value);
      state.page = 1;
      loadProducts();
    });
  });
  document.querySelectorAll('th.sortable').forEach((header) => {
    header.addEventListener('click', () => {
      const field = header.dataset.field;
      state.sortOrder = state.sortBy === field && state.sortOrder === 'ASC' ? 'DESC' : 'ASC';
      state.sortBy = field;
      document.getElementById('sortBy').value = field;
      document.getElementById('sortOrder').value = state.sortOrder;
      state.page = 1;
      loadProducts();
    });
  });
}
