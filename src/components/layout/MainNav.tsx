'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState, type ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { NAV_ITEMS } from '@/config/site';

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-indigo-600';

/**
 * Isla de cliente: estado activo de la ruta + menú móvil.
 * Recibe el selector de idioma como `children` para que el Header
 * siga siendo un Server Component.
 */
export function MainNav({ children }: { children?: ReactNode }) {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="flex items-center gap-3 md:gap-8">
      {/* Desktop */}
      <nav aria-label={t('label')} className="hidden md:block">
        <ul className="flex items-center gap-8">
          {NAV_ITEMS.map(({ href, key }) => {
            const active = isActive(href);

            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`text-sm font-medium transition-colors motion-reduce:transition-none ${focusRing} ${
                    active
                      ? 'text-slate-900 underline decoration-indigo-600 decoration-2 underline-offset-8'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {t(key)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Divisor: `nav-div` del repo, antes del último control */}
      <span aria-hidden="true" className="hidden h-5 w-px bg-slate-200 md:block" />

      {children}

      {/* Móvil: botón hamburguesa (`nav-toggle` del repo) */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={t('menu')}
        onClick={() => setOpen((value) => !value)}
        className={`grid size-9 place-items-center rounded-md border border-slate-200 text-slate-700 md:hidden ${focusRing}`}
      >
        <svg
          viewBox="0 0 24 24"
          className="size-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
        >
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {/* Móvil: panel. Se posiciona respecto al <header> (sticky) */}
      <nav
        id="mobile-nav"
        hidden={!open}
        aria-label={t('label')}
        className="absolute inset-x-0 top-full border-b border-slate-200 bg-white md:hidden"
      >
        <Container>
          <ul className="flex flex-col py-2">
            {NAV_ITEMS.map(({ href, key }) => {
              const active = isActive(href);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={`block py-3 text-base ${focusRing} ${
                      active ? 'font-semibold text-slate-900' : 'text-slate-600'
                    }`}
                  >
                    {t(key)}
                  </Link>
                </li>
              );
            })}
          </ul>
        </Container>
      </nav>
    </div>
  );
}
