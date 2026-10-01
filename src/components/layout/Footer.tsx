import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/Container';
import { CONTACT_EMAIL, NAV_ITEMS, SITE_INITIALS, SITE_NAME, SOCIAL_LINKS } from '@/config/site';

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';
const linkClass = `text-[0.9rem] text-dark-link transition-colors hover:text-white motion-reduce:transition-none ${focusRing}`;
const microClass = 'mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-dark-soft';

/** .site-footer de la base: marca + texto + email | Pages | Elsewhere, y .footer-bottom. */
export async function Footer() {
  const t = await getTranslations('Footer');
  const tNav = await getTranslations('Nav');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-dark">
      <Container className="grid grid-cols-2 gap-x-8 gap-y-14 py-24 md:py-28 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-x-12 lg:py-32">
        {/* Izquierda: marca + texto + email */}
        <div className="col-span-2 lg:col-span-1">
          <Link href="/" className={`mb-[18px] inline-flex items-center gap-3 rounded-md ${focusRing}`}>
            <span
              aria-hidden="true"
              className="grid size-[34px] place-items-center rounded-[9px] bg-brand font-mono text-xs font-semibold text-white"
            >
              {SITE_INITIALS}
            </span>
            <span className="font-display text-[1.08rem] font-bold tracking-[-0.025em] text-white">
              {SITE_NAME}
            </span>
          </Link>

          <p className="mb-[22px] max-w-[34ch] text-[0.88rem] leading-[1.7] text-dark-soft">{t('blurb')}</p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className={`border-b border-accent-2/70 pb-[3px] font-display text-[1.12rem] font-semibold tracking-[-0.01em] text-white ${focusRing}`}
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        {/* Derecha: columnas de links */}
        <nav aria-label={t('pages')}>
          <h2 className={microClass}>{t('pages')}</h2>
          <ul className="flex flex-col items-start gap-[11px]">
            {NAV_ITEMS.map(({ href, key }) => (
              <li key={href}>
                <Link href={href} className={linkClass}>
                  {tNav(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label={t('elsewhere')}>
          <h2 className={microClass}>{t('elsewhere')}</h2>
          <ul className="flex flex-col items-start gap-[11px]">
            {SOCIAL_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {label} <span aria-hidden="true" className="text-[10px] opacity-60">↗</span>
                  <span className="sr-only"> {t('external')}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      {/* .footer-bottom */}
      <div className="border-t border-white/7">
        <Container className="flex flex-wrap items-center justify-between gap-x-[18px] gap-y-2.5 pb-[26px] pt-[18px] font-mono text-[0.78rem] text-dark-soft">
          <span>
            © {year} {SITE_NAME}. {t('rights')}
          </span>
          <span>{t('built')}</span>
        </Container>
      </div>
    </footer>
  );
}