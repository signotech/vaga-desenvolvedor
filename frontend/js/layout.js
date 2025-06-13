export function renderLayout() {
  const userType = localStorage.getItem('user_type');
  const userName = localStorage.getItem('user_name');

  const header = `
    <header>
      <nav style="display: flex; justify-content: space-between; align-items: center;">
        <div>
          <a href="/pages/dashboard.html" class="nav-link">Vagas</a>
          ${userType !== '1' ? '<a href="/pages/candidates.html" id="link-candidatos" class="nav-link">Candidatos</a>' : ''}
          ${userType !== '1' ? '<a href="/pages/admins.html" id="link-admins" class="nav-link">Administradores</a>' : ''}
        </div>
        <div style="display: flex; align-items: center; gap: 1rem;">
          <span id="user-name" style="font-weight: bold;"></span>
          <button id="logout-btn" class="nav-btn">Sair</button>
        </div>
      </nav>
    </header>
  `;

  const footer = `
    <footer>
      <p>&copy; ${new Date().getFullYear()} CRUD de vagas - Mateus Silva</p>
    </footer>
  `;

  document.body.insertAdjacentHTML('afterbegin', header);
  document.body.insertAdjacentHTML('beforeend', footer);

  if (userName) {
    const nameSpan = document.getElementById('user-name');
    if (nameSpan) nameSpan.textContent = userName;
  }

  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_type');
    localStorage.removeItem('user_name');
    window.location.href = '/index.html';
  });
}
