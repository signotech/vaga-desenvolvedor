'use strict';

/**
 * Monta uma query string preservando os parâmetros atuais e aplicando
 * overrides (ex.: trocar apenas a página em um link de paginação).
 */
function queryString(query = {}, overrides = {}) {
  const params = new URLSearchParams();
  const merged = { ...query, ...overrides };

  Object.entries(merged).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') {
      return;
    }

    params.set(key, value);
  });

  return params.toString();
}

module.exports = { queryString };
