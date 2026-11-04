/**
 * OrderFlow — Componentes Reutilizáveis da Interface
 */

const Components = {
  /**
   * Exibe uma notificação toast do Materialize.
   */
  toast(message, type = 'info', duration = 3500) {
    const colors = {
      success: '#2e7d32',
      error: '#c62828',
      warning: '#e65100',
      info: '#1565c0',
    };
    M.toast({
      html: `<span>${this.escapeHtml(message)}</span>`,
      displayLength: duration,
      classes: '',
      inDuration: 300,
    });
    // Aplica a cor pelo DOM
    setTimeout(() => {
      const toasts = document.querySelectorAll('.toast');
      const last = toasts[toasts.length - 1];
      if (last) {
        last.style.background = colors[type] || colors.info;
        last.style.borderRadius = '8px';
      }
    }, 50);
  },

  escapeHtml(value) {
    const entities = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return String(value ?? '').replace(/[&<>"']/g, (character) => entities[character]);
  },

  refreshSelect(select) {
    const instance = M.FormSelect.getInstance(select);
    if (instance) instance.destroy();
    return M.FormSelect.init(select);
  },

  /**
   * Exibe um modal de confirmação e retorna uma promessa que resolve para true/false.
   */
  confirm(title, message, type = 'danger') {
    return new Promise((resolve) => {
      const icon = type === 'danger' ? 'delete_forever' : 'warning';
      const color = type === 'danger' ? '#c62828' : '#e65100';
      const btnClass = type === 'danger' ? 'red' : 'orange';

      const id = `confirm-modal-${Date.now()}`;
      const html = `
        <div id="${id}" class="modal" style="max-width:400px;border-radius:12px;">
          <div class="modal-content" style="padding:32px;text-align:center;">
            <i class="material-icons" style="font-size:3rem;color:${color};display:block;margin-bottom:16px;">${icon}</i>
            <h5 style="margin:0 0 8px;font-size:1.1rem;">${this.escapeHtml(title)}</h5>
            <p style="color:#546e7a;font-size:0.9rem;margin:0;">${this.escapeHtml(message)}</p>
          </div>
          <div style="padding:0 24px 24px;display:flex;gap:12px;justify-content:center;">
            <button class="btn btn-flat grey-text" id="${id}-cancel">Cancelar</button>
            <button class="btn ${btnClass} darken-2 waves-effect" id="${id}-confirm">Confirmar</button>
          </div>
        </div>`;

      document.body.insertAdjacentHTML('beforeend', html);
      const el = document.getElementById(id);
      const instance = M.Modal.init(el, {
        dismissible: false,
        onCloseEnd: () => {
          el.remove();
        },
      });

      instance.open();

      document.getElementById(`${id}-cancel`).onclick = () => {
        instance.close();
        resolve(false);
      };

      document.getElementById(`${id}-confirm`).onclick = () => {
        instance.close();
        resolve(true);
      };
    });
  },

  /**
   * Exibe um indicador de carregamento em um contêiner.
   */
  showLoading(container) {
    if (!container) return;
    container.style.position = 'relative';
    const existing = container.querySelector('.loading-overlay');
    if (existing) { existing.style.display = 'flex'; return; }

    container.insertAdjacentHTML(
      'beforeend',
      `<div class="loading-overlay" style="display:flex;">
        <div class="preloader-wrapper active">
          <div class="spinner-layer spinner-blue-only">
            <div class="circle-clipper left"><div class="circle"></div></div>
            <div class="gap-patch"><div class="circle"></div></div>
            <div class="circle-clipper right"><div class="circle"></div></div>
          </div>
        </div>
      </div>`
    );
  },

  hideLoading(container) {
    if (!container) return;
    const overlay = container.querySelector('.loading-overlay');
    if (overlay) overlay.style.display = 'none';
  },

  /**
   * Renderiza os controles de paginação.
   */
  renderPagination(containerId, meta, onPageChange) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const { total, page, limit, totalPages } = meta;
    const start = total === 0 ? 0 : (page - 1) * limit + 1;
    const end = Math.min(page * limit, total);

    let pagesHtml = '';

    // Anterior
    pagesHtml += `<button class="page-btn" ${page <= 1 ? 'disabled' : ''} data-page="${page - 1}">
      <i class="material-icons" style="font-size:1rem">chevron_left</i>
    </button>`;

    // Páginas (exibe até 5 ao redor da página atual)
    const range = 2;
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= page - range && i <= page + range)) {
        pagesHtml += `<button class="page-btn ${i === page ? 'active' : ''}" data-page="${i}">${i}</button>`;
      } else if (i === page - range - 1 || i === page + range + 1) {
        pagesHtml += `<button class="page-btn" disabled>…</button>`;
      }
    }

    // Próxima
    pagesHtml += `<button class="page-btn" ${page >= totalPages ? 'disabled' : ''} data-page="${page + 1}">
      <i class="material-icons" style="font-size:1rem">chevron_right</i>
    </button>`;

    container.innerHTML = `
      <div class="pagination-bar">
        <span class="pagination-info">Exibindo ${start}–${end} de ${total} registros</span>
        <div class="pagination-controls">${pagesHtml}</div>
      </div>`;

    container.querySelectorAll('.page-btn:not([disabled])').forEach((btn) => {
      btn.addEventListener('click', () => onPageChange(parseInt(btn.dataset.page)));
    });
  },

  /**
   * Renderiza a barra lateral e configura a navegação.
   */
  renderSidebar(activePage) {
    const user = Auth.getUser();
    if (!user) return;

    const initials = user.name
      .split(' ')
      .slice(0, 2)
      .map((n) => n[0])
      .join('')
      .toUpperCase();

    const nav = [
      { key: 'dashboard', icon: 'dashboard', label: 'Dashboard', href: '/pages/dashboard.html' },
      { key: 'products', icon: 'inventory_2', label: 'Produtos', href: '/pages/products.html' },
      { key: 'orders', icon: 'receipt_long', label: 'Pedidos', href: '/pages/orders.html' },
      { key: 'clients', icon: 'people', label: 'Clientes', href: '/pages/clients.html' },
    ];

    const navHtml = nav
      .map(
        (item) => `
        <a href="${item.href}" class="nav-item ${activePage === item.key ? 'active' : ''}">
          <i class="material-icons">${item.icon}</i>
          <span>${item.label}</span>
        </a>`
      )
      .join('');
    const adminNavHtml = Auth.isAdmin()
      ? `<div class="nav-section-label">Administração</div>
        <a href="/pages/users.html" class="nav-item ${activePage === 'users' ? 'active' : ''}">
          <i class="material-icons">manage_accounts</i>
          <span>Usuários</span>
        </a>`
      : '';

    const sidebarHtml = `
      <div class="sidebar" id="sidebar">
        <div class="sidebar-header">
          <a class="sidebar-logo" href="/pages/dashboard.html">
            <i class="material-icons">local_shipping</i>
            <div>
              <span class="brand">OrderFlow</span>
              <span class="brand-sub">Gestão de Pedidos</span>
            </div>
          </a>
        </div>
        <nav class="sidebar-nav">
          <div class="nav-section-label">Menu Principal</div>
          ${navHtml}
          ${adminNavHtml}
        </nav>
        <div class="sidebar-footer">
          <div class="user-info">
            <div class="user-avatar">${initials}</div>
            <div>
              <div class="user-name">${this.escapeHtml(user.name)}</div>
              <div class="user-role">${this.escapeHtml(user.role)}</div>
            </div>
          </div>
          <button class="btn-logout" onclick="Auth.logout()">
            <i class="material-icons" style="font-size:1.1rem">logout</i>
            Sair
          </button>
        </div>
      </div>
      <div class="sidebar-overlay" id="sidebarOverlay"></div>`;

    const wrapper = document.getElementById('sidebarWrapper');
    if (wrapper) wrapper.innerHTML = sidebarHtml;

    // Alternância para dispositivos móveis
    const toggleBtn = document.getElementById('menuToggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebarOverlay');
        sidebar.classList.toggle('open');
        overlay.classList.toggle('visible');
      });
    }

    const overlay = document.getElementById('sidebarOverlay');
    if (overlay) {
      overlay.addEventListener('click', () => {
        document.getElementById('sidebar').classList.remove('open');
        overlay.classList.remove('visible');
      });
    }

    Auth.applyRoleVisibility();
  },

  /**
   * Formata valores monetários para exibição.
   */
  formatCurrency(value) {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Number(value) || 0);
  },

  /**
   * Formata uma data para exibição.
   */
  formatDate(dateStr) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  },

  /**
   * Formata data e hora para exibição.
   */
  formatDateTime(dateStr) {
    if (!dateStr) return '—';
    return new Date(dateStr).toLocaleString('pt-BR');
  },

  /**
   * Renderiza um indicador de status.
   */
  statusBadge(status) {
    const map = {
      OPEN: { class: 'open', label: 'Em Aberto' },
      PAID: { class: 'paid', label: 'Pago' },
      CANCELLED: { class: 'cancelled', label: 'Cancelado' },
    };
    const s = map[status] || { class: 'open', label: status };
    return `<span class="badge-status ${s.class}"><span class="status-dot ${s.class}"></span>${s.label}</span>`;
  },

  /**
   * Formata o CPF para exibição: XXX.XXX.XXX-XX
   */
  formatCpf(cpf) {
    if (!cpf) return '';
    return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  },
};
