import Image from 'next/image';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

import { PhotoGallery } from '@/components/teo/PhotoGallery';
import { Container } from '@/components/ui/Container';
import type { Locale } from '@/i18n/config';

export default async function TeoPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('Teo');
  const payload = await getPayload({ config: configPromise });

  const teo = await payload.findGlobal({ slug: 'teo', depth: 1, locale });
  const hero = typeof teo.heroPhoto === 'object' ? teo.heroPhoto : null;
  const photos = (teo.photos ?? []).flatMap((photo) =>
    typeof photo === 'object' && photo.url
      ? [{ id: photo.id, src: photo.url, alt: photo.alt, width: photo.width ?? 1200, height: photo.height ?? 800 }]
      : [],
  );

  return (
    <>
      {/* .teo-hero.grid-bg */}
      <section className="border-b border-line bg-grid">
        <Container
          className={`grid items-center gap-8 pb-[70px] pt-12 lg:pt-[66px] ${hero?.url ? 'lg:grid-cols-2 lg:gap-[60px]' : ''}`}
        >
          <div data-reveal>
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">
              {teo.kicker || t('kicker')}
            </p>
            <h1 className="mb-[18px] font-display text-[2.6rem] font-bold leading-[1.04] tracking-[-0.035em] text-ink sm:text-[4.2rem]">
              {teo.title || t('title')}
            </h1>
            <p className="mb-[30px] max-w-[40ch] text-pretty font-display text-[1.35rem] leading-[1.45] tracking-[-0.015em] text-ink">
              {teo.lead || t('lead')}
            </p>
            <Link
              href="/"
              className="inline-block rounded-full border-[1.5px] border-line-strong bg-white px-6 py-[11px] text-[0.92rem] font-semibold leading-normal text-accent transition-colors hover:border-accent motion-reduce:transition-none"
            >
              {t('back')}
            </Link>
          </div>

          {hero?.url && (
            <div data-reveal>
              <Image
                src={hero.url}
                alt={hero.alt}
                width={hero.width ?? 1200}
                height={hero.height ?? 900}
                priority
                sizes="(min-width: 1024px) 540px, 100vw"
                className="block h-auto w-full rounded-[20px] shadow-[0_28px_60px_-26px_rgba(23,26,38,0.5)]"
                loading="eager"
              />
            </div>
          )}
        </Container>
      </section>

      {/* Galería */}
      <section>
        <Container className="pb-20 pt-14 sm:pt-[70px]">
          <div className="mb-7 flex flex-col gap-2.5 border-b border-line pb-5 sm:flex-row sm:items-end sm:justify-between sm:gap-10" data-reveal>
            <h2 className="font-display text-[2rem] font-bold tracking-[-0.03em] text-ink">
              {teo.galleryTitle || t('galleryTitle')}
            </h2>
            {photos.length > 0 && (
              <p className="font-mono text-[0.92rem] text-muted">{t('count', { count: photos.length })}</p>
            )}
          </div>

          {photos.length > 0 ? (
            <PhotoGallery photos={photos} labels={{ close: t('close'), prev: t('prev'), next: t('next') }} />
          ) : (
            <p className="py-16 text-center font-mono text-sm text-muted">{t('empty')}</p>
          )}
        </Container>
      </section>
    </>
  );
}