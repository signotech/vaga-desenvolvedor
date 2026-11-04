'use strict';


const { faker } = require('@faker-js/faker/locale/pt_BR');


function generateValidCpf() {
  const digits = Array.from({ length: 9 }, () => Math.floor(Math.random() * 10));

  // Primeiro dígito verificador
  let sum = digits.reduce((acc, d, i) => acc + d * (10 - i), 0);
  let remainder = (sum * 10) % 11;
  const d1 = remainder === 10 || remainder === 11 ? 0 : remainder;
  digits.push(d1);

  // Segundo dígito verificador
  sum = digits.reduce((acc, d, i) => acc + d * (11 - i), 0);
  remainder = (sum * 10) % 11;
  const d2 = remainder === 10 || remainder === 11 ? 0 : remainder;
  digits.push(d2);

  return digits.join('');
}

/**
 * Cria um objeto de cliente fictício.
 */
function clientFactory(overrides = {}) {
  return {
    name: faker.person.fullName(),
    cpf: generateValidCpf(),
    email: faker.internet.email().toLowerCase(),
    deleted_at: null,
    created_at: faker.date.between({ from: '2023-01-01', to: new Date() }),
    updated_at: new Date(),
    ...overrides,
  };
}

/**
 * Cria uma lista de objetos de clientes fictícios.
 */
function clientBatch(count = 50, overrides = {}) {
  const clients = [];
  const usedCpfs = new Set();
  const usedEmails = new Set();

  while (clients.length < count) {
    const client = clientFactory(overrides);

    // Garante que os valores sejam únicos
    if (usedCpfs.has(client.cpf) || usedEmails.has(client.email)) {
      continue;
    }

    usedCpfs.add(client.cpf);
    usedEmails.add(client.email);
    clients.push(client);
  }

  return clients;
}

module.exports = { clientFactory, clientBatch, generateValidCpf };
