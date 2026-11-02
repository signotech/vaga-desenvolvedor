'use strict';

const { onlyDigits } = require('./cpf');

const STATUS_LABELS = Object.freeze({
  open: 'Em Aberto',
  paid: 'Pago',
  canceled: 'Cancelado',
});

const STATUS_CLASSES = Object.freeze({
  open: 'status-open',
  paid: 'status-paid',
  canceled: 'status-canceled',
});

const moneyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

const dateFormatter = new Intl.DateTimeFormat('pt-BR');

const dateTimeFormatter = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'short',
  timeStyle: 'short',
});

function formatMoney(value) {
  return moneyFormatter.format(Number(value) || 0);
}

function formatDate(value) {
  if (!value) {
    return '—';
  }

  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? '—' : dateFormatter.format(date);
}

function formatDateTime(value) {
  if (!value) {
    return '—';
  }

  const date = value instanceof Date ? value : new Date(value);

  return Number.isNaN(date.getTime()) ? '—' : dateTimeFormatter.format(date);
}

function statusLabel(status) {
  return STATUS_LABELS[status] || status || '—';
}

function statusClass(status) {
  return STATUS_CLASSES[status] || '';
}

function discountLabel(type, value) {
  if (!type || type === 'none') {
    return '—';
  }

  if (type === 'percent') {
    return `${Number(value)}%`;
  }

  return formatMoney(value);
}

function formatCpf(value) {
  const digits = onlyDigits(value);

  if (digits.length !== 11) {
    return value || '—';
  }

  return `${digits.slice(0, 3)}.${digits.slice(3, 6)}.${digits.slice(
    6,
    9,
  )}-${digits.slice(9)}`;
}

function toDateTimeLocal(value) {
  if (!value) {
    return '';
  }

  const date = value instanceof Date ? value : new Date(value);

  if (Number.isNaN(date.getTime())) {
    return '';
  }

  const pad = (number) => String(number).padStart(2, '0');

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

module.exports = {
  STATUS_LABELS,
  formatMoney,
  formatDate,
  formatDateTime,
  formatCpf,
  toDateTimeLocal,
  statusLabel,
  statusClass,
  discountLabel,
};
