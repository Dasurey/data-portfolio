import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/Container';
import { SITE_INITIALS, SITE_NAME } from '@/config/site';

import { LanguageSwitcher } from './LanguageSwitcher';
import { MainNav } from './MainNav';
import { getSiteSettings } from '@/lib/site-settings';

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent';

/** Server Component: marca estática. Estado (ruta activa, menú, idioma) vive en islas de cliente. */
export async function Header() {
  const t = await getTranslations('Header');
  const { resumeUrl } = await getSiteSettings();

  return (
    <header className="sticky top-0 z-40 border-b border-ink/6 bg-white/70 backdrop-blur-lg backdrop-saturate-180">
      <Container className="flex items-center justify-between gap-6 py-[11px]">
        <Link href="/" className={`inline-flex items-center gap-3 rounded-md ${focusRing}`}>
          <span
            aria-hidden="true"
            className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-brand font-display text-base font-bold text-white shadow-[0_6px_16px_-7px_rgba(79,70,229,0.7)]"
          >
            {SITE_INITIALS}
          </span>
          <span className="flex flex-col leading-[1.1]">
            <span className="font-display text-[1.15rem] font-bold tracking-[-0.025em] text-ink">
              {SITE_NAME}
            </span>
            <span className="mt-[3px] hidden font-mono text-[9.5px] uppercase tracking-[0.15em] text-muted sm:block">
              {t('role')}
            </span>
          </span>
        </Link>

        <MainNav resumeUrl={resumeUrl}>
          <LanguageSwitcher />
        </MainNav>
      </Container>

      {/* header-strip de la base: 2px, indigo → violeta → transparente */}
      <div
        aria-hidden="true"
        className="h-0.5 bg-linear-to-r from-accent via-accent-2 to-transparent to-70% opacity-50"
      />
    </header>
  );
}