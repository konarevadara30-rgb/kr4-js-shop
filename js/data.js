
const products = [
  {
    id: 1,
    category: 'classic',
    price: 1000,
    discountPercent: 10,
    rating: 4.8,
    isAvailable: true,
    image: 'images/im_1.jpg',
    badgeClass: 'product-card--featured',
    i18n: {
      title: 'book.zamyatin.title',
      description: 'book.zamyatin.desc',
      alt: 'book.zamyatin.alt',
      badge: 'book.zamyatin.badge'
    }
  },
  {
    id: 2,
    category: 'classic',
    price: 1500,
    discountPercent: 0,
    rating: 4.5,
    isAvailable: true,
    image: 'images/im_2.jpg',
    badgeClass: '',
    i18n: {
      title: 'book.gorky.title',
      description: 'book.gorky.desc',
      alt: 'book.gorky.alt',
      badge: null
    }
  },
  {
    id: 3,
    category: 'classic',
    price: 2000,
    discountPercent: 0,
    rating: 4.9,
    isAvailable: true,
    image: 'images/im_3.jpg',
    badgeClass: '',
    i18n: {
      title: 'book.tolstoy.title',
      description: 'book.tolstoy.desc',
      alt: 'book.tolstoy.alt',
      badge: null
    }
  },
  {
    id: 4,
    category: 'prose',
    price: 1200,
    discountPercent: 15,
    rating: 4.6,
    isAvailable: true,
    image: 'images/im_4.jpg',
    badgeClass: 'product-card--discount',
    i18n: {
      title: 'book.astafiev.title',
      description: 'book.astafiev.desc',
      alt: 'book.astafiev.alt',
      badge: 'book.astafiev.badge'
    }
  },
  {
    id: 5,
    category: 'foreign',
    price: 1800,
    discountPercent: 0,
    rating: 4.7,
    isAvailable: false,
    image: 'images/im_5.jpg',
    badgeClass: 'product-card--new',
    i18n: {
      title: 'book.hugo.title',
      description: 'book.hugo.desc',
      alt: 'book.hugo.alt',
      badge: 'book.hugo.badge'
    }
  },
  {
    id: 6,
    category: 'prose',
    price: 2200,
    discountPercent: 0,
    rating: 4.4,
    isAvailable: true,
    image: 'images/im_6.jpg',
    badgeClass: '',
    i18n: {
      title: 'book.paustovsky.title',
      description: 'book.paustovsky.desc',
      alt: 'book.paustovsky.alt',
      badge: null
    }
  }
];

// Экспорт для использования в catalog.js
window.PereplyotData = { products: products };