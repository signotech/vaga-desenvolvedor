/**
 * OrderFlow — Módulo de Autenticação
 * O JWT permanece em um cookie HttpOnly; somente dados não sensíveis do perfil são armazenados localmente.
 */

const Auth = {
  TOKEN_KEY: 'orderflow_token',
  USER_KEY: 'orderflow_user',

  isAuthenticated() {
    return !!this.getUser();
  },

  getUser() {
    try {
      return JSON.parse(localStorage.getItem(this.USER_KEY)) || null;
    } catch {
      return null;
    }
  },

  async login(email, password) {
    const response = await Api.post('/auth/login', { email, password });
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.setItem(this.USER_KEY, JSON.stringify(response.data.user));
    return response.data;
  },

  async logout(redirect = true) {
    const clearLocalSession = () => {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
    };

    if (!redirect) {
      clearLocalSession();
      fetch('/api/auth/logout', { method: 'POST', credentials: 'same-origin' }).catch(() => {});
      return;
    }

    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'same-origin',
      });
      if (!response.ok) throw new Error('Não foi possível encerrar a sessão no servidor.');
      clearLocalSession();
      window.location.href = '/pages/login.html';
    } catch (error) {
      Components.toast(error.message || 'Falha ao encerrar a sessão. Tente novamente.', 'error');
    }
  },

  requireAuth() {
    if (!this.isAuthenticated()) {
      window.location.href = '/pages/login.html';
      return false;
    }
    return true;
  },

  isAdmin() {
    const user = this.getUser();
    return !!user && user.role === 'ADMIN';
  },

  applyRoleVisibility() {
    if (this.isAdmin()) return;
    document.querySelectorAll('[data-role="ADMIN"]').forEach((element) => {
      element.style.display = 'none';
    });
  },
};
