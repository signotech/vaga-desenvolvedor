import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

document.addEventListener('DOMContentLoaded', () => {

  const orderSelectPosition = document.getElementById('order');
  if (orderSelectPosition) {
    orderSelectPosition.addEventListener('change', () => form.submit());
  }  

  const orderSelectUser = document.getElementById('order-user');
  if (orderSelectUser) {
    orderSelectUser.addEventListener('change', () => form.submit());
  }

  const orderSelectApplication = document.getElementById('order-application');
  if (orderSelectApplication) {
    orderSelectApplication.addEventListener('change', () => form.submit());
  }
});


