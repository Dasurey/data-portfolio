import { getLocale, getTranslations } from 'next-intl/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

import { ProjectRow } from '@/components/home/ProjectRow';
import { Container } from '@/components/ui/Container';
import type { Locale } from '@/i18n/config';

export default async function ProjectsPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('Projects');
  const payload = await getPayload({ config: configPromise });

  const { docs: projects } = await payload.find({
    collection: 'projects',
    sort: '-createdAt',
    limit: 50,
    locale,
  });

  return (
    <>
      <section className="border-b border-line bg-grid">
        <Container className="pb-12 pt-11 sm:pb-14 sm:pt-[58px]">
          <h1 className="mb-4 font-display text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[3.2rem]">
            {t('title')}
          </h1>
          <p className="max-w-[58ch] text-pretty text-[1.05rem] leading-[1.65] text-ink-soft">{t('sub')}</p>
        </Container>
      </section>

      <section>
        <Container className="pb-16 pt-8 sm:pb-20">
          {projects.length === 0 ? (
            <p className="py-16 text-center font-mono text-sm text-muted">{t('empty')}</p>
          ) : (
            projects.map((project, index) => <ProjectRow key={project.id} project={project} index={index} />)
          )}
        </Container>
      </section>
    </>
  );
}