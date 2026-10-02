import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

import RichText from '@/components/RichText';
import { Container } from '@/components/ui/Container';
import type { Locale } from '@/i18n/config';

type Props = { params: Promise<{ slug: string }> };

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations('Projects');
  const payload = await getPayload({ config: configPromise });

  const { docs } = await payload.find({
    collection: 'projects',
    where: { slug: { equals: slug } },
    limit: 1,
    locale,
  });

  const project = docs[0];
  if (!project) notFound();

  const stack = (project.techStack ?? []).flatMap((s) => (s.name ? [s.name] : []));
  const image = typeof project.image === 'object' ? project.image : null;

  return (
    <>
      <section className="border-b border-line bg-grid">
        <Container className="pb-12 pt-11 sm:pb-14 sm:pt-[58px]">
          <Link href="/projects" className="mb-6 inline-block font-mono text-xs text-muted transition-colors hover:text-accent">
            ← {t('back')}
          </Link>
          {project.category && (
            <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{project.category}</p>
          )}
          <h1 className="mb-4 max-w-[22ch] text-balance font-display text-[2.6rem] font-bold leading-[1.05] tracking-[-0.035em] text-ink sm:text-[3.2rem]">
            {project.title}
          </h1>
          <p className="mb-6 max-w-[62ch] text-pretty text-[1.05rem] leading-[1.65] text-ink-soft">{project.description}</p>

          {stack.length > 0 && (
            <div className="mb-6 flex flex-wrap gap-[7px]">
              {stack.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-accent/14 bg-accent/8 px-3 py-[5px] text-[0.74rem] font-semibold text-accent-ink"
                >
                  {name}
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-brand px-[26px] py-3 text-[0.92rem] font-semibold leading-normal text-white shadow-[0_8px_22px_-8px_rgba(79,70,229,0.55)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(79,70,229,0.7)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {t('liveDemo')}
              </a>
            )}
            {project.repositoryUrl && (
              <a
                href={project.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-[1.5px] border-line-strong bg-white px-6 py-[11px] text-[0.92rem] font-semibold leading-normal text-accent transition-colors hover:border-accent motion-reduce:transition-none"
              >
                {t('repository')}
              </a>
            )}
          </div>
        </Container>
      </section>

      <section>
        <Container className="py-14 sm:py-[70px]">
          {image?.url && (
            <Image
              src={image.url}
              alt={image.alt}
              width={image.width ?? 1600}
              height={image.height ?? 900}
              sizes="(min-width: 1160px) 1096px, 100vw"
              className="h-auto w-full rounded-[20px] shadow-[0_28px_60px_-26px_rgba(23,26,38,0.5)]"
            />
          )}
          {project.content && (
            <div className="mt-12 max-w-[70ch]">
              <RichText data={project.content} enableGutter={false} />
            </div>
          )}
        </Container>
      </section>
    </>
  );
}