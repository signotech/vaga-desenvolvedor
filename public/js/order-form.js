'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('[data-order-form]');

  if (!form) {
    return;
  }

  const itemsBody = form.querySelector('[data-order-items]');
  const template = document.getElementById('order-item-template');
  const addButton = form.querySelector('[data-add-item]');
  const discountType = form.querySelector('#discount_type');
  const discountValue = form.querySelector('#discount_value');

  const money = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  let nextIndex = 0;

  function rows() {
    return Array.from(itemsBody.querySelectorAll('.order-item-row'));
  }

  function quantityOf(row) {
    const input = row.querySelector('.quantity-input');
    const quantity = Number.parseInt(input ? input.value : '0', 10);

    return Number.isFinite(quantity) && quantity > 0 ? quantity : 0;
  }

  function priceOf(row) {
    const select = row.querySelector('.product-select');
    const option = select ? select.options[select.selectedIndex] : null;
    const price = option ? Number(option.dataset.price) : 0;

    return Number.isFinite(price) && price > 0 ? price : 0;
  }

  /**
   * Renomeia os campos para que os índices fiquem sequenciais.
   * Isso evita lacunas na lista enviada ao servidor após remover linhas.
   */
  function reindex() {
    rows().forEach((row, index) => {
      row.querySelectorAll('[name]').forEach((field) => {
        field.name = field.name.replace(/items\[[^\]]*\]/, `items[${index}]`);
      });
    });

    nextIndex = rows().length;
  }

  function updateRow(row) {
    const price = priceOf(row);
    const quantity = quantityOf(row);
    const unitPriceCell = row.querySelector('.unit-price');
    const subtotalCell = row.querySelector('.subtotal');

    if (unitPriceCell) {
      unitPriceCell.textContent = price ? money.format(price) : '—';
    }

    if (subtotalCell) {
      subtotalCell.textContent = price
        ? money.format(quantity * price)
        : '—';
    }
  }

  function updateSummary() {
    const subtotal = rows().reduce(
      (sum, row) => sum + quantityOf(row) * priceOf(row),
      0,
    );

    const type = discountType ? discountType.value : 'none';
    const value = Math.max(
      Number.parseFloat(discountValue ? discountValue.value : '0') || 0,
      0,
    );

    let discount = 0;

    if (type === 'percent') {
      discount = subtotal * (Math.min(value, 100) / 100);
    }

    if (type === 'fixed') {
      discount = Math.min(value, subtotal);
    }

    const total = Math.max(subtotal - discount, 0);

    form.querySelector('[data-summary-subtotal]').textContent =
      money.format(subtotal);
    form.querySelector('[data-summary-discount]').textContent =
      money.format(discount);
    form.querySelector('[data-summary-total]').textContent =
      money.format(total);
  }

  function refresh() {
    rows().forEach(updateRow);
    updateSummary();
  }

  addButton.addEventListener('click', () => {
    const markup = template.innerHTML.replace(
      /__INDEX__/g,
      String(nextIndex),
    );

    itemsBody.insertAdjacentHTML('beforeend', markup);
    reindex();
    refresh();
  });

  itemsBody.addEventListener('input', (event) => {
    if (!event.target.matches('.quantity-input')) {
      return;
    }

    updateRow(event.target.closest('.order-item-row'));
    updateSummary();
  });

  itemsBody.addEventListener('change', (event) => {
    if (!event.target.matches('.product-select')) {
      return;
    }

    updateRow(event.target.closest('.order-item-row'));
    updateSummary();
  });

  itemsBody.addEventListener('click', (event) => {
    const button = event.target.closest('.remove-item');

    if (!button) {
      return;
    }

    const row = button.closest('.order-item-row');

    if (rows().length === 1) {
      row.querySelector('.product-select').value = '';
      row.querySelector('.quantity-input').value = 1;
      refresh();
      return;
    }

    row.remove();
    reindex();
    refresh();
  });

  if (discountType) {
    discountType.addEventListener('change', updateSummary);
  }

  if (discountValue) {
    discountValue.addEventListener('input', updateSummary);
  }

  reindex();
  refresh();
});
