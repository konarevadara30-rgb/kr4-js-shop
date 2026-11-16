/* ===================================
   i18n.js — простая локализация через data-i18n
   Подключается на всех страницах (defer).
   =================================== */
(function () {
  'use strict';

  const DICT = {
    ru: {
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