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
});
