/* ===================================
   settings.js — тема и язык
   Подключается на ВСЕХ страницах (defer).
   =================================== */
(function () {
  'use strict';

  const STORAGE_KEY = 'pereplyot-settings';

  const DEFAULT_SETTINGS = {
    theme: 'light',
    lang: 'ru'
  };

  function loadSettings() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT_SETTINGS };
      const parsed = JSON.parse(raw);
      return { ...DEFAULT_SETTINGS, ...parsed };
    } catch (e) {
      console.warn('Не удалось прочитать настройки:', e);
      return { ...DEFAULT_SETTINGS };
    }
  }

  function saveSettings(settings) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Не удалось сохранить настройки:', e);
    }
  }

  function applySettings(settings) {
    document.documentElement.setAttribute('data-theme', settings.theme);
    document.documentElement.setAttribute('lang', settings.lang);
    document.dispatchEvent(new CustomEvent('settings:changed', { detail: settings }));
  }

  // Инициализация
  const current = loadSettings();
  applySettings(current);

  // Синхронизация между вкладками
  window.addEventListener('storage', function (e) {
    if (e.key === STORAGE_KEY) {
      applySettings(loadSettings());
    }
  });

  window.PereplyotSettings = {
    get: loadSettings,
    save: saveSettings,
    apply: applySettings,
    defaults: DEFAULT_SETTINGS
  };
})();

/* ===================================
   Логика страницы настроек
   Выполняется только при наличии #settings-form
   =================================== */
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('settings-form');
  if (!form) return;

  const msg = document.getElementById('settings-message');
  const resetBtn = document.getElementById('settings-reset');

  function fillForm(settings) {
    const themeInput = form.querySelector(`input[name="theme"][value="${settings.theme}"]`);
    const langInput = form.querySelector(`input[name="lang"][value="${settings.lang}"]`);
    if (themeInput) themeInput.checked = true;
    if (langInput) langInput.checked = true;
  }

  function showMessage(text) {
    if (!msg) return;
    msg.textContent = text;
    msg.hidden = false;
    setTimeout(function () { msg.hidden = true; }, 3000);
  }

  const settings = window.PereplyotSettings.get();
  fillForm(settings);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = new FormData(form);
    const newSettings = {
      theme: data.get('theme') || 'light',
      lang: data.get('lang') || 'ru'
    };
    window.PereplyotSettings.save(newSettings);
    window.PereplyotSettings.apply(newSettings);
    fillForm(newSettings);

    const text = window.PereplyotI18n
      ? window.PereplyotI18n.t('settings.saved', newSettings.lang)
      : 'Настройки сохранены.';
    showMessage(text);
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      const def = window.PereplyotSettings.defaults;
      window.PereplyotSettings.save(def);
      window.PereplyotSettings.apply(def);
      fillForm(def);

      const text = window.PereplyotI18n
        ? window.PereplyotI18n.t('settings.resetDone', def.lang)
        : 'Настройки сброшены.';
      showMessage(text);
    });
  }
});