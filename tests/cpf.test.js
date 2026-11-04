const { test } = require('node:test');
const assert = require('node:assert/strict');
const { cpfValido, gerarCpf } = require('../backend/utils/cpf');

test('valida dígitos verificadores do CPF', () => {
  assert.equal(cpfValido('52998224725'), true);
  assert.equal(cpfValido('52998224724'), false);
  assert.equal(cpfValido('11111111111'), false);
  assert.equal(cpfValido('123'), false);
});

test('gera CPF válido a partir de 9 dígitos', () => {
  assert.equal(gerarCpf('529982247'), '52998224725');
});
