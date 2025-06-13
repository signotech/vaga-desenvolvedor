import { apiRequest } from './api.js';
import { renderLayout } from './layout.js?v=timestamp';
import { renderTable } from './tables/customTable.js';

renderLayout();

let editandoId = null;
const userType = localStorage.getItem('user_type') || '';

async function carregarVagas() {
  const table = document.querySelector('#jobs-table');

  if ($.fn.DataTable.isDataTable('#jobs-table')) {
    $('#jobs-table').DataTable().destroy();
  }

  try {
    const jobs = await apiRequest('jobs', 'GET', null, true);
    const applications = await apiRequest('applications-count', 'GET', null, true);

    let theadHtml = '<thead><tr>';
    theadHtml += '<th>Título</th><th>Salário</th><th>Empresa</th><th>Modalidade</th>';
    if (userType === '2') {
      theadHtml += '<th>Qtd Candidatos</th><th style="text-align:center;">Ações</th>';
    } else if (userType === '1') {
      theadHtml += '<th style="text-align:center;">Ações</th>';
    }
    theadHtml += '</tr></thead>';

    let tbodyHtml = '<tbody>';
    const filteredJobs = userType === '1' ? jobs.filter(job => !job.paused) : jobs;

    filteredJobs.forEach(job => {
      const qtdCandidatos = applications[job.id] ?? 0;

      tbodyHtml += '<tr>';
      tbodyHtml += `<td>${job.title}</td>`;
      tbodyHtml += `<td>${Number(job.salary).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>`;
      tbodyHtml += `<td>${job.company}</td>`;
      tbodyHtml += `<td>${job.type}</td>`;

      if (userType === '2') {
        tbodyHtml += `<td>${qtdCandidatos}</td>`;
        tbodyHtml += `<td class="actions" style="text-align:center;">
          <i class="action-icon view" data-lucide="eye" data-id="${job.id}" title="Visualizar"></i>
          <i class="action-icon delete" data-lucide="trash-2" data-id="${job.id}" title="Excluir"></i>
        </td>`;
      } else if (userType === '1') {
        tbodyHtml += `<td style="text-align:center;">
          <i class="action-icon view" data-lucide="eye" data-id="${job.id}" title="Visualizar"></i>
        </td>`;
      }

      tbodyHtml += '</tr>';
    });
    tbodyHtml += '</tbody>';

    table.innerHTML = theadHtml + tbodyHtml;

    lucide.createIcons();

    renderTable('#jobs-table');

    document.querySelectorAll('.action-icon.view').forEach(icon => {
    icon.addEventListener('click', async () => {
      const jobId = icon.getAttribute('data-id');
      editandoId = jobId;

      try {
        const job = await apiRequest(`jobs/${jobId}`, 'GET', null, true);

        abrirModalVisualizar(job);
      } catch (error) {
        console.error('Erro ao buscar dados da vaga:', error);
        alert('Erro ao carregar detalhes da vaga.');
      }
    });
  });

    document.querySelectorAll('.action-icon.delete').forEach(icon => {
      icon.addEventListener('click', async () => {
        const id = icon.getAttribute('data-id');
        if (!confirm('Deseja realmente excluir esta vaga?')) return;

        try {
          await apiRequest(`jobs/${id}`, 'DELETE', null, true);
          alert('Vaga excluída com sucesso!');
          carregarVagas();
        } catch (error) {
          alert('Erro ao excluir vaga.');
          console.error(error);
        }
      });
    });


  } catch (err) {
    console.error('Erro ao carregar vagas:', err);
  }
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

document.getElementById('form-edit-admin').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('edit-title').value.trim();
  const salary = document.getElementById('edit-salary').value.trim();
  const company = document.getElementById('edit-company').value.trim();
  const type = document.getElementById('edit-type').value.trim();
  const paused = document.getElementById('paused').checked;
  console.log('PAUSADO', paused)

  if (!title || !salary || !company || !type) {
    alert('Todos os campos são obrigatórios.');
    return;
  }

  const payload = {
    title,
    salary,
    company,
    type,
    paused
  };

  console.log('Payload:', payload);

  try {
    let response;

    response = await apiRequest(`jobs/${editandoId}`, 'PUT', payload, true);

    if (response.job) {
      alert(`Vaga atualizada com sucesso!`);
    } else {
      alert('Erro ao salvar vaga: ' + JSON.stringify(response));
    }
  } catch (error) {
    console.error('Erro ao salvar vaga:', error);
    alert('Erro inesperado ao salvar vaga.');
  }
});


async function abrirModalVisualizar(job) {
  const modal = document.getElementById('modal-view');
  modal.classList.remove('hidden');

  if (userType === '1') {
    document.getElementById('visualizar-user1').classList.remove('hidden');
    document.getElementById('visualizar-user2').classList.add('hidden');

    document.getElementById('v-title').textContent = job.title;
    document.getElementById('v-salary').textContent = Number(job.salary).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    document.getElementById('v-company').textContent = job.company;
    document.getElementById('v-type').textContent = job.type;
  }

  if (userType === '2') {
    document.getElementById('visualizar-user1').classList.add('hidden');
    document.getElementById('visualizar-user2').classList.remove('hidden');

    document.getElementById('edit-title').value = job.title;
    document.getElementById('edit-salary').value = job.salary;
    document.getElementById('edit-company').value = job.company;
    document.getElementById('edit-type').value = job.type;
    document.getElementById('paused').checked = job.paused;

      try {
      const candidatos = await apiRequest(`jobs/${job.id}/applicants`, 'GET', null, true);

      const tbody = document.querySelector('#tabela-candidatos tbody');
      tbody.innerHTML = '';

      candidatos.forEach(c => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
          <td>${c.name}</td>
          <td>${c.email}</td>
          <td>${new Date(c.created_at).toLocaleString('pt-BR')}</td>
        `;
        tbody.appendChild(tr);
      });

       renderTable('#tabela-candidatos');

    } catch (error) {
      console.error('Erro ao carregar candidatos:', error);
      alert('Erro ao carregar a lista de candidatos.');
    }
  }
}

document.getElementById('close-visualizar').addEventListener('click', () => {
  document.getElementById('modal-view').classList.add('hidden');
  carregarVagas();
});





