// js/main.js
document.addEventListener('DOMContentLoaded', () => {
  // --- Скролл и кнопка наверх ---
  function lockScroll() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
    document.documentElement.classList.add('no-scroll');
    document.body.classList.add('no-scroll');
  }

  function unlockScroll() {
    document.documentElement.classList.remove('no-scroll');
    document.body.classList.remove('no-scroll');
    document.documentElement.style.removeProperty('--scrollbar-width');
  }

  const toTopButton = document.getElementById('to-top');
  if (toTopButton) {
    window.addEventListener('scroll', () => {
      toTopButton.classList.toggle('is-visible', window.scrollY > 300);
    }, { passive: true });
    toTopButton.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Бургер-меню ---
  const navToggle = document.getElementById('nav-toggle');
  const navLinks = document.querySelectorAll('.site-nav__link');
  
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (navToggle && navToggle.checked) {
        navToggle.checked = false;
      }
    });
  });

  // --- Модальное окно (для главной страницы) ---
  const dialog = document.getElementById('order-dialog');
  const selectedProductInput = document.getElementById('selected-product');
  const closeDialogButton = document.getElementById('close-order-dialog');

  function openDialog(productName) {
    if (!dialog) return;
    if (selectedProductInput && productName) selectedProductInput.value = productName;
    lockScroll();
    dialog.showModal();
  }

  function closeDialog() {
    if (dialog && dialog.open) dialog.close();
  }

  document.querySelectorAll('[data-product]').forEach((button) => {
    button.addEventListener('click', () => openDialog(button.dataset.product));
  });

  if (closeDialogButton) closeDialogButton.addEventListener('click', closeDialog);

  if (dialog) {
    dialog.addEventListener('close', unlockScroll);
    dialog.addEventListener('click', (event) => {
      if (event.target !== dialog) return;
      const rect = dialog.getBoundingClientRect();
      const isInside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
      if (!isInside) closeDialog();
    });
  }
});