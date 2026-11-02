'use strict';

function onlyDigits(value) {
  return String(value ?? '').replace(/\D/g, '');
}

function isValidCpf(value) {
  const cpf = onlyDigits(value);

  if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
    return false;
  }

  function checkDigit(length) {
    let sum = 0;

    for (let index = 0; index < length; index += 1) {
      sum += Number(cpf[index]) * (length + 1 - index);
    }

    const remainder = sum % 11;

    return remainder < 2 ? 0 : 11 - remainder;
  }

  return (
    checkDigit(9) === Number(cpf[9]) && checkDigit(10) === Number(cpf[10])
  );
}

module.exports = { onlyDigits, isValidCpf };
