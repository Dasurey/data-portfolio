import { getLocale, getTranslations } from 'next-intl/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

import { FeaturedProject } from '@/components/home/FeaturedProject';
import {
  ProjectsExplorer,
  type ExplorerFilter,
  type ExplorerSection,
} from '@/components/projects/ProjectsExplorer';
import { RESUME_URL } from '@/config/site';
import type { Locale } from '@/i18n/config';
import type { Project } from '@/payload-types';

const objects = (list: (number | Project)[] | null | undefined) =>
  (list ?? []).filter((item): item is Project => typeof item === 'object');

export default async function ProjectsPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('Projects');
  const payload = await getPayload({ config: configPromise });

  const [{ docs: projects }, page] = await Promise.all([
    payload.find({ collection: 'projects', sort: '-createdAt', limit: 100, depth: 1, locale }),
    payload.findGlobal({ slug: 'projects-page', depth: 1, locale }),
  ]);

  // La tarjeta grande es el proyecto marcado "Featured": no se repite como fila.
  const featured = projects.find((project) => project.featured) ?? null;

  // Cada proyecto aparece una sola vez, en la primera sección que lo incluya. La numeración sigue de corrido.
  const seen = new Set<number>(featured ? [featured.id] : []);
  let counter = 0;
  const take = (list: Project[]) =>
    list.flatMap((project) => {
      if (seen.has(project.id)) return [];
      seen.add(project.id);
      counter += 1;
      return [{ project, index: counter - 1 }];
    });

  const sections: ExplorerSection[] = (page.sections ?? []).map((section) => ({
    id: section.id ?? section.title,
    title: section.title,
    description: section.description ?? null,
    items: take(objects(section.projects)),
  }));

  // Los que no están en ninguna sección van al final, para que nunca queden ocultos.
  const rest = take(projects);
  if (rest.length > 0) {
    sections.push({ id: 'rest', title: sections.length > 0 ? t('moreWork') : null, description: null, items: rest });
  }

  const displayed = new Set<number>([
    ...(featured ? [featured.id] : []),
    ...sections.flatMap((section) => section.items.map((item) => item.project.id)),
  ]);

  const filters: ExplorerFilter[] = (page.filters ?? []).map((filter) => ({
    id: filter.id ?? filter.label,
    label: filter.label,
    ids: objects(filter.projects)
      .map((project) => project.id)
      .filter((id) => displayed.has(id)),
  }));

  return (
    <ProjectsExplorer
      kicker={t('kicker')}
      title={t('title')}
      lead={t('sub')}
      allLabel={t('all')}
      emptyLabel={t('noMatches')}
      filters={filters}
      sections={sections}
      featured={featured ? <FeaturedProject project={featured} /> : null}
      featuredId={featured?.id ?? null}
      cta={RESUME_URL ? { text: t('cta'), label: t('viewResume'), href: RESUME_URL } : null}
    />
  );
}