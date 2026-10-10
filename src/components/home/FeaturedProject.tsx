import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import type { Project } from '@/payload-types';

import { DemoBrowser } from './DemoBrowser';

const pill = 'rounded-full border border-accent/14 bg-accent/8 px-3 py-[5px] text-[0.74rem] font-semibold text-accent-ink';

function hostOf(url?: string | null) {
  if (!url) return null;
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

/** .featured de la base: tarjeta destacada con la captura dentro de un marco de navegador. */
export async function FeaturedProject({ project }: { project: Project }) {
  const t = await getTranslations('Home');
  const tp = await getTranslations('Projects');

  const stack = (project.techStack ?? []).flatMap((tool) => (typeof tool === 'object' && tool.label ? [tool.label] : []));
  const image = typeof project.image === 'object' ? project.image : null;
  const host = hostOf(project.liveUrl);
  const detailHref = `/projects/${project.slug}`;

  const primary =
    'rounded-full bg-brand px-[26px] py-3 text-[0.92rem] font-semibold leading-normal text-white shadow-[0_8px_22px_-8px_rgba(79,70,229,0.55)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(79,70,229,0.7)] motion-reduce:transition-none motion-reduce:hover:translate-y-0';

  return (
    <div className="grid items-center gap-7 rounded-[20px] border border-indigo-500/[0.32] bg-linear-to-b from-indigo-500/7 to-accent-2/2 p-[26px] sm:p-9 lg:grid-cols-[minmax(0,0.86fr)_minmax(0,1.14fr)] lg:gap-11">
      <div>
        <span className="mb-4 inline-flex items-center gap-[9px] rounded-full bg-brand px-3.5 py-1.5 text-[0.72rem] font-semibold uppercase tracking-[0.08em] text-white">
          {project.liveUrl && (
            <span aria-hidden="true" className="border-y-4 border-l-[7px] border-y-transparent border-l-white" />
          )}
          {project.liveUrl ? t('liveBadge') : t('featuredBadge')}
        </span>
        <h3 className="mb-3.5 font-display text-[1.85rem] font-bold leading-[1.15] tracking-[-0.025em] text-ink">
          {project.title}
        </h3>
        <p className="mb-[18px] text-pretty text-base leading-[1.65] text-ink-soft">{project.description}</p>

        {stack.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-[7px]">
            {stack.map((name) => (
              <span key={name} className={pill}>
                {name}
              </span>
            ))}
          </div>
        )}

        <div className="flex flex-wrap items-center gap-3">
          {project.liveUrl ? (
            <>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={primary}>
                {tp('liveDemo')}
              </a>
              <Link
                href={detailHref}
                className="rounded-full border-[1.5px] border-line-strong bg-white px-6 py-[11px] text-[0.92rem] font-semibold leading-normal text-accent transition-colors hover:border-accent motion-reduce:transition-none"
              >
                {t('readMore')}
              </Link>
            </>
          ) : (
            <Link href={detailHref} className={primary}>
              {tp('viewProject')}
            </Link>
          )}
        </div>
      </div>

      {project.liveUrl && image?.url ? (
        <DemoBrowser
          url={project.liveUrl}
          host={host ?? project.liveUrl}
          title={project.title}
          imageSrc={image.url}
          imageAlt={image.alt}
          labels={{
            run: tp('runHere'),
            note: tp('runNote'),
            openNewTab: tp('openNewTab'),
            close: tp('close'),
          }}
        />
      ) : (
        <Link
          href={detailHref}
          aria-label={project.title}
          className="block overflow-hidden rounded-[14px] border border-slate-900/10 bg-white shadow-[0_22px_50px_-24px_rgba(15,23,42,0.55)]"
        >
          <div className="flex items-center gap-2 border-b border-[#e4e6f0] bg-[#f2f3f9] px-3.5 py-2.5">
            <span aria-hidden="true" className="flex gap-2">
              <span className="size-2.5 rounded-full bg-line" />
              <span className="size-2.5 rounded-full bg-line" />
              <span className="size-2.5 rounded-full bg-line" />
            </span>
            <span className="flex-1 truncate text-center font-mono text-[11px] text-muted">{host ?? project.slug}</span>
          </div>
          {image?.url && (
            <div className="relative h-[340px]">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 560px, 100vw"
                className="object-cover object-top"
              />
            </div>
          )}
        </Link>
      )}
    </div>
  );
}