/* ===================================
   i18n.js — локализация через data-i18n
   Подключается на всех страницах (defer).
   =================================== */
(function () {
  'use strict';

  const DICT = {
    ru: {
      /* ---------- Общее / навигация ---------- */
      'skipLink': 'Перейти к основному содержимому',
      'logo': 'Переплёт',
      'nav.home': 'Главная',
      'nav.catalog': 'Каталог',
      'nav.product': 'Карточка книги',
      'nav.order': 'Заявка',
      'nav.contacts': 'Контакты',
      'nav.settings': 'Настройки',
      'nav.menu.open': 'Открыть меню',
      'nav.menu.label': 'Основная навигация',
      'breadcrumbs.label': 'Хлебные крошки',
      'breadcrumbs.home': 'Главная',
      'footer.copy': '© 2026 Книжный магазин «Переплёт». Все права защищены.',
      'toTop': 'Наверх',

      /* ---------- Мета-информация (title / description) ---------- */
      'meta.index.title': 'Переплёт — книжный магазин',
      'meta.index.description': 'Книжный магазин «Переплёт» — классика и современная проза.',
      'meta.catalog.title': 'Каталог книг — Переплёт',
      'meta.catalog.description': 'Каталог книг интернет-магазина «Переплёт».',
      'meta.product.title': 'Замятин, Мы — Переплёт',
      'meta.product.description': 'Карточка книги «Мы» Евгения Замятина — характеристики, цена, оформление заявки.',
      'meta.order.title': 'Оформление заявки — Переплёт',
      'meta.order.description': 'Оформление заявки на книгу в интернет-магазине «Переплёт».',
      'meta.contacts.title': 'Контакты — Переплёт',
      'meta.contacts.description': 'Контакты интернет-магазина «Переплёт».',
      'meta.settings.title': 'Настройки — Переплёт',
      'meta.settings.description': 'Настройки интернет-магазина «Переплёт»: тема оформления и язык интерфейса.',

      /* ---------- Главная ---------- */
      'index.hero.title': 'Книжный магазин «Переплёт»',
      'index.hero.text': 'Здесь живут книги — от классики до современной прозы. Мы бережно подбираем издания, чтобы вы нашли именно ту историю.',
      'index.hero.button': 'Перейти к книгам',
      'index.hero.imageAlt': 'Стопка книг в интерьере магазина',
      'index.popular.title': 'Популярные книги',

      /* Карточки на главной */
      'book.zamyatin.title': 'Замятин, Мы',
      'book.zamyatin.desc': 'Роман-антиутопия о тоталитарном будущем и цене свободы личности.',
      'book.zamyatin.price': 'Цена: 1000 руб.',
      'book.zamyatin.alt': 'Обложка книги «Мы» Евгения Замятина',
      'book.zamyatin.badge': 'Хит',

      'book.gorky.title': 'Горький, На дне',
      'book.gorky.desc': 'Пьеса о людях, оказавшихся на дне жизни, и их надежде на лучшее.',
      'book.gorky.price': 'Цена: 1500 руб.',
      'book.gorky.alt': 'Обложка пьесы «На дне» Максима Горького',

      'book.tolstoy.title': 'Толстой, Анна Каренина',
      'book.tolstoy.desc': 'Великий роман о любви, семье и трагической судьбе героини.',
      'book.tolstoy.price': 'Цена: 2000 руб.',
      'book.tolstoy.alt': 'Обложка романа «Анна Каренина» Льва Толстого',

      'book.astafiev.title': 'Астафьев, Царь-рыба',
      'book.astafiev.desc': 'Повествование в рассказах о Сибири, человеке и природе.',
      'book.astafiev.price': 'Цена: 1200 руб.',
      'book.astafiev.alt': 'Обложка книги «Царь-рыба» Виктора Астафьева',
      'book.astafiev.badge': 'Скидка',

      'book.hugo.title': 'Гюго, Отверженные',
      'book.hugo.desc': 'Роман о справедливости, милосердии и надежде во французском обществе XIX века.',
      'book.hugo.price': 'Цена: 1800 руб.',
      'book.hugo.alt': 'Обложка романа «Отверженные» Виктора Гюго',
      'book.hugo.badge': 'Новинка',

      'book.paustovsky.title': 'Паустовский, Повесть о жизни',
      'book.paustovsky.desc': 'Автобиографическая повесть о детстве, юности и становлении писателя.',
      'book.paustovsky.price': 'Цена: 2200 руб.',
      'book.paustovsky.alt': 'Обложка книги «Повесть о жизни» Константина Паустовского',

      'book.order': 'Заказать',

      /* ---------- Бейджи и кнопки каталога ---------- */
      'badge.discount': 'Скидка',
      'badge.outOfStock': 'Нет в наличии',
      'button.unavailable': 'Недоступно',

      /* Диалог заявки на главной */
      'dialog.order.title': 'Оформление заявки',
      'dialog.order.name': 'Имя',
      'dialog.order.namePlaceholder': 'Введите ваше имя',
      'dialog.order.email': 'E-mail',
      'dialog.order.close': 'Закрыть',
      'dialog.order.closeAria': 'Закрыть окно заявки',
      'dialog.order.submit': 'Отправить заявку',
      'dialog.order.success': 'Заявка успешно отправлена! Мы свяжемся с вами.',

      /* ---------- Каталог ---------- */
      'catalog.title': 'Каталог книг',
      'catalog.intro': 'Классика, антиутопия и проза — выберите книгу по душе.',
      'catalog.filters.title': 'Фильтры',
      'catalog.filters.legend': 'Поиск и категории',
      'catalog.filters.searchLabel': 'Поиск по названию',
      'catalog.filters.searchPlaceholder': 'Введите название...',
      'catalog.filters.categoryLabel': 'Категория',
      'catalog.filters.categoryAll': 'Все книги',
      'catalog.filters.categoryClassic': 'Классика',
      'catalog.filters.categoryProse': 'Проза',
      'catalog.filters.categoryForeign': 'Зарубежная',
      'catalog.filters.sortLabel': 'Сортировка',
      'catalog.filters.sortAsc': 'Сначала дешевле',
      'catalog.filters.sortDesc': 'Сначала дороже',
      'catalog.products.title': 'Список книг',
      'catalog.empty': 'По выбранным условиям книги не найдены.',
      'catalog.count': 'Найдено книг: {n}',

      /* ---------- Карточка книги ---------- */
      'product.breadcrumb': 'Замятин, Мы',
      'product.alt': 'Обложка книги «Мы» Евгения Замятина',
      'product.title': 'Замятин, Мы',
      'product.lead': '«Мы» — роман-антиутопия Евгения Замятина, написанный в 1920 году. Действие происходит в Едином Государстве будущего.',
      'product.price': 'Цена: 1000 руб.',
      'product.order': 'Оформить заявку',
      'product.back': 'Вернуться в каталог',
      'product.specs.caption': 'Характеристики книги',
      'product.specs.param': 'Параметр',
      'product.specs.value': 'Значение',
      'product.specs.author': 'Автор',
      'product.specs.authorValue': 'Евгений Замятин',
      'product.specs.category': 'Категория',
      'product.specs.categoryValue': 'Роман-антиутопия',
      'product.specs.publisher': 'Издательство',
      'product.specs.publisherValue': 'Переплёт-Классика',
      'product.specs.year': 'Год издания',
      'product.specs.yearValue': '2024',
      'product.specs.binding': 'Переплёт',
      'product.specs.bindingValue': 'Твёрдый',
      'product.specs.pages': 'Страниц',
      'product.specs.pagesValue': '320',

      /* ---------- Заявка ---------- */
      'order.title': 'Оформление заявки',
      'order.intro': 'Заполните форму ниже, чтобы оставить заявку на книгу или задать вопрос.',
      'order.name': 'Имя',
      'order.namePlaceholder': 'Введите ваше имя',
      'order.email': 'E-mail',
      'order.phone': 'Телефон',
      'order.phonePlaceholder': '+7 (900) 000-00-00',
      'order.topic': 'Тема заявки',
      'order.topicPlaceholder': 'Выберите тему',
      'order.topicBook': 'Заказ книги',
      'order.topicConsult': 'Консультация по выбору',
      'order.comment': 'Комментарий',
      'order.commentPlaceholder': 'Укажите книгу и дополнительную информацию',
      'order.agreement': 'Я согласен на обработку данных',
      'order.submit': 'Отправить заявку',
      'order.success': 'Заявка успешно отправлена! Мы свяжемся с вами.',

      /* ---------- Контакты ---------- */
      'contacts.title': 'Контакты',
      'contacts.intro': 'Свяжитесь с нами — поможем выбрать книгу и ответим на вопросы о заказе.',
      'contacts.phone': 'Телефон: +7 (900) 000-00-00',
      'contacts.email': 'E-mail: info@pereplyot.example',
      'contacts.address': 'Адрес: г. Москва, ул. Книжная, д. 1',
      'contacts.hours': 'Часы работы: ежедневно с 10:00 до 21:00',
      'contacts.feedback.title': 'Обратная связь',
      'contacts.feedback.text': 'Для отправки заявки на книгу используйте форму на странице «Заявка».',
      'contacts.feedback.button': 'Перейти к форме',

      /* ---------- Настройки ---------- */
      'settings.title': 'Настройки',
      'settings.intro': 'Настройте внешний вид и язык интерфейса. Изменения сохраняются и применяются на всех страницах магазина.',
      'settings.theme.legend': 'Тема оформления',
      'settings.theme.light': 'Светлая («Пыльная роза»)',
      'settings.theme.dark': 'Тёмная',
      'settings.lang.legend': 'Язык интерфейса',
      'settings.save': 'Сохранить настройки',
      'settings.reset': 'Сбросить по умолчанию',
      'settings.saved': 'Настройки сохранены.',
      'settings.resetDone': 'Настройки сброшены по умолчанию.'
    },

    en: {
      /* ---------- Общее / навигация ---------- */
      'skipLink': 'Skip to main content',
      'logo': 'Pereplyot',
      'nav.home': 'Home',
      'nav.catalog': 'Catalog',
      'nav.product': 'Book page',
      'nav.order': 'Request',
      'nav.contacts': 'Contacts',
      'nav.settings': 'Settings',
      'nav.menu.open': 'Open menu',
      'nav.menu.label': 'Main navigation',
      'breadcrumbs.label': 'Breadcrumbs',
      'breadcrumbs.home': 'Home',
      'footer.copy': '© 2026 Bookstore “Pereplyot”. All rights reserved.',
      'toTop': 'Back to top',

      /* ---------- Мета-информация (title / description) ---------- */
      'meta.index.title': 'Pereplyot — Bookstore',
      'meta.index.description': 'Pereplyot bookstore — classics and contemporary prose.',
      'meta.catalog.title': 'Book Catalog — Pereplyot',
      'meta.catalog.description': 'Book catalog of the Pereplyot online store.',
      'meta.product.title': 'Zamyatin, We — Pereplyot',
      'meta.product.description': 'Book page for “We” by Yevgeny Zamyatin — specs, price, request form.',
      'meta.order.title': 'Place a Request — Pereplyot',
      'meta.order.description': 'Place a book request in the Pereplyot online store.',
      'meta.contacts.title': 'Contacts — Pereplyot',
      'meta.contacts.description': 'Contacts of the Pereplyot online store.',
      'meta.settings.title': 'Settings — Pereplyot',
      'meta.settings.description': 'Pereplyot store settings: theme and interface language.',

      /* ---------- Главная ---------- */
      'index.hero.title': 'Pereplyot Bookstore',
      'index.hero.text': 'Books live here — from classics to contemporary prose. We carefully curate editions so you find exactly the story you need.',
      'index.hero.button': 'Browse books',
      'index.hero.imageAlt': 'A stack of books in a bookstore interior',
      'index.popular.title': 'Popular books',

      'book.zamyatin.title': 'Zamyatin, We',
      'book.zamyatin.desc': 'A dystopian novel about a totalitarian future and the price of personal freedom.',
      'book.zamyatin.price': 'Price: 1000 RUB',
      'book.zamyatin.alt': 'Cover of “We” by Yevgeny Zamyatin',
      'book.zamyatin.badge': 'Bestseller',

      'book.gorky.title': 'Gorky, The Lower Depths',
      'book.gorky.desc': 'A play about people at the bottom of life and their hope for a better future.',
      'book.gorky.price': 'Price: 1500 RUB',
      'book.gorky.alt': 'Cover of “The Lower Depths” by Maxim Gorky',

      'book.tolstoy.title': 'Tolstoy, Anna Karenina',
      'book.tolstoy.desc': 'A great novel about love, family, and the tragic fate of its heroine.',
      'book.tolstoy.price': 'Price: 2000 RUB',
      'book.tolstoy.alt': 'Cover of “Anna Karenina” by Leo Tolstoy',

      'book.astafiev.title': 'Astafiev, The King Fish',
      'book.astafiev.desc': 'A narrative in stories about Siberia, humans, and nature.',
      'book.astafiev.price': 'Price: 1200 RUB',
      'book.astafiev.alt': 'Cover of “The King Fish” by Viktor Astafiev',
      'book.astafiev.badge': 'Sale',

      'book.hugo.title': 'Hugo, Les Misérables',
      'book.hugo.desc': 'A novel about justice, mercy, and hope in 19th-century French society.',
      'book.hugo.price': 'Price: 1800 RUB',
      'book.hugo.alt': 'Cover of “Les Misérables” by Victor Hugo',
      'book.hugo.badge': 'New',

      'book.paustovsky.title': 'Paustovsky, Story of a Life',
      'book.paustovsky.desc': 'An autobiographical novella about childhood, youth, and the making of a writer.',
      'book.paustovsky.price': 'Price: 2200 RUB',
      'book.paustovsky.alt': 'Cover of “Story of a Life” by Konstantin Paustovsky',

      'book.order': 'Order',

      /* ---------- Бейджи и кнопки каталога ---------- */
      'badge.discount': 'Sale',
      'badge.outOfStock': 'Out of stock',
      'button.unavailable': 'Unavailable',

      'dialog.order.title': 'Place a Request',
      'dialog.order.name': 'Name',
      'dialog.order.namePlaceholder': 'Enter your name',
      'dialog.order.email': 'E-mail',
      'dialog.order.close': 'Close',
      'dialog.order.closeAria': 'Close the request dialog',
      'dialog.order.submit': 'Send request',
      'dialog.order.success': 'Request sent successfully! We will contact you.',

      /* ---------- Каталог ---------- */
      'catalog.title': 'Book Catalog',
      'catalog.intro': 'Classics, dystopia, and prose — pick a book you will love.',
      'catalog.filters.title': 'Filters',
      'catalog.filters.legend': 'Search and categories',
      'catalog.filters.searchLabel': 'Search by title',
      'catalog.filters.searchPlaceholder': 'Enter a title...',
      'catalog.filters.categoryLabel': 'Category',
      'catalog.filters.categoryAll': 'All books',
      'catalog.filters.categoryClassic': 'Classics',
      'catalog.filters.categoryProse': 'Prose',
      'catalog.filters.categoryForeign': 'Foreign',
      'catalog.filters.sortLabel': 'Sorting',
      'catalog.filters.sortAsc': 'Cheapest first',
      'catalog.filters.sortDesc': 'Most expensive first',
      'catalog.products.title': 'Book list',
      'catalog.empty': 'No books match the selected filters.',
      'catalog.count': 'Found: {n}',

      /* ---------- Карточка книги ---------- */
      'product.breadcrumb': 'Zamyatin, We',
      'product.alt': 'Cover of “We” by Yevgeny Zamyatin',
      'product.title': 'Zamyatin, We',
      'product.lead': '“We” is a dystopian novel by Yevgeny Zamyatin, written in 1920. The story takes place in the One State of the future.',
      'product.price': 'Price: 1000 RUB',
      'product.order': 'Place a request',
      'product.back': 'Back to catalog',
      'product.specs.caption': 'Book specifications',
      'product.specs.param': 'Parameter',
      'product.specs.value': 'Value',
      'product.specs.author': 'Author',
      'product.specs.authorValue': 'Yevgeny Zamyatin',
      'product.specs.category': 'Category',
      'product.specs.categoryValue': 'Dystopian novel',
      'product.specs.publisher': 'Publisher',
      'product.specs.publisherValue': 'Pereplyot-Classics',
      'product.specs.year': 'Publication year',
      'product.specs.yearValue': '2024',
      'product.specs.binding': 'Binding',
      'product.specs.bindingValue': 'Hardcover',
      'product.specs.pages': 'Pages',
      'product.specs.pagesValue': '320',

      /* ---------- Заявка ---------- */
      'order.title': 'Place a Request',
      'order.intro': 'Fill out the form below to request a book or ask a question.',
      'order.name': 'Name',
      'order.namePlaceholder': 'Enter your name',
      'order.email': 'E-mail',
      'order.phone': 'Phone',
      'order.phonePlaceholder': '+7 (900) 000-00-00',
      'order.topic': 'Request topic',
      'order.topicPlaceholder': 'Choose a topic',
      'order.topicBook': 'Book order',
      'order.topicConsult': 'Selection consultation',
      'order.comment': 'Comment',
      'order.commentPlaceholder': 'Specify the book and any additional information',
      'order.agreement': 'I agree to the processing of my data',
      'order.submit': 'Send request',
      'order.success': 'Request sent successfully! We will contact you.',

      /* ---------- Контакты ---------- */
      'contacts.title': 'Contacts',
      'contacts.intro': 'Get in touch — we will help you choose a book and answer your order questions.',
      'contacts.phone': 'Phone: +7 (900) 000-00-00',
      'contacts.email': 'E-mail: info@pereplyot.example',
      'contacts.address': 'Address: 1 Knizhnaya St., Moscow',
      'contacts.hours': 'Opening hours: daily from 10:00 to 21:00',
      'contacts.feedback.title': 'Feedback',
      'contacts.feedback.text': 'To submit a book request, use the form on the “Request” page.',
      'contacts.feedback.button': 'Go to the form',

      /* ---------- Настройки ---------- */
      'settings.title': 'Settings',
      'settings.intro': 'Customize the appearance and interface language. Changes are saved and applied across all store pages.',
      'settings.theme.legend': 'Theme',
      'settings.theme.light': 'Light (“Dusty Rose”)',
      'settings.theme.dark': 'Dark',
      'settings.lang.legend': 'Interface language',
      'settings.save': 'Save settings',
      'settings.reset': 'Reset to defaults',
      'settings.saved': 'Settings saved.',
      'settings.resetDone': 'Settings reset to defaults.'
    }
  };

  function t(key, lang) {
    const dict = DICT[lang] || DICT.ru;
    return dict[key] || DICT.ru[key] || key;
  }

  /* ---------- Перевод обычных текстовых элементов ---------- */
  function translatePage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      const key = el.getAttribute('data-i18n');
      el.textContent = t(key, lang);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-placeholder');
      el.setAttribute('placeholder', t(key, lang));
    });

    document.querySelectorAll('[data-i18n-aria-label]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-aria-label');
      el.setAttribute('aria-label', t(key, lang));
    });

    document.querySelectorAll('[data-i18n-alt]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-alt');
      el.setAttribute('alt', t(key, lang));
    });

    document.querySelectorAll('[data-i18n-title]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-title');
      el.setAttribute('title', t(key, lang));
    });

    const titleEl = document.querySelector('title[data-i18n]');
    if (titleEl) {
      titleEl.textContent = t(titleEl.getAttribute('data-i18n'), lang);
    }

    const metaDesc = document.querySelector('meta[name="description"][data-i18n]');
    if (metaDesc) {
      metaDesc.setAttribute('content', t(metaDesc.getAttribute('data-i18n'), lang));
    }

    document.querySelectorAll('[data-i18n-label]').forEach(function (el) {
      const key = el.getAttribute('data-i18n-label');
      el.setAttribute('data-label', t(key, lang));
    });

    document.documentElement.setAttribute('lang', lang);
  }

  function init() {
    const settings = window.PereplyotSettings
      ? window.PereplyotSettings.get()
      : { lang: 'ru' };
    translatePage(settings.lang);

    document.addEventListener('settings:changed', function (e) {
      translatePage(e.detail.lang);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  window.PereplyotI18n = { t: t, translatePage: translatePage };
})();