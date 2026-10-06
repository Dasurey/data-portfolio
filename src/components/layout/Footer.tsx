import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/Container';
import { CONTACT_EMAIL, EXTERNAL_LINK, NAV_ITEMS, SITE_NAME, SOCIAL_LINKS } from '@/config/site';
import { getSiteSettings } from '@/lib/site-settings';
import { BrandMark } from '@/components/ui/BrandMark';

import { FooterNavLink } from './FooterNavLink';

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';
const linkClass = `text-[0.9rem] text-dark-link transition-colors hover:text-white motion-reduce:transition-none ${focusRing}`;
const microClass = 'mb-4 font-mono text-[10px] uppercase tracking-[0.16em] text-dark-soft';

/** .site-footer de la base: padding 58px arriba, línea inferior solo del ancho del contenido. */
export async function Footer() {
  const t = await getTranslations('Footer');
  const tNav = await getTranslations('Nav');
    // "Elsewhere": las redes + el link externo del header (el lugar de "The Wife" en la base)
  const elsewhere = [...SOCIAL_LINKS, ...(EXTERNAL_LINK ? [EXTERNAL_LINK] : [])];
  const { resumeUrl } = await getSiteSettings();

  return (
    <footer className="bg-dark">
      <Container className="pt-12 sm:pt-[58px]">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-[minmax(0,1fr)_auto_auto] sm:gap-9 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,1fr)] lg:gap-12">
          <div>
            <Link href="/" className={`mb-[18px] inline-flex items-center gap-3 rounded-md ${focusRing}`}>
              <BrandMark size={34} className="rounded-[9px] bg-white p-[3px]" />
              <span className="font-display text-[1.08rem] font-bold tracking-[-0.025em] text-white">{SITE_NAME}</span>
            </Link>

            <p className="mb-[22px] max-w-[34ch] text-[0.88rem] leading-[1.7] text-dark-soft">{t('blurb')}</p>

            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className={`border-b border-accent-2/70 pb-[3px] font-display text-[1.12rem] font-semibold tracking-[-0.01em] text-white ${focusRing}`}
            >
              {CONTACT_EMAIL}
            </a>
          </div>

          <nav aria-label={t('pages')}>
            <h2 className={microClass}>{t('pages')}</h2>
            <ul className="flex flex-col items-start gap-[11px]">
              {NAV_ITEMS.map(({ href, key }) => (
                <li key={href}>
                  <FooterNavLink href={href}>{tNav(key)}</FooterNavLink>
                </li>
              ))}
              {resumeUrl && (
                <li>
                  <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {tNav('resume')} <span aria-hidden="true" className="text-[10px] opacity-60">↗</span>
                  </a>
                </li>
              )}
            </ul>
          </nav>

          <nav aria-label={t('elsewhere')}>
            <h2 className={microClass}>{t('elsewhere')}</h2>
            <ul className="flex flex-col items-start gap-[11px]">
              {elsewhere.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                    {label} <span aria-hidden="true" className="text-[10px] opacity-60">↗</span>
                    <span className="sr-only"> {t('external')}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* .footer-bottom */}
        <div className="mt-11 flex flex-wrap items-center justify-between gap-x-[18px] gap-y-2.5 border-t border-white/7 pb-[26px] pt-[18px] font-mono text-[0.78rem] text-dark-soft">
          <span>© {new Date().getFullYear()} {SITE_NAME}</span>
          <span>{t('built')}</span>
        </div>
      </Container>
    </footer>
  );
}