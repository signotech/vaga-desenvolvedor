import { apiRequest } from './api.js';
import { renderLayout } from './layout.js';
import { renderTable } from './tables/customTable.js';

renderLayout();

let editandoId = null;

async function carregarVagas() {
  const tbody = document.querySelector('#jobs-table tbody');
  if ($.fn.DataTable.isDataTable('#jobs-table')) {
    $('#jobs-table').DataTable().destroy();
  }
  tbody.innerHTML = '';

  try {
        const jobs = await apiRequest('jobs', 'GET', null, true);
        jobs.forEach(job => {
        const tr = document.createElement('tr');

            tr.innerHTML = `
        <td>${job.title}</td>
        <td>${job.salary}</td>
        <td>${job.company}</td>
        <td>${job.type}</td>
        <td class="actions" style="text-align: center;">
            <i class="action-icon view" data-lucide="eye" data-id="${job.id}" title="Visualizar"></i>
            <i class="action-icon" data-lucide="edit" data-id="${job.id}" data-title="${job.title}" data-salary="${job.salary}" data-company="${job.company}" data-type="${job.type}" title="Editar"></i>
            <i class="action-icon delete" data-lucide="trash-2" data-id="${job.id}" title="Excluir"></i>
        </td>
        `;
        tbody.appendChild(tr);
    });

    lucide.createIcons();

    const tableId = '#jobs-table';
    renderTable(tableId)

    document.querySelectorAll('.action-icon.delete').forEach(icon => {
    icon.addEventListener('click', async () => {
    const id = icon.getAttribute('data-id');
    const confirmDelete = confirm('Deseja realmente excluir esta vaga?');
    if (!confirmDelete) return;

    try {
      const response = await apiRequest(`jobs/${id}`, 'DELETE', null, true);
      alert('Vaga excluída com sucesso!');
      carregarVagas();
    } catch (error) {
      console.error('Erro ao excluir vaga:', error);
      alert('Erro ao excluir vaga.');
    }
  });
});

    document.querySelectorAll('[data-lucide="edit"]').forEach(icon => {
      icon.addEventListener('click', (e) => {
        const id = icon.getAttribute('data-id');
        const title = icon.getAttribute('data-title');
        const salary = icon.getAttribute('data-salary');
        const company = icon.getAttribute('data-company');
        const type = icon.getAttribute('data-type');
        abrirModalEdicao(id, title, salary, company, type);
      });
    });

  } catch (err) {
    console.error('Erro ao carregar vagas:', err);
  }
}

function abrirModalEdicao(id, title, salary, company, type) {
  editandoId = id;
  document.getElementById('modal-title').textContent = 'Editar Vaga';
  document.getElementById('title').value = title;
  document.getElementById('salary').value = salary;
  document.getElementById('company').value = company;
  document.getElementById('type').value = type;
  document.getElementById('modal').classList.remove('hidden');
}

function abrirModalCriacao() {
  editandoId = null;
  document.getElementById('modal-title').textContent = 'Adicionar Vaga';
  document.getElementById('title').value = '';
  document.getElementById('salary').value = '';
  document.getElementById('company').value = '';
  document.getElementById('type').value = '';
  document.getElementById('modal').classList.remove('hidden');
}

document.addEventListener('DOMContentLoaded', carregarVagas);

document.getElementById('add-job').addEventListener('click', abrirModalCriacao);

document.getElementById('close-modal').addEventListener('click', () => {
  document.getElementById('modal').classList.add('hidden');
});

document.getElementById('modal-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value.trim();
  const salary = document.getElementById('salary').value.trim();
  const company = document.getElementById('company').value.trim();
  const type = document.getElementById('type').value.trim();

  if (!title || !salary || !company || !type) {
    alert('Todos os campos são obrigatórios.');
    return;
  }

  const payload = {
    title,
    salary,
    company,
    type
  };

  try {
    let response;

    if (editandoId) {
      response = await apiRequest(`jobs/${editandoId}`, 'PUT', payload, true);
    } else {
      response = await apiRequest('jobs', 'POST', payload, true);
    }

    if (response.job) {
      alert(`Vaga ${editandoId ? 'atualizada' : 'criada'} com sucesso!`);
      document.getElementById('modal').classList.add('hidden');
      carregarVagas();
    } else {
      alert('Erro ao salvar vaga: ' + JSON.stringify(response));
    }
  } catch (error) {
    console.error('Erro ao salvar vaga:', error);
    alert('Erro inesperado ao salvar vaga.');
  }
});



