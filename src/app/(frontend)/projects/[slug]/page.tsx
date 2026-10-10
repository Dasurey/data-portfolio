import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

import { LivePreviewListener } from '@/components/LivePreviewListener';
import { PageBanner } from '@/components/projects/PageBanner';
import { ProjectContent } from '@/components/projects/ProjectContent';
import { Container } from '@/components/ui/Container';
import type { Locale } from '@/i18n/config';
import type { Metadata } from 'next';
import { SITE_NAME } from '@/config/site';

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    locale,
  });

  const project = docs[0];
  if (!project) return {};

  return {
    title: { absolute: `${SITE_NAME} — ${project.title}` },
    description: project.description ?? undefined,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const tNav = await getTranslations('Nav');
  const t = await getTranslations('Projects');
  const payload = await getPayload({ config: configPromise });

  // depth 2: las imágenes que van dentro de los bloques del editor llegan completas.
  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 2,
    locale,
  });

  const project = docs[0];
  if (!project) notFound();

  // Línea fija bajo la portada: los nombres de los filtros del proyecto.
  const kicker = (project.filterSubtitles ?? [])
    .flatMap((filterSubtitles) => (typeof filterSubtitles === 'object' && filterSubtitles.label ? [filterSubtitles.label] : []))
    .join(' · ');

  return (
    <>
      <LivePreviewListener />

      <PageBanner
        title={project.title}
        ariaLabel={t('breadcrumb')}
        crumbs={[
          { label: tNav('home'), href: '/' },
          { label: tNav('projects'), href: '/projects' },
          { label: project.title },
        ]}
      />

      <section>
        <Container className="pb-[60px] pt-[46px]">
          <div className="mx-auto max-w-[825px]" data-reveal>
            {kicker && <p className="mb-[18px] text-[16px] font-bold uppercase tracking-[0.16em] text-muted">{kicker}</p>}

            {project.content ? (
              <ProjectContent data={project.content} labels={{ copy: t('copy'), copied: t('copied') }} />
            ) : (
              project.description && <p className="text-[19px] leading-[1.7] text-[#1f2937]">{project.description}</p>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}