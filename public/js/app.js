'use strict';

document.addEventListener('DOMContentLoaded', () => {
  if (typeof M === 'undefined') {
    return;
  }

  M.Sidenav.init(document.querySelectorAll('.sidenav'));
  M.Modal.init(document.querySelectorAll('.modal'));
  M.FormSelect.init(document.querySelectorAll('select:not(.browser-default)'));
  M.Tooltip.init(document.querySelectorAll('.tooltipped'));

  document.querySelectorAll('[data-per-page]').forEach((select) => {
    select.addEventListener('change', () => {
      const url = new URL(window.location.href);
      url.searchParams.set('per_page', select.value);
      url.searchParams.set('page', '1');
      window.location.assign(url.toString());
    });
  });

  document.querySelectorAll('.flash-message').forEach((element) => {
    window.setTimeout(() => {
      element.classList.add('fade-out');
    }, 5000);
  });

  const deleteModalElement = document.getElementById('delete-modal');

  if (deleteModalElement) {
    const deleteModal =
      M.Modal.getInstance(deleteModalElement) || M.Modal.init(deleteModalElement);
    const deleteForm = deleteModalElement.querySelector('[data-delete-form]');
    const deleteName = deleteModalElement.querySelector('[data-delete-name]');

    document.querySelectorAll('[data-delete-url]').forEach((button) => {
      button.addEventListener('click', () => {
        deleteForm.action = button.dataset.deleteUrl;
        deleteName.textContent = button.dataset.deleteName || 'este registro';
        deleteModal.open();
      });
    });
  }

  document.querySelectorAll('form[data-confirm]').forEach((form) => {
    form.addEventListener('submit', (event) => {
      if (!window.confirm(form.dataset.confirm)) {
        event.preventDefault();
      }
    });
  });

  const selectAll = document.querySelector('[data-select-all]');
  const selectItems = Array.from(
    document.querySelectorAll('[data-select-item]'),
  );
  const bulkSubmit = document.querySelector('[data-bulk-submit]');
  const bulkCount = document.querySelector('[data-bulk-count]');

  function updateBulkState() {
    const checked = selectItems.filter((checkbox) => checkbox.checked).length;

    if (bulkSubmit) {
      bulkSubmit.disabled = checked === 0;
    }

    if (bulkCount) {
      bulkCount.textContent = checked > 0 ? `(${checked})` : '';
    }

    if (selectAll) {
      selectAll.checked = checked > 0 && checked === selectItems.length;
      selectAll.indeterminate =
        checked > 0 && checked < selectItems.length;
    }
  }

  if (selectAll) {
    selectAll.addEventListener('change', () => {
      selectItems.forEach((checkbox) => {
        checkbox.checked = selectAll.checked;
      });
      updateBulkState();
    });
  }

  selectItems.forEach((checkbox) => {
    checkbox.addEventListener('change', updateBulkState);
  });

  updateBulkState();
});
