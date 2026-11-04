/**
 * OrderFlow — Administração de Usuários
 */

if (!Auth.requireAuth()) throw new Error('Redirect');
if (!Auth.isAdmin()) {
  window.location.replace('/pages/dashboard.html');
  throw new Error('Acesso restrito');
}
Components.renderSidebar('users');

let users = [];
let userModal;

document.addEventListener('DOMContentLoaded', () => {
  M.Modal.init(document.querySelectorAll('.modal'));
  userModal = M.Modal.getInstance(document.getElementById('userModal'));
  Components.refreshSelect(document.getElementById('fieldRole'));
  bindEvents();
  loadUsers();
});

async function loadUsers() {
  const tbody = document.getElementById('tableBody');
  tbody.innerHTML = '<tr><td colspan="5"><div class="empty-state">Carregando usuários…</div></td></tr>';
  try {
    const response = await Api.get('/users');
    users = response.data || [];
    renderUsers();
  } catch (error) {
    tbody.innerHTML = `<tr><td colspan="5"><div class="empty-state">${Components.escapeHtml(error.message)}</div></td></tr>`;
  }
}

function renderUsers() {
  const search = document.getElementById('searchInput').value.trim().toLocaleLowerCase('pt-BR');
  const role = document.getElementById('roleFilter').value;
  const visibleUsers = users.filter((user) => {
    const matchesSearch = `${user.name} ${user.email}`.toLocaleLowerCase('pt-BR').includes(search);
    return matchesSearch && (!role || user.role === role);
  });
  const tbody = document.getElementById('tableBody');
  if (!visibleUsers.length) {
    tbody.innerHTML = '<tr><td colspan="5"><div class="empty-state"><i class="material-icons">manage_accounts</i><p>Nenhum usuário encontrado</p></div></td></tr>';
    return;
  }
  const currentUserId = Number(Auth.getUser().id);
  tbody.innerHTML = visibleUsers.map((user) => `<tr>
    <td>${Components.escapeHtml(user.name)}${Number(user.id) === currentUserId ? ' <span class="muted-text">(você)</span>' : ''}</td>
    <td>${Components.escapeHtml(user.email)}</td>
    <td><span class="role-badge ${user.role === 'ADMIN' ? 'admin' : 'operator'}">${user.role === 'ADMIN' ? 'Administrador' : 'Operador'}</span></td>
    <td>${Components.formatDate(user.created_at)}</td>
    <td><div class="actions">
      <button class="btn-icon edit" data-action="edit" data-id="${Number(user.id)}" aria-label="Editar usuário"><i class="material-icons">edit</i></button>
      <button class="btn-icon delete" data-action="delete" data-id="${Number(user.id)}" aria-label="Excluir usuário" ${Number(user.id) === currentUserId ? 'disabled title="Não é possível excluir sua própria conta"' : ''}><i class="material-icons">delete</i></button>
    </div></td>
  </tr>`).join('');
  tbody.querySelectorAll('[data-action="edit"]').forEach((button) => {
    button.addEventListener('click', () => openEdit(Number(button.dataset.id)));
  });
  tbody.querySelectorAll('[data-action="delete"]:not([disabled])').forEach((button) => {
    button.addEventListener('click', () => deleteUser(Number(button.dataset.id)));
  });
}

function resetForm() {
  document.getElementById('userForm').reset();
  document.getElementById('userId').value = '';
  document.getElementById('formErrors').textContent = '';
  document.getElementById('passwordRequired').style.display = 'inline';
  document.getElementById('passwordHint').textContent = 'A senha deve ter pelo menos 8 caracteres.';
  document.getElementById('fieldPassword').required = true;
  document.getElementById('fieldRole').value = 'OPERATOR';
  Components.refreshSelect(document.getElementById('fieldRole'));
  M.updateTextFields();
}

function openCreate() {
  resetForm();
  document.getElementById('modalTitle').textContent = 'Novo Usuário';
  userModal.open();
}

function openEdit(id) {
  const user = users.find((item) => Number(item.id) === id);
  if (!user) {
    Components.toast('Usuário não encontrado na lista carregada.', 'error');
    return;
  }
  resetForm();
  document.getElementById('userId').value = user.id;
  document.getElementById('fieldName').value = user.name;
  document.getElementById('fieldEmail').value = user.email;
  document.getElementById('fieldRole').value = user.role;
  document.getElementById('fieldPassword').required = false;
  document.getElementById('passwordRequired').style.display = 'none';
  document.getElementById('passwordHint').textContent = 'Deixe em branco para manter a senha atual.';
  document.getElementById('modalTitle').textContent = 'Editar Usuário';
  Components.refreshSelect(document.getElementById('fieldRole'));
  M.updateTextFields();
  userModal.open();
}

async function saveUser() {
  const id = document.getElementById('userId').value;
  const password = document.getElementById('fieldPassword').value;
  const data = {
    name: document.getElementById('fieldName').value.trim(),
    email: document.getElementById('fieldEmail').value.trim(),
    role: document.getElementById('fieldRole').value,
  };
  if (password) data.password = password;
  const errorEl = document.getElementById('formErrors');
  const button = document.getElementById('btnSave');
  errorEl.textContent = '';
  if (!data.name || !data.email || (!id && password.length < 8) || (password && password.length < 8)) {
    errorEl.textContent = 'Informe nome, e-mail válido e senha com pelo menos 8 caracteres.';
    return;
  }
  button.disabled = true;
  try {
    if (id) {
      const { data: updatedUser } = await Api.put(`/users/${id}`, data);
      if (Number(id) === Number(Auth.getUser().id)) {
        localStorage.setItem(Auth.USER_KEY, JSON.stringify(updatedUser));
        if (updatedUser.role !== 'ADMIN') {
          window.location.replace('/pages/dashboard.html');
          return;
        }
      }
      Components.toast('Usuário atualizado.', 'success');
    } else {
      await Api.post('/users', data);
      Components.toast('Usuário criado.', 'success');
    }
    userModal.close();
    await loadUsers();
  } catch (error) {
    errorEl.textContent = error.errors
      ? error.errors.map((item) => item.message).join(', ')
      : error.message;
  } finally {
    button.disabled = false;
  }
}

async function deleteUser(id) {
  if (!await Components.confirm('Excluir usuário?', 'Usuários associados a pedidos históricos não podem ser removidos.')) return;
  try {
    const response = await Api.delete(`/users/${id}`);
    Components.toast(response.message || 'Usuário excluído.', 'success');
    await loadUsers();
  } catch (error) {
    Components.toast(`Não foi possível excluir o usuário: ${error.message}`, 'error');
  }
}

function bindEvents() {
  document.getElementById('btnNew').addEventListener('click', openCreate);
  document.getElementById('btnSave').addEventListener('click', saveUser);
  document.getElementById('searchInput').addEventListener('input', renderUsers);
  document.getElementById('roleFilter').addEventListener('change', renderUsers);
}
