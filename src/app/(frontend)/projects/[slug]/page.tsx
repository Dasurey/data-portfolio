import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

import { PageBanner } from '@/components/projects/PageBanner';
import { ProjectBlocks } from '@/components/projects/ProjectBlocks';
import { Container } from '@/components/ui/Container';
import type { Locale } from '@/i18n/config';

type Props = { params: Promise<{ slug: string }> };

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const tNav = await getTranslations('Nav');
  const t = await getTranslations('Projects');
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    depth: 1,
    locale,
  });

  const project = docs[0];
  if (!project) notFound();

  // Línea fija bajo la portada: los nombres de los filtros del proyecto.
  const kicker = (project.filters ?? [])
    .flatMap((filter) => (typeof filter === 'object' && filter.label ? [filter.label] : []))
    .join(' · ');
  const blocks = project.blocks ?? [];

  return (
    <>
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
          <div className="mx-auto max-w-[825px]">
            {kicker && (
              <p className="mb-[18px] text-[16px] font-bold uppercase tracking-[0.16em] text-ink-soft">{kicker}</p>
            )}

            <ProjectBlocks blocks={blocks} />

            {/* Proyectos que todavía no tienen bloques: se muestra la descripción. */}
            {blocks.length === 0 && project.description && (
              <p className="text-[19px] leading-[1.7] text-[#1f2937]">{project.description}</p>
            )}
          </div>
        </Container>
      </section>
    </>
  );
}