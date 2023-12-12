import * as Locales from 'date-fns/locale';
import i18next from 'i18next';

const getDefaultLocale = () => {

  // Warning will not be shown for non-regional English configuration.
  if (i18next.language !== 'en') {
    console.warn(`[YvY App] Selected Locale (${i18next.language}) not supported on date-fns. Returning default language (enUS)`);
  }

  return Locales.enUS;
}

export const getDateFnsLocale = () => {
  return Locales[i18next.language] ?? getDefaultLocale();
};
