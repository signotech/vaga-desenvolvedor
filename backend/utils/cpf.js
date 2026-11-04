const digitoVerificador = numeros => {
  const soma = [...numeros].reduce((total, numero, indice) => total + numero * (numeros.length + 1 - indice), 0);
  const resto = soma % 11;
  return resto < 2 ? 0 : 11 - resto;
};

function gerarCpf(base) {
  const primeiro = digitoVerificador(base);
  return `${base}${primeiro}${digitoVerificador(base + primeiro)}`;
}

function cpfValido(cpf) {
  return /^\d{11}$/.test(cpf) && !/^(\d)\1{10}$/.test(cpf) && gerarCpf(cpf.slice(0, 9)) === cpf;
}

module.exports = { cpfValido, gerarCpf };
