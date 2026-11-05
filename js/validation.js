// js/validation.js

const orderForm = document.querySelector('#order-form');

if (orderForm) {
  const nameInput = orderForm.querySelector('#order-name');
  const emailInput = orderForm.querySelector('#order-email');
  const phoneInput = orderForm.querySelector('#order-phone');
  const formMessage = orderForm.querySelector('.success-message');

  // Вспомогательные функции
  function showError(input, message) {
    input.setAttribute('aria-invalid', 'true');
    input.style.borderColor = 'var(--color-danger)';
    // Для простоты выводим ошибку в консоль или можно создать span рядом
    console.warn(`Ошибка в поле ${input.name}: ${message}`);
  }

  function clearError(input) {
    input.removeAttribute('aria-invalid');
    input.style.borderColor = 'var(--color-border)';
  }

  // Валидация имени
  function validateName() {
    const value = nameInput.value.trim();
    if (value.length < 2) {
      showError(nameInput, 'Имя должно быть не короче 2 символов');
      return false;
    }
    clearError(nameInput);
    return true;
  }

  // Валидация Email
  function validateEmail() {
    const value = emailInput.value.trim();
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!pattern.test(value)) {
      showError(emailInput, 'Введите корректный e-mail');
      return false;
    }
    clearError(emailInput);
    return true;
  }

  // Валидация телефона (если поле есть на странице)
  function validatePhone() {
    if (!phoneInput) return true;
    const value = phoneInput.value.trim();
    if (value.length < 6) {
      showError(phoneInput, 'Введите корректный телефон');
      return false;
    }
    clearError(phoneInput);
    return true;
  }

  // Обработка отправки
  orderForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Отключаем перезагрузку

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();

    if (!isNameValid || !isEmailValid || !isPhoneValid) {
      if (formMessage) {
        formMessage.hidden = false;
        formMessage.textContent = 'Пожалуйста, исправьте ошибки в форме.';
        formMessage.style.color = 'var(--color-danger)';
        formMessage.style.backgroundColor = '#fdf4f6';
      }
      return;
    }

    // Имитация успешной отправки
    if (formMessage) {
      formMessage.hidden = false;
      formMessage.textContent = 'Заявка успешно отправлена! Мы свяжемся с вами.';
      formMessage.style.color = 'var(--color-success)';
      formMessage.style.backgroundColor = 'var(--color-success-bg)';
    }
    
    console.table({
      name: nameInput.value,
      email: emailInput.value,
      phone: phoneInput ? phoneInput.value : 'Не указан'
    });

    orderForm.reset();
  });

  // Валидация при вводе (чтобы ошибки исчезали)
  nameInput.addEventListener('input', validateName);
  emailInput.addEventListener('input', validateEmail);
  if (phoneInput) phoneInput.addEventListener('input', validatePhone);
}