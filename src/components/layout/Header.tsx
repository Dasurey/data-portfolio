import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/Container';
import { SITE_INITIALS, SITE_NAME } from '@/config/site';

import { LanguageSwitcher } from './LanguageSwitcher';
import { MainNav } from './MainNav';

/**
 * Server Component: la marca es estática. Solo lo que necesita estado
 * (ruta activa, menú móvil, selector de idioma) es una isla de cliente.
 * Patrón del repo: marca (logo + nombre + subtítulo) | nav | último control.
 */
export async function Header() {
  const t = await getTranslations('Header');

  return (
    // border-b fino = interpretación del `header-strip` del repo
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between gap-6 md:h-20">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-md focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600"
        >
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-md bg-slate-900 font-mono text-sm font-semibold text-white"
          >
            {SITE_INITIALS}
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold text-slate-900">{SITE_NAME}</span>
            <span className="hidden font-mono text-xs text-slate-500 sm:block">{t('role')}</span>
          </span>
        </Link>

        <MainNav>
          <LanguageSwitcher />
        </MainNav>
      </Container>
    </header>
  );
}
