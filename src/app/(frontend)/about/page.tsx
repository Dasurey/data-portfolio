import Image from 'next/image';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

import { ExperienceItem } from '@/components/layout/ExperienceItem';
import { Container } from '@/components/ui/Container';
import { SITE_INITIALS, SITE_NAME } from '@/config/site';
import type { Locale } from '@/i18n/config';
import { getSiteSettings } from '@/lib/site-settings';
import type { Metadata } from 'next';

const focusRing = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';
const photoClass = 'aspect-square w-full rounded-[18px] shadow-[0_22px_50px_-24px_rgba(23,26,38,0.45)]';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');

  return {
    title: {
      absolute: `${SITE_NAME} — ${t('aboutTitle')}`,
    },
    description: t('aboutDescription'),
  };
}

// Sin <main> propio: el layout ya lo provee.
export default async function AboutPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('About');
  const homeT = await getTranslations('Home');
  const payload = await getPayload({ config: configPromise });
  const { photo, resumeUrl } = await getSiteSettings();

  const { docs: experience } = await payload.find({
    collection: 'experience',
    sort: '-startDate',
    locale,
  });

  return (
    <>
      {/* Intro: .grid-bg + .pad-intro de la base */}
      <section className="border-b border-line bg-grid">
        <Container className="pb-[52px] pt-11 sm:pb-16 sm:pt-[58px]">
          {/* .intro-head */}
          <div className="mb-11 max-w-[70ch]" data-reveal>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{t('kicker')}</p>
            <h1 className="mb-[18px] font-display text-[2.6rem] font-bold leading-[1.04] tracking-[-0.035em] text-ink sm:text-[3.4rem]">
              {t('title')}
            </h1>
            <p className="max-w-[46ch] text-pretty font-medium text-[1.32rem] leading-[1.45] tracking-[-0.018em] text-ink">
              {t('lead')}
            </p>
          </div>

          {/* .intro-grid: foto + botones | bio */}
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-9 lg:grid-cols-[330px_minmax(0,1fr)] lg:gap-14" data-reveal>
            <div>
              {photo ? (
                <Image
                  src={photo.src}
                  alt={SITE_NAME}
                  width={660}
                  height={660}
                  priority
                  className={`${photoClass} object-cover object-[center_18%]`}
                  loading="eager"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className={`${photoClass} grid place-items-center bg-brand font-display text-6xl font-bold text-white`}
                >
                  {SITE_INITIALS}
                </div>
              )}

              {/* .intro-btns */}
              <div className="mt-4 flex gap-2.5">
                <Link
                  href="/projects"
                  className={`flex-1 rounded-full bg-brand px-[18px] py-3 text-center text-[0.9rem] font-semibold leading-normal text-white shadow-[0_8px_22px_-8px_rgba(79,70,229,0.55)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(79,70,229,0.7)] motion-reduce:transition-none motion-reduce:hover:translate-y-0 ${focusRing}`}
                >
                  {t('selectedWork')}
                </Link>

                {resumeUrl && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`rounded-full border-[1.5px] border-line-strong bg-white px-5 py-[11px] text-center text-[0.9rem] font-semibold leading-normal text-accent transition-colors hover:border-accent motion-reduce:transition-none ${focusRing}`}
                  >
                    {t('resume')}
                  </a>
                )}
              </div>
            </div>

            {/* .intro-body */}
            <div className="space-y-[18px] pt-1 text-[1.04rem] text-ink-soft">
              <p className="max-w-[64ch] text-pretty">{t('bio1')}</p>
              <p className="max-w-[64ch] text-pretty">{t('bio2')}</p>
              <p className="max-w-[64ch] text-pretty">{t('bio3')}</p>
            </div>
          </div>
        </Container>
      </section>

      {/* Experiencia: .pad-exp + .sechead--exp + .timeline */}
      <section>
        <Container className="pb-16 pt-[52px] sm:pb-20 sm:pt-[66px]">
          <div className="mb-2.5 flex flex-col items-start gap-[11px] border-b border-line pb-[22px]" data-reveal>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
                {t('experienceKicker')}
              </p>
              <h2 className="text-balance font-display text-[1.8rem] font-bold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[2.3rem]">
                {t('experienceTitle')}
              </h2>
            </div>
            <p className="max-w-[58ch] text-pretty text-[0.98rem] text-muted">{t('experienceSub')}</p>
          </div>

          <div className="max-w-[920px]">
            {experience.map((item, index) => (
              <div key={item.id} data-reveal>
                <ExperienceItem
                  item={item}
                  isLast={index === experience.length - 1}
                  nowLabel={t('current')}
                  currentLabel={t('badgeCurrent')}
                  stackLabel={t('skillsTools')}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}