// js/catalog.js
'use strict';

/* ============================================================
   Хелперы i18n
   ============================================================ */
function getCurrentLang() {
  return window.PereplyotSettings
    ? window.PereplyotSettings.get().lang
    : 'ru';
}

function tr(key) {
  if (!key) return '';
  return window.PereplyotI18n
    ? window.PereplyotI18n.t(key, getCurrentLang())
    : key;
}

/* Перевод названия/описания книги по её i18n-ключу */
function trProduct(product, field) {
  const key = product.i18n && product.i18n[field];
  return tr(key);
}

/* ==========================================
   ПР №16: ФУНКЦИИ ОБРАБОТКИ ДАННЫХ (Алгоритмы)
   ========================================== */

function formatPrice(price) {
  const lang = getCurrentLang();
  const locale = lang === 'en' ? 'en-US' : 'ru-RU';
  const suffix = lang === 'en' ? 'RUB' : 'руб.';
  return `${price.toLocaleString(locale)} ${suffix}`;
}

function calculateDiscount(price, discountPercent) {
  return price * discountPercent / 100;
}

function calculateFinalPrice(price, discountPercent) {
  const discountValue = calculateDiscount(price, discountPercent);
  return price - discountValue;
}

function getProductTitles(products) {
  return products.map(product => trProduct(product, 'title'));
}

function getAvailableProducts(products) {
  return products.filter(product => product.isAvailable);
}

// query.trim() — убирает пробельные символы
// .toLowerCase() — приводит строку к нижнему регистру
function searchProducts(products, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery === '') return products;

  return products.filter(product =>
    trProduct(product, 'title').toLowerCase().includes(normalizedQuery)
  );
}

function filterProductsByCategory(products, category) {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
}

function sortProductsByPrice(products, direction = 'asc') {
  const productsCopy = [...products];
  if (direction === 'desc') {
    return productsCopy.sort((a, b) => b.price - a.price);
  }
  return productsCopy.sort((a, b) => a.price - b.price);
}

function findProductById(products, id) {
  return products.find(product => product.id === id);
}

function calculateTotalPrice(products) {
  return products.reduce((sum, product) => sum + product.price, 0);
}

function countAvailableProducts(products) {
  return products.filter(product => product.isAvailable).length;
}

function calculateAveragePrice(products) {
  if (products.length === 0) return 0;
  const total = calculateTotalPrice(products);
  return Math.round(total / products.length);
}

function getPreparedProducts(products, state) {
  let result = [...products];
  result = searchProducts(result, state.query);
  result = filterProductsByCategory(result, state.category);
  result = sortProductsByPrice(result, state.sort);
  return result;
}

/* ============================================================
   DOM-элементы и состояние каталога
   ============================================================ */
const productsContainer = document.querySelector('[data-products-container]');
const searchInput = document.querySelector('#catalog-search');
const categoryFilter = document.querySelector('#category-filter');
const sortSelect = document.querySelector('#sort-select');
const catalogCount = document.querySelector('.catalog-count');
const catalogEmpty = document.querySelector('.catalog-empty');

const catalogState = {
  query: '',
  category: 'all',
  sort: 'asc'
};

/* ============================================================
   Создание HTML-карточки (с data-i18n и переведённым контентом)
   ============================================================ */
function createProductCard(product) {
  const lang = getCurrentLang();
  const card = document.createElement('article');
  card.classList.add('product-card');
  if (product.badgeClass) card.classList.add(product.badgeClass);

  /* ---------- Бейджи ---------- */
  // Бейдж из product.i18n.badge (Хит / Скидка / Новинка)
  if (product.i18n && product.i18n.badge) {
    const badge = document.createElement('span');
    badge.classList.add('product-card__badge');
    badge.setAttribute('data-i18n', product.i18n.badge);
    badge.textContent = tr(product.i18n.badge);
    card.appendChild(badge);
  } else if (product.discountPercent > 0) {
    const badge = document.createElement('span');
    badge.classList.add('product-card__badge');
    badge.setAttribute('data-i18n', 'badge.discount');
    badge.textContent = tr('badge.discount');
    card.appendChild(badge);
  } else if (!product.isAvailable) {
    const badge = document.createElement('span');
    badge.classList.add('product-card__badge');
    badge.setAttribute('data-i18n', 'badge.outOfStock');
    badge.textContent = tr('badge.outOfStock');
    badge.style.backgroundColor = 'var(--color-muted)';
    card.appendChild(badge);
  }

  /* ---------- Картинка ---------- */
  const image = document.createElement('img');
  image.classList.add('product-card__image');
  image.src = product.image;
  image.loading = 'lazy';
  image.width = 400;
  image.height = 300;
  if (product.i18n && product.i18n.alt) {
    image.setAttribute('data-i18n-alt', product.i18n.alt);
    image.alt = tr(product.i18n.alt);
  } else {
    image.alt = trProduct(product, 'title');
  }

  /* ---------- Заголовок ---------- */
  const title = document.createElement('h3');
  title.classList.add('product-card__title');
  title.setAttribute('data-i18n', product.i18n.title);
  title.textContent = trProduct(product, 'title');

  /* ---------- Описание ---------- */
  const description = document.createElement('p');
  description.classList.add('product-card__description');
  description.setAttribute('data-i18n', product.i18n.description);
  description.textContent = trProduct(product, 'description');

  /* ---------- Цена ---------- */
  const price = document.createElement('p');
  price.classList.add('product-card__price');

  if (product.discountPercent > 0) {
    const finalPrice = calculateFinalPrice(product.price, product.discountPercent);
    const label = lang === 'en' ? 'Price: ' : 'Цена: ';
    price.textContent = `${label}${formatPrice(finalPrice)}`;

    const oldPrice = document.createElement('span');
    oldPrice.style.textDecoration = 'line-through';
    oldPrice.style.color = 'var(--color-muted)';
    oldPrice.style.fontSize = '0.85em';
    oldPrice.style.marginLeft = '8px';
    oldPrice.textContent = formatPrice(product.price);
    price.appendChild(oldPrice);
  } else {
    const label = lang === 'en' ? 'Price: ' : 'Цена: ';
    price.textContent = `${label}${formatPrice(product.price)}`;
  }

  /* ---------- Кнопка ---------- */
  const button = document.createElement('button');
  button.classList.add('button', 'button--primary', 'product-card__button');
  button.type = 'button';
  button.dataset.action = 'add-to-cart';
  button.dataset.productId = String(product.id);

  if (product.isAvailable) {
    button.setAttribute('data-i18n', 'book.order');
    button.textContent = tr('book.order');
    // data-product — переведённое название книги (для формы заявки)
    button.dataset.product = trProduct(product, 'title');
  } else {
    button.setAttribute('data-i18n', 'button.unavailable');
    button.textContent = tr('button.unavailable');
    button.disabled = true;
    button.style.opacity = '0.5';
    button.style.cursor = 'not-allowed';
  }

  card.append(image, title, description, price, button);
  return card;
}

/* ============================================================
   Рендер каталога
   ============================================================ */
function renderProducts(productsToRender) {
  if (!productsContainer) return;
  productsContainer.textContent = '';

  if (catalogCount) {
    const lang = getCurrentLang();
    catalogCount.textContent = lang === 'en'
      ? `Found: ${productsToRender.length}`
      : `Найдено книг: ${productsToRender.length}`;
  }
  if (catalogEmpty) {
    catalogEmpty.hidden = productsToRender.length > 0;
  }

  productsToRender.forEach(product => {
    const card = createProductCard(product);
    productsContainer.append(card);
  });
}

/* ============================================================
   Обновление каталога
   ============================================================ */
function updateCatalog() {
  const data = window.PereplyotData ? window.PereplyotData.products : [];
  const prepared = getPreparedProducts(data, catalogState);
  renderProducts(prepared);

  // Переводим все data-i18n-элементы каталога на текущий язык
  if (window.PereplyotI18n && typeof window.PereplyotI18n.translatePage === 'function') {
    window.PereplyotI18n.translatePage(getCurrentLang());
  }
}

/* ============================================================
   Инициализация
   ============================================================ */
if (productsContainer) {
  // Первичный рендер
  updateCatalog();

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      catalogState.query = e.target.value;
      updateCatalog();
    });
  }

  if (categoryFilter) {
    categoryFilter.addEventListener('change', (e) => {
      catalogState.category = e.target.value;
      updateCatalog();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      catalogState.sort = e.target.value;
      updateCatalog();
    });
  }

  /* Перерисовка при смене языка (событие от settings.js) */
  document.addEventListener('settings:changed', () => {
    updateCatalog();
  });

  /* Делегирование событий для кнопок (ПР №17) */
  productsContainer.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action="add-to-cart"]');
    if (!button || button.disabled) return;

    const productId = Number(button.dataset.productId);
    const data = window.PereplyotData ? window.PereplyotData.products : [];
    const selectedProduct = findProductById(data, productId);

    if (selectedProduct) {
      const title = trProduct(selectedProduct, 'title');
      console.log('Добавлено в корзину:', title);
      const msg = getCurrentLang() === 'en'
        ? `Book "${title}" added to cart!`
        : `Книга "${title}" добавлена в корзину!`;
      alert(msg);
    }
  });
}