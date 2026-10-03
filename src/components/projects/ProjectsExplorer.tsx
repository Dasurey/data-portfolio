'use client';

import { useState, type ReactNode } from 'react';

import { ProjectRow } from '@/components/home/ProjectRow';
import { Container } from '@/components/ui/Container';
import type { Project } from '@/payload-types';

export type ExplorerFilter = { id: string; label: string; ids: number[] };
export type ExplorerSection = {
  id: string;
  title: string | null;
  description: string | null;
  items: { project: Project; index: number }[];
};

type Props = {
  kicker: string;
  title: string;
  lead: string;
  allLabel: string;
  emptyLabel: string;
  filters: ExplorerFilter[];
  sections: ExplorerSection[];
  featured: ReactNode;
  featuredId: number | null;
  cta: { text: string; label: string; href: string } | null;
};

const chip =
  'inline-flex cursor-pointer items-center rounded-full border px-[18px] py-[9px] text-[0.85rem] font-semibold leading-normal transition-[background-color,color,border-color,box-shadow] duration-[180ms] motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

/** Página Projects de la base: hero con filtros, tarjeta destacada, secciones con filas y CTA final. */
export function ProjectsExplorer({
  kicker,
  title,
  lead,
  allLabel,
  emptyLabel,
  filters,
  sections,
  featured,
  featuredId,
  cta,
}: Props) {
  const [active, setActive] = useState('all');

  const total = sections.reduce((sum, section) => sum + section.items.length, 0) + (featuredId === null ? 0 : 1);
  const activeIds = active === 'all' ? null : new Set(filters.find((filter) => filter.id === active)?.ids ?? []);
  const matches = (id: number) => activeIds === null || activeIds.has(id);

  // Cada sección se reduce a los proyectos que cumplen el filtro; las que quedan vacías se ocultan.
  const visible = sections
    .map((section) => ({ ...section, items: section.items.filter((item) => matches(item.project.id)) }))
    .filter((section) => section.items.length > 0);
  const showFeatured = featuredId !== null && matches(featuredId);

  const options = [
    { id: 'all', label: allLabel, count: total },
    ...filters.map((filter) => ({ id: filter.id, label: filter.label, count: filter.ids.length })),
  ];

  return (
    <>
      {/* .page-head + .filters */}
      <section className="border-b border-line bg-grid">
        <Container className="pb-9 pt-12 sm:pb-11 sm:pt-14">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{kicker}</p>
          <h1 className="mb-4 max-w-[18ch] text-balance font-display text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[3.2rem]">
            {title}
          </h1>
          <p className="mb-7 max-w-[62ch] text-pretty text-[1.08rem] text-ink-soft">{lead}</p>

          {filters.length > 0 && (
            <div className="flex flex-wrap gap-[9px]">
              {options.map((option) => {
                const selected = option.id === active;

                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setActive(option.id)}
                    className={`${chip} ${
                      selected
                        ? 'border-transparent bg-brand text-white shadow-[0_8px_20px_-10px_rgba(79,70,229,0.7)]'
                        : 'border-line-strong bg-white text-ink-soft hover:border-accent hover:text-accent'
                    }`}
                  >
                    {option.label}
                    <span className="ml-[7px] font-mono text-[0.78rem] opacity-60">{option.count}</span>
                  </button>
                );
              })}
            </div>
          )}
        </Container>
      </section>

      {/* .projects-body */}
      <section>
        <Container className="pt-12 sm:pt-[60px]">
          {showFeatured && (
            <div className="mb-[60px]" data-reveal>
              {featured}
            </div>
          )}

          {visible.map((section, position) => (
            <div key={section.id} className={position === 0 ? '' : 'mt-[72px]'}>
              {section.title && (
                <div className="flex flex-col gap-2.5 border-b border-line pb-5" data-reveal>
                  <h2 className="text-balance font-display text-[1.75rem] font-bold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[2rem]">
                    {section.title}
                  </h2>
                  {section.description && (
                    <p className="max-w-[58ch] text-pretty text-[0.98rem] text-muted">{section.description}</p>
                  )}
                </div>
              )}

              <div className={section.title ? '' : 'border-t border-line'}>
                {section.items.map(({ project, index }) => (
                  <div key={project.id} data-reveal>
                    <ProjectRow project={project} index={index} />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {!showFeatured && visible.length === 0 && (
            <p className="py-16 text-center font-mono text-sm text-muted">{emptyLabel}</p>
          )}

          {/* .close-cta */}
          {cta && (
            <div className="py-[70px] text-center" data-reveal>
              <p className="mb-5 text-[1.05rem] text-ink-soft">{cta.text}</p>
              <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-brand px-7 py-[13px] text-[0.95rem] font-semibold leading-normal text-white shadow-[0_8px_22px_-8px_rgba(79,70,229,0.55)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(79,70,229,0.7)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {cta.label}
              </a>
            </div>
          )}
        </Container>
      </section>
    </>
  );
}