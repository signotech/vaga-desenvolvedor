'use strict';

const { faker } = require('@faker-js/faker');

/**
 * Gera um CPF válido (com dígitos verificadores) para uso em seeds/factories.
 */
function generateCpf() {
  const digits = Array.from({ length: 9 }, () =>
    faker.number.int({ min: 0, max: 9 }),
  );

  for (let position = 0; position < 2; position += 1) {
    const length = 9 + position;
    let sum = 0;

    for (let index = 0; index < length; index += 1) {
      sum += digits[index] * (length + 1 - index);
    }

    const remainder = sum % 11;
    digits.push(remainder < 2 ? 0 : 11 - remainder);
  }

  return digits.join('');
}

function buildEmail(name) {
  const [firstName = 'cliente', lastName = 'teste'] = name.split(' ');
  const localPart = `${firstName}.${lastName}.${faker.string.alphanumeric(6)}`
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9.]/g, '');

  return `${localPart}@example.com`;
}

function buildClient(overrides = {}) {
  const name = faker.person.fullName();

  return {
    name,
    cpf: generateCpf(),
    email: buildEmail(name),
    ...overrides,
  };
}

module.exports = { buildClient, generateCpf };
