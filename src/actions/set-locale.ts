'use server';

import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

import { isLocale, LOCALE_COOKIE } from '@/i18n/config';

export async function setLocale(locale: string) {
  // Nunca confiar en el cliente: solo se aceptan idiomas soportados.
  if (!isLocale(locale)) return;

  const store = await cookies();
  store.set(LOCALE_COOKIE, locale, {
    path: '/',
    maxAge: 60 * 60 * 24 * 365,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  // La URL no cambia: solo invalidamos el render para que use el nuevo idioma.
  revalidatePath('/', 'layout');
}
