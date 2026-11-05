// js/catalog.js

// ==========================================
// ПР №16: ФУНКЦИИ ОБРАБОТКИ ДАННЫХ (Алгоритмы)
// ==========================================

function formatPrice(price) {
  return `${price.toLocaleString('ru-RU')} руб.`;
}

function calculateDiscount(price, discountPercent) {
  return price * discountPercent / 100;
}

function calculateFinalPrice(price, discountPercent) {
  const discountValue = calculateDiscount(price, discountPercent);
  return price - discountValue;
}

function getProductTitles(products) {
  return products.map(product => product.title);
}

function getAvailableProducts(products) {
  return products.filter(product => product.isAvailable);
}

function searchProducts(products, query) {
  const normalizedQuery = query.trim().toLowerCase();
  if (normalizedQuery === '') return products;
  
  return products.filter(product => 
    product.title.toLowerCase().includes(normalizedQuery)
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

// ==========================================
// ПР №17: РАБОТА С DOM И СОБЫТИЯМИ (Интерфейс каталога)
// ==========================================

const productsContainer = document.querySelector('[data-products-container]');
const searchInput = document.querySelector('#catalog-search');
const categoryFilter = document.querySelector('#category-filter');
const sortSelect = document.querySelector('#sort-select');
const catalogCount = document.querySelector('.catalog-count');
const catalogEmpty = document.querySelector('.catalog-empty');

// Состояние каталога
const catalogState = {
  query: '',
  category: 'all',
  sort: 'asc' // по умолчанию сортируем по возрастанию цены
};

// Создание HTML-карточки
function createProductCard(product) {
  const card = document.createElement('article');
  card.classList.add('product-card');

  // Бейджи
  if (product.discountPercent > 0) {
    const badge = document.createElement('span');
    badge.classList.add('product-card__badge');
    badge.textContent = 'Скидка';
    card.appendChild(badge);
  } else if (!product.isAvailable) {
    const badge = document.createElement('span');
    badge.classList.add('product-card__badge');
    badge.textContent = 'Нет в наличии';
    badge.style.backgroundColor = 'var(--color-muted)';
    card.appendChild(badge);
  }

  const image = document.createElement('img');
  image.classList.add('product-card__image');
  image.src = product.image;
  image.alt = product.title;
  image.loading = 'lazy';
  image.width = 400;
  image.height = 300;

  const title = document.createElement('h3');
  title.classList.add('product-card__title');
  title.textContent = product.title;

  const description = document.createElement('p');
  description.classList.add('product-card__description');
  description.textContent = product.description;

  const price = document.createElement('p');
  price.classList.add('product-card__price');
  
  // Логика вывода цены со скидкой
  if (product.discountPercent > 0) {
    const finalPrice = calculateFinalPrice(product.price, product.discountPercent);
    price.textContent = `Цена: ${formatPrice(finalPrice)}`;
    // Можно добавить зачеркнутую старую цену
    const oldPrice = document.createElement('span');
    oldPrice.style.textDecoration = 'line-through';
    oldPrice.style.color = 'var(--color-muted)';
    oldPrice.style.fontSize = '0.85em';
    oldPrice.style.marginLeft = '8px';
    oldPrice.textContent = formatPrice(product.price);
    price.appendChild(oldPrice);
  } else {
    price.textContent = `Цена: ${formatPrice(product.price)}`;
  }

  const button = document.createElement('button');
  button.classList.add('button', 'button--primary', 'product-card__button');
  button.type = 'button';
  button.textContent = product.isAvailable ? 'Заказать' : 'Недоступно';
  button.dataset.action = 'add-to-cart';
  button.dataset.productId = String(product.id);

  if (!product.isAvailable) {
    button.disabled = true;
    button.style.opacity = '0.5';
    button.style.cursor = 'not-allowed';
  }

  card.append(image, title, description, price, button);
  return card;
}

// Рендер каталога
function renderProducts(productsToRender) {
  if (!productsContainer) return;
  productsContainer.textContent = ''; // Очистка

  if (catalogCount) {
    catalogCount.textContent = `Найдено книг: ${productsToRender.length}`;
  }
  if (catalogEmpty) {
    catalogEmpty.hidden = productsToRender.length > 0;
  }

  productsToRender.forEach(product => {
    const card = createProductCard(product);
    productsContainer.append(card);
  });
}

// Обновление каталога
function updateCatalog() {
  const prepared = getPreparedProducts(products, catalogState);
  renderProducts(prepared);
}

// Инициализация обработчиков событий
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

  // Делегирование событий для кнопок (ПР №17)
  productsContainer.addEventListener('click', (event) => {
    const button = event.target.closest('[data-action="add-to-cart"]');
    if (!button || button.disabled) return;

    const productId = Number(button.dataset.productId);
    const selectedProduct = findProductById(products, productId);

    if (selectedProduct) {
      console.log('Добавлено в корзину:', selectedProduct.title);
      alert(`Книга "${selectedProduct.title}" добавлена в корзину!`); // В ПР №17 можно использовать alert для демо, но лучше модалку
    }
  });
}