/**
 * OrderFlow — Cliente da API
 * Cliente HTTP de mesma origem. A autenticação do navegador é gerenciada por um cookie HttpOnly.
 */

const API_BASE = '/api';

const Api = {
  async request(method, path, body = null, options = {}) {
    const config = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'same-origin',
    };

    if (body && method !== 'GET') config.body = JSON.stringify(body);

    let url = `${API_BASE}${path}`;
    if (body && method === 'GET') {
      const params = new URLSearchParams(
        Object.entries(body).filter(([, value]) => value !== null && value !== undefined && value !== '')
      );
      if (params.toString()) url += `?${params}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const error = new Error(data.message || `HTTP ${response.status}`);
        error.status = response.status;
        error.code = data.code;
        error.errors = data.errors;

        if (response.status === 401 && !path.includes('/auth/')) {
          Auth.logout(false);
          if (!window.location.pathname.endsWith('/login.html')) {
            window.location.href = '/pages/login.html';
          }
        }

        throw error;
      }

      return data;
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        throw new Error('Erro de conexão. Verifique se o servidor está disponível.');
      }
      throw error;
    }
  },

  get(path, params = {}) {
    return this.request('GET', path, Object.keys(params).length ? params : null);
  },

  post(path, body) {
    return this.request('POST', path, body);
  },

  put(path, body) {
    return this.request('PUT', path, body);
  },

  patch(path, body) {
    return this.request('PATCH', path, body);
  },

  delete(path, body = null) {
    return this.request('DELETE', path, body);
  },

  getQuery(path, params = {}) {
    const query = new URLSearchParams(
      Object.entries(params).filter(([, value]) => value !== null && value !== undefined && value !== '')
    );
    return this.request('GET', query.toString() ? `${path}?${query}` : path);
  },
};
