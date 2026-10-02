import Link from 'next/link';

import type { Project } from '@/payload-types';

const pill = 'rounded-full border border-accent/14 bg-accent/8 px-2.5 py-1 text-[0.72rem] font-semibold text-accent-ink';

/** .row-link de la base: índice | título + stack | descripción | métricas. */
export function ProjectRow({ project, index }: { project: Project; index: number }) {
  const stack = (project.techStack ?? []).flatMap((s) => (s.name ? [s.name] : []));
  const metrics = (project.metrics ?? []).filter((m) => m.value).slice(0, 3);
  const columns =
    metrics.length > 0
      ? 'lg:grid-cols-[44px_minmax(0,1fr)_minmax(0,1.05fr)_200px]'
      : 'lg:grid-cols-[44px_minmax(0,1fr)_minmax(0,1.4fr)]';

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`grid grid-cols-[34px_minmax(0,1fr)] gap-4 rounded-xl border-b border-line py-[30px] pl-2.5 pr-[18px] transition-[background-color,transform] hover:translate-x-1 hover:bg-accent/[0.045] motion-reduce:transition-none motion-reduce:hover:translate-x-0 lg:items-start lg:gap-7 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${columns}`}
    >
      <span className="pt-[5px] font-mono text-xs text-index">{String(index + 1).padStart(2, '0')}</span>

      <span>
        {project.category && (
          <span className="mb-2 block text-[0.7rem] font-semibold uppercase tracking-[0.09em] text-accent">
            {project.category}
          </span>
        )}
        <span className="block font-display text-[1.28rem] font-bold leading-[1.25] tracking-[-0.02em] text-ink">
          {project.title}
        </span>
        {stack.length > 0 && (
          <span className="mt-[13px] flex flex-wrap gap-1.5">
            {stack.map((name) => (
              <span key={name} className={pill}>
                {name}
              </span>
            ))}
          </span>
        )}
      </span>

      <span className="col-start-2 text-pretty pt-0.5 text-[0.94rem] leading-[1.62] text-muted lg:col-start-auto">
        {project.description}
      </span>

      {metrics.length > 0 && (
        <span className="col-start-2 flex flex-wrap gap-x-[18px] gap-y-[11px] pt-0.5 lg:col-start-auto lg:flex-col">
          {metrics.map((metric) => (
            <span key={metric.id ?? metric.value} className="block">
              <b className="block font-display text-[0.98rem] leading-[1.2] text-ink">{metric.value}</b>
              {metric.label && <span className="text-[0.72rem] text-muted">{metric.label}</span>}
            </span>
          ))}
        </span>
      )}
    </Link>
  );
}