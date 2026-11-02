'use strict';

/**
 * Arredonda um valor monetário para 2 casas decimais, evitando
 * erros de ponto flutuante (ex.: 0.1 + 0.2).
 */
function roundMoney(value) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return 0;
  }

  return Math.round((number + Number.EPSILON) * 100) / 100;
}

module.exports = { roundMoney };
