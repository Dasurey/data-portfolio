'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useState, type ReactNode } from 'react';

import { Container } from '@/components/ui/Container';
import { NAV_ITEMS, RESUME_URL } from '@/config/site';

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

/** Isla de cliente: ruta activa + menú móvil. Recibe el selector de idioma como children. */
export function MainNav({ children }: { children?: ReactNode }) {
  const t = useTranslations('Nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="flex items-center gap-3">
      {/* Desktop: .nav-link / .is-current de la base */}
      <nav aria-label={t('label')} className="hidden md:block">
        <ul className="flex items-center gap-1">
          {NAV_ITEMS.map(({ href, key }) => {
            const active = isActive(href);

            return (
              <li key={href}>
                <Link
                  href={href}
                  aria-current={active ? 'page' : undefined}
                  className={`inline-block rounded-[9px] px-3.5 py-2 text-[14.5px] leading-normal transition-colors motion-reduce:transition-none ${focusRing} ${
                    active
                      ? 'bg-accent/8 font-semibold text-ink hover:bg-accent/9 hover:text-accent'
                      : 'font-medium text-ink-soft hover:bg-accent/9 hover:text-accent'
                  }`}
                >
                  {t(key)}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* .nav-div */}
      <span aria-hidden="true" className="mx-3 hidden h-5 w-px bg-line-strong md:block" />

      {children}

      {/* Desktop: .nav-resume */}
      {RESUME_URL && (
        <a
          href={RESUME_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden rounded-full bg-brand px-[22px] py-2.5 text-[14.5px] font-semibold leading-normal text-white shadow-[0_6px_18px_-6px_rgba(79,70,229,0.6)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-8px_rgba(79,70,229,0.7)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 md:inline-block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {t('resume')}
        </a>
      )}

      {/* Móvil: .nav-toggle */}
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={t('menu')}
        onClick={() => setOpen((value) => !value)}
        className={`grid size-[42px] place-items-center rounded-[11px] border border-line-strong bg-white text-accent md:hidden ${focusRing}`}
      >
        <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      {/* Móvil: panel posicionado respecto al <header> sticky */}
      <nav
        id="mobile-nav"
        hidden={!open}
        aria-label={t('label')}
        className="absolute inset-x-0 top-full border-b border-line bg-white shadow-[0_18px_40px_-22px_rgba(23,26,38,0.4)] md:hidden"
      >
        <Container className="pb-5 pt-3">
          <ul className="flex flex-col gap-0.5">
            {NAV_ITEMS.map(({ href, key }) => {
              const active = isActive(href);

              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? 'page' : undefined}
                    onClick={() => setOpen(false)}
                    className={`block rounded-[9px] px-3 py-2.5 text-[15px] ${focusRing} ${
                      active ? 'bg-accent/8 font-semibold text-ink' : 'font-medium text-ink-soft'
                    }`}
                  >
                    {t(key)}
                  </Link>
                </li>
              );
            })}
          </ul>
          {/* Móvil: .nav-resume */}
          {RESUME_URL && (
            <a
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full bg-brand px-[22px] py-2.5 text-center text-[14.5px] font-semibold text-white shadow-[0_6px_18px_-6px_rgba(79,70,229,0.6)]"
            >
              {t('resume')}
            </a>
          )}
        </Container>
      </nav>
    </div>
  );
}