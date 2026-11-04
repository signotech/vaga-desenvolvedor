'use strict';

/**
 * Valida um CPF (Cadastro de Pessoas Físicas).
 * Verifica o formato e os dígitos verificadores.
 *
 * @param {string} cpf - CPF em texto com 11 dígitos (sem formatação)
 * @returns {boolean}
 */
function validateCpf(cpf) {
  if (typeof cpf !== 'string') return false;

  // Remove qualquer formatação
  const cleaned = cpf.replace(/\D/g, '');

  if (cleaned.length !== 11) return false;

  // Rejeita CPFs com todos os dígitos iguais
  if (/^(\d)\1{10}$/.test(cleaned)) return false;

  const digits = cleaned.split('').map(Number);

  // Valida o primeiro dígito verificador
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }
  let remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== digits[9]) return false;

  // Valida o segundo dígito verificador
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += digits[i] * (11 - i);
  }
  remainder = (sum * 10) % 11;
  if (remainder === 10 || remainder === 11) remainder = 0;
  if (remainder !== digits[10]) return false;

  return true;
}

/**
 * Formata uma string de CPF no padrão XXX.XXX.XXX-XX.
 */
function formatCpf(cpf) {
  const cleaned = cpf.replace(/\D/g, '');
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

/**
 * Remove a formatação do CPF, mantendo apenas os dígitos.
 */
function cleanCpf(cpf) {
  return cpf.replace(/\D/g, '');
}

module.exports = { validateCpf, formatCpf, cleanCpf };
