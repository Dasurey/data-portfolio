'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { setLocale } from '@/actions/set-locale';
import { locales, type Locale } from '@/i18n/config';

/**
 * Cambia el idioma SIN tocar la URL:
 *   1. Server Action → escribe la cookie.
 *   2. router.refresh() → re-renderiza los Server Components con el nuevo idioma.
 */
export function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const current = useLocale();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  function change(next: Locale) {
    if (next === current) return;

    startTransition(async () => {
      await setLocale(next);
      router.refresh();
    });
  }

  return (
    <div
      role="group"
      aria-label={t('label')}
      className="flex items-center rounded-full border border-line-strong bg-white p-0.5 font-mono text-xs"
    >
      {locales.map((locale) => {
        const active = locale === current;

        return (
          <button
            key={locale}
            type="button"
            lang={locale}
            aria-pressed={active}
            aria-label={t(locale)}
            disabled={isPending}
            onClick={() => change(locale)}
            className={`rounded-full px-2.5 py-1 transition-colors motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              active ? 'bg-brand text-white' : 'text-muted hover:text-accent'
            }`}
          >
            {locale.toUpperCase()}
          </button>
        );
      })}
    </div>
  );
}
