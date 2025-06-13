import { apiRequest } from './api.js';
import { renderLayout } from './layout.js';
import { renderTable } from './tables/customTable.js';

renderLayout();

let editandoId = null;

async function carregarCandidatos() {
  const tbody = document.querySelector('#candidates-table tbody');
  if ($.fn.DataTable.isDataTable('#candidates-table')) {
    $('#candidates-table').DataTable().destroy();
  }
  tbody.innerHTML = '';

  try {
        const candidates = await apiRequest('candidates', 'GET', null, true);
        candidates.forEach(candidate => {
        const tr = document.createElement('tr');

            tr.innerHTML = `
        <td>${candidate.name}</td>
        <td>${candidate.email}</td>
        <td class="actions" style="text-align: center;">
            <i class="action-icon" data-lucide="edit" data-id="${candidate.id}" data-name="${candidate.name}" data-email="${candidate.email}" title="Editar"></i>
            <i class="action-icon delete" data-lucide="trash-2" data-id="${candidate.id}" title="Excluir"></i>
        </td>
        `;
        tbody.appendChild(tr);
    });

    lucide.createIcons();

    const tableId = '#candidates-table';
    renderTable(tableId)

    document.querySelectorAll('.action-icon.delete').forEach(icon => {
    icon.addEventListener('click', async () => {
    const id = icon.getAttribute('data-id');
    const confirmDelete = confirm('Deseja realmente excluir este candidato?');
    if (!confirmDelete) return;

    try {
      const response = await apiRequest(`users/${id}`, 'DELETE', null, true);
      alert('Candidato excluído com sucesso!');
      carregarCandidatos();
    } catch (error) {
      console.error('Erro ao excluir candidato:', error);
      alert('Erro ao excluir candidato.');
    }
  });
});

    document.querySelectorAll('[data-lucide="edit"]').forEach(icon => {
      icon.addEventListener('click', (e) => {
        const id = icon.getAttribute('data-id');
        const name = icon.getAttribute('data-name');
        const email = icon.getAttribute('data-email');
        abrirModalEdicao(id, name, email);
      });
    });

  } catch (err) {
    console.error('Erro ao carregar candidatos:', err);
  }
}

function abrirModalEdicao(id, name, email) {
  editandoId = id;
  document.getElementById('modal-title').textContent = 'Editar Candidato';
  document.getElementById('name').value = name;
  document.getElementById('email').value = email;
  document.getElementById('password').value = '';
  document.getElementById('password_confirmation').value = '';
  document.getElementById('modal').classList.remove('hidden');

  document.getElementById('password').removeAttribute('required');
  document.getElementById('password_confirmation').removeAttribute('required');
}

function abrirModalCriacao() {
  editandoId = null;
  document.getElementById('modal-title').textContent = 'Adicionar Candidato';
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('password').value = '';
  document.getElementById('password_confirmation').value = '';
  document.getElementById('modal').classList.remove('hidden');

  document.getElementById('password').setAttribute('required', 'required');
  document.getElementById('password_confirmation').setAttribute('required', 'required');
}

document.addEventListener('DOMContentLoaded', carregarCandidatos);

document.getElementById('add-candidate').addEventListener('click', abrirModalCriacao);

document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('modal').classList.add('hidden');
});

document.getElementById('modal-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const passwordConfirmation = document.getElementById('password_confirmation').value;

  if (!name || !email) {
    alert('Nome e e-mail são obrigatórios.');
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Insira um e-mail válido.');
    return;
  }

  if (!editandoId && (!password || !passwordConfirmation)) {
    alert('Senha e confirmação são obrigatórias para novo candidato.');
    return;
  }

  if (password && password.length < 6) {
    alert('A senha deve ter no mínimo 6 caracteres.');
    return;
  }

  if (password && password !== passwordConfirmation) {
    alert('A confirmação de senha não confere.');
    return;
  }

  const payload = {
    name,
    email,
    user_type: 1
  };

  if (password) {
    payload.password = password;
    payload.password_confirmation = passwordConfirmation;
  }

  try {
    let response;

    if (editandoId) {
      response = await apiRequest(`users/${editandoId}`, 'PUT', payload, true);
    } else {
      response = await apiRequest('users', 'POST', payload, true);
    }

    if (response.user) {
      alert(`Candidato ${editandoId ? 'atualizado' : 'criado'} com sucesso!`);
      document.getElementById('modal').classList.add('hidden');
      carregarCandidatos();
    } else {
      alert('Erro ao salvar candidato: ' + JSON.stringify(response));
    }
  } catch (error) {
    console.error('Erro ao salvar candidato:', error);
    alert('Erro inesperado ao salvar candidato.');
  }
});



