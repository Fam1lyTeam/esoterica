import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    resources: {},
  });

export const loadLanguage = async (lang: string) => {
  if (!i18n.hasResourceBundle(lang, 'translation')) {
    const translations = await import(`./locales/${lang}.json`);
    i18n.addResourceBundle(lang, 'translation', translations.default);
  }
  i18n.changeLanguage(lang);
};

export default i18n;
