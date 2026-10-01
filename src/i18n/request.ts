import { cookies } from 'next/headers';
import { getRequestConfig } from 'next-intl/server';

import { defaultLocale, isLocale, LOCALE_COOKIE } from './config';

/**
 * Sin i18n routing: el idioma sale de la cookie, nunca de la URL.
 * Si no hay cookie (o es inválida) se usa el idioma por defecto: inglés.
 */
export default getRequestConfig(async () => {
  const store = await cookies();
  const cookieValue = store.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(cookieValue) ? cookieValue : defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
