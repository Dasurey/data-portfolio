import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/Container';
import { CONTACT_EMAIL, NAV_ITEMS, SITE_INITIALS, SITE_NAME, SOCIAL_LINKS } from '@/config/site';

const focusRing =
  'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white';

const linkClass = `text-base text-slate-300 transition-colors hover:text-white motion-reduce:transition-none ${focusRing}`;

/**
 * Patrón del repo: `.footer-grid` de 3 columnas
 * (marca + texto + email | Pages | Elsewhere) y una fila `.footer-bottom`.
 * Es el único elemento "audaz" del sitio: el resto se mantiene en silencio.
 *
 * Contraste: slate-400 sobre slate-900 cumple AA; slate-500 no, por eso no se usa aquí.
 */
export async function Footer() {
  const t = await getTranslations('Footer');
  const tNav = await getTranslations('Nav');
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300">
      {/* Padding enorme (py-24 → py-40) = ancla visual */}
      <Container className="grid grid-cols-2 gap-x-8 gap-y-16 py-24 md:py-32 lg:grid-cols-[2fr_1fr_1fr] lg:gap-x-24 lg:py-40">
        {/* Izquierda: marca + texto + email */}
        <div className="col-span-2 max-w-md lg:col-span-1">
          <Link href="/" className={`inline-flex items-center gap-3 rounded-md text-white ${focusRing}`}>
            <span
              aria-hidden="true"
              className="grid size-9 place-items-center rounded-md bg-white font-mono text-sm font-semibold text-slate-900"
            >
              {SITE_INITIALS}
            </span>
            <span className="text-base font-semibold">{SITE_NAME}</span>
          </Link>

          <p className="mt-6 text-base leading-relaxed text-slate-400">{t('blurb')}</p>

          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className={`mt-10 inline-block font-mono text-lg text-white underline decoration-slate-600 underline-offset-8 transition-colors hover:decoration-white motion-reduce:transition-none md:text-2xl ${focusRing}`}
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        {/* Derecha: columnas de links */}
        <nav aria-label={t('pages')}>
          <h2 className="font-mono text-sm text-slate-400">{t('pages')}</h2>
          <ul className="mt-6 space-y-4">
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
          <h2 className="font-mono text-sm text-slate-400">{t('elsewhere')}</h2>
          <ul className="mt-6 space-y-4">
            {SOCIAL_LINKS.map(({ href, label }) => (
              <li key={href}>
                <a href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {label} <span aria-hidden="true">↗</span>
                  <span className="sr-only"> {t('external')}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      {/* Fila inferior: equivale a `.footer-bottom` del repo */}
      <div className="border-t border-slate-800">
        <Container className="flex flex-col gap-2 py-8 font-mono text-xs text-slate-400 md:flex-row md:justify-between">
          <span>
            © {year} {SITE_NAME}. {t('rights')}
          </span>
          <span>{t('built')}</span>
        </Container>
      </div>
    </footer>
  );
}
