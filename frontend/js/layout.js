export function renderLayout() {
  const header = `
    <header>
      <nav>
        <div>
          <a href="/pages/dashboard.html" class="nav-link">Vagas</a>
          <a href="/pages/candidates.html" class="nav-link">Candidatos</a>
          <a href="/pages/admins.html" class="nav-link">Administradores</a>
        </div>
        <button id="logout-btn" class="nav-btn">Sair</button>
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

  document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('token');
    window.location.href = '/index.html';
  });
}
