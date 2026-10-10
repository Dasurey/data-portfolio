import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { SKILL_ICONS } from '@/config/home';
import type { Locale } from '@/i18n/config';
import type { Project, Tool } from '@/payload-types';

const micro = 'font-mono text-[10px] uppercase tracking-[0.14em] text-muted';

/** Sección 03: .grid-skills de la base, alimentada por el global "Skills & tooling" del admin. */
export async function SkillsSection() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('Home');
  const payload = await getPayload({ config: configPromise });

  const skills = await payload.findGlobal({ slug: 'skills', depth: 1, locale });
  const groups = skills.groups ?? [];

  if (groups.length === 0) return null;

  return (
    <section>
      <Container className="py-14 sm:py-[74px]">
        <SectionHead plain className="mb-[38px]" kicker={t('skillsKicker')} title={t('skillsTitle')} sub={t('skillsSub')} />

        <div className="grid gap-6 lg:grid-cols-3" data-reveal>
          {groups.map((group) => {
            const Icon = SKILL_ICONS[group.icon ?? 'database'] ?? SKILL_ICONS.database;
            const projects = (group.projects ?? []).filter(
              (project): project is Project => typeof project === 'object' && project !== null,
            );

            const tools = (group.tools ?? []).filter(
              (tool): tool is Tool => typeof tool === 'object' && tool !== null,
            );

            return (
              <div key={group.id} className="flex flex-col rounded-[18px] border border-line bg-white p-[26px] shadow-soft">
                {/* .skill-head */}
                <div className="mb-5 flex items-center gap-[13px] border-b border-line pb-5">
                  <span className="grid size-[42px] shrink-0 place-items-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="size-[19px]" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-[1.08rem] font-bold tracking-[-0.015em] text-ink">{group.title}</h3>
                </div>

                {/* .skill-links: cada proyecto lleva a su caso de estudio */}
                <p className={`${micro} mb-3`}>{t('skillsFocus')}</p>
                {projects.length > 0 ? (
                  <ul className="mb-6 flex flex-col gap-px">
                    {projects.map((project) => (
                      <li key={project.id}>
                        <Link
                          href={`/projects/${project.slug}`}
                          className="-mx-3 flex items-center justify-between gap-3 rounded-[10px] px-3 py-[9px] text-[0.92rem] font-semibold text-accent-ink transition-colors hover:bg-accent/7 hover:text-accent motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                        >
                          {project.secondaryTitle ? (
                            <span>{project.secondaryTitle}</span>
                          ) : (
                            <span>{project.title}</span>
                          )}
                          <span aria-hidden="true" className="text-[0.85rem] text-accent/55">
                            →
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="mb-6 py-[9px] text-[0.92rem] text-muted">{t('skillsEmpty')}</p>
                )}

                {/* .skill-tools: calculadas desde el stack de los proyectos */}
                {tools.length > 0 && (
                  <div className="mt-auto">
                    <p className={`${micro} mb-[11px]`}>{t('skillsTools')}</p>

                    <div className="flex flex-wrap gap-1.5">
                      {tools.map((tool) => (
                        <span
                          key={tool.id}
                          className="inline-block rounded-[7px] border border-[#eceef6] bg-[#f4f5fa] px-2.5 py-1 text-[0.74rem] font-medium text-muted"
                        >
                          {tool.label}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}