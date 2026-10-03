import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/Container';
import { SocialIcon } from '@/components/ui/SocialIcon';
import { CONTACT_EMAIL, PROFILE_PHOTO, SITE_INITIALS, SITE_NAME, SOCIAL_LINKS } from '@/config/site';

const photoClass = 'aspect-square w-full rounded-[18px] shadow-[0_22px_50px_-24px_rgba(23,26,38,0.45)]';

/** Sección 04: .about-grid de la base (foto + redes | kicker, cita, párrafos y botones). */
export async function AboutSection() {
  const t = await getTranslations('Home');

  return (
    <section className="border-y border-line bg-tint">
      <Container className="grid items-start gap-9 py-14 sm:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)] lg:gap-14 lg:py-[74px]">
        <div className="flex flex-col" data-reveal>
          {PROFILE_PHOTO ? (
            <Image
              src={PROFILE_PHOTO}
              alt={SITE_NAME}
              width={600}
              height={600}
              className={`${photoClass} object-cover object-[center_18%]`}
            />
          ) : (
            <div
              aria-hidden="true"
              className={`${photoClass} grid place-items-center bg-brand font-display text-6xl font-bold text-white`}
            >
              {SITE_INITIALS}
            </div>
          )}

          {/* .socials */}
          <div className="mt-[18px] flex justify-center gap-3">
            {SOCIAL_LINKS.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="inline-flex size-[54px] items-center justify-center rounded-[15px] border border-line-strong bg-white text-accent shadow-[0_2px_8px_rgba(23,26,38,0.06)] transition-[transform,box-shadow,background-color,color,border-color] hover:-translate-y-[3px] hover:border-transparent hover:bg-brand hover:text-white hover:shadow-[0_12px_26px_-10px_rgba(79,70,229,0.7)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <SocialIcon label={label} className="size-[22px]" />
              </a>
            ))}
          </div>
        </div>

        <div data-reveal>
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{t('aboutKicker')}</p>
          <p className="mb-4 max-w-[66ch] text-pretty font-display text-[1.02rem] font-medium leading-[1.5] tracking-[-0.02em] text-ink">
            {t('aboutP1')}
          </p>
          <p className="mb-4 max-w-[66ch] text-pretty text-[1.02rem] text-ink-soft">{t('aboutP2')}</p>
          <p className="mb-7 max-w-[66ch] text-pretty text-[1.02rem] text-ink-soft">{t('aboutP3')}</p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/about"
              className="rounded-full bg-brand px-[26px] py-3 text-[0.92rem] font-semibold leading-normal text-white shadow-[0_8px_22px_-8px_rgba(79,70,229,0.55)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(79,70,229,0.7)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              {t('aboutMore')}
            </Link>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="rounded-full border-[1.5px] border-line-strong bg-white px-6 py-[11px] text-[0.92rem] font-semibold leading-normal text-accent transition-colors hover:border-accent motion-reduce:transition-none"
            >
              {t('aboutContact')}
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}