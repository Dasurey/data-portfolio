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

// Una relación llega como id o como documento (según `depth`): lo normalizamos a id.
type Ref = number | { id: number };
const idsOf = (list: Ref[] | null | undefined) =>
  (list ?? []).map((ref) => (typeof ref === 'object' ? ref.id : ref));

export default async function ProjectsPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('Projects');
  const payload = await getPayload({ config: configPromise });

  const [{ docs: projects }, { docs: filterDocs }, page] = await Promise.all([
    payload.find({ collection: 'projects', sort: '-createdAt', limit: 100, depth: 1, locale }),
    payload.find({ collection: 'project-filters', sort: 'createdAt', limit: 100, depth: 0, locale }),
    payload.findGlobal({ slug: 'projects-page', depth: 0, locale }),
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

  const pageSections = page.sections ?? [];

  // Una sección muestra los proyectos que tengan CUALQUIERA de sus filtros.
  const sections: ExplorerSection[] = pageSections.map((section) => {
    const wanted = new Set(idsOf(section.filters));

    return {
      id: section.id ?? section.title,
      title: section.title,
      description: section.description ?? null,
      items: take(projects.filter((project) => idsOf(project.filters).some((id) => wanted.has(id)))),
    };
  });

  // Los que no están en ninguna sección van al final, para que nunca queden ocultos.
  const rest = take(projects);
  if (rest.length > 0) {
    sections.push({ id: 'rest', title: sections.length > 0 ? t('moreWork') : null, description: null, items: rest });
  }

  const displayed = new Set<number>([
    ...(featured ? [featured.id] : []),
    ...sections.flatMap((section) => section.items.map((item) => item.project.id)),
  ]);

  // Botones: primero en el orden en que aparecen en las secciones, después el resto por fecha de creación.
  // Un filtro sin proyectos visibles no se muestra.
  const labels = new Map<number, string>(filterDocs.map((filter): [number, string] => [filter.id, filter.label]));
  const order = [
    ...new Set([...pageSections.flatMap((section) => idsOf(section.filters)), ...filterDocs.map((filter) => filter.id)]),
  ];

  const filters: ExplorerFilter[] = order.flatMap((filterId) => {
    const label = labels.get(filterId);
    const ids = projects
      .filter((project) => displayed.has(project.id) && idsOf(project.filters).includes(filterId))
      .map((project) => project.id);

    return label && ids.length > 0 ? [{ id: String(filterId), label, ids }] : [];
  });

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