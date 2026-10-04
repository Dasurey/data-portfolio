import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';

import RichText from '@/components/RichText';
import type { Project } from '@/payload-types';

import { CodeBlock } from './CodeBlock';

type Block = NonNullable<Project['blocks']>[number];

const richBase =
  'text-pretty [&_a]:underline [&_a]:underline-offset-2 [&_code]:rounded-[5px] [&_code]:bg-indigo-500/8 [&_code]:px-1.5 [&_code]:py-px [&_code]:text-[0.875rem] [&_code]:text-pink-600 [&_li]:mb-2 [&_ol]:mb-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_p]:mb-[18px] [&_ul]:mb-5 [&_ul]:list-disc [&_ul]:pl-5';

const primary =
  'inline-block rounded-full bg-brand px-[26px] py-3 text-[0.92rem] font-semibold leading-normal text-white shadow-[0_8px_22px_-8px_rgba(79,70,229,0.55)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(79,70,229,0.7)] motion-reduce:transition-none motion-reduce:hover:translate-y-0';
const ghost =
  'inline-block rounded-full border-[1.5px] border-line-strong bg-white px-6 py-[11px] text-[0.92rem] font-semibold leading-normal text-accent transition-colors hover:border-accent motion-reduce:transition-none';

/** Link interno (empieza con "/") o externo, con pestaña nueva opcional. */
function SmartLink({
  href,
  newTab,
  className,
  children,
}: {
  href: string;
  newTab?: boolean | null;
  className?: string;
  children: ReactNode;
}) {
  if (href.startsWith('/')) {
    return (
      <Link href={href} className={className}>
        {children}
      </Link>
    );
  }

  return (
    <a href={href} className={className} {...(newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
      {children}
    </a>
  );
}

function hostOf(url?: string | null) {
  if (!url) return null;
  try {
    return new URL(url).host;
  } catch {
    return null;
  }
}

/** YouTube y Vimeo se incrustan; cualquier otro link se trata como archivo de video. */
function embedUrl(url: string) {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace(/^(www|m)\./, '');
    const parts = parsed.pathname.split('/').filter(Boolean);

    if (host === 'youtu.be' && parts[0]) return `https://www.youtube-nocookie.com/embed/${parts[0]}`;
    if (host === 'youtube.com') {
      const id = parsed.searchParams.get('v') ?? (parts[0] !== 'watch' ? parts[parts.length - 1] : null);
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : null;
    }
    if (host === 'vimeo.com' && parts[0]) return `https://player.vimeo.com/video/${parts[0]}`;
  } catch {
    // URL inválida: se muestra como archivo.
  }
  return null;
}

/** Cuerpo de la página de un proyecto: cada bloque del admin, en el orden en que se cargó. */
export async function ProjectBlocks({ blocks }: { blocks: Block[] }) {
  const t = await getTranslations('Projects');
  let firstHeading = true;

  return (
    <>
      {blocks.map((block, index) => {
        const wrap = (node: ReactNode) => (
          <div key={block.id ?? index} data-reveal>
            {node}
          </div>
        );

        switch (block.blockType) {
          case 'prjText':
            return wrap(
              <RichText
                data={block.body}
                enableGutter={false}
                enableProse={false}
                className={`${richBase} ${
                  block.size === 'lede'
                    ? 'text-[19px] leading-[1.7] text-[#1f2937]'
                    : 'text-[16px] leading-[1.8] text-[#4b5563]'
                }`}
              />,
            );

          case 'prjHeading': {
            const first = firstHeading;
            firstHeading = false;

            return wrap(
              block.level === 'h3' ? (
                <h3
                  className={`${first ? 'mt-0' : 'mt-8'} mb-3 font-display text-[1.35rem] font-bold tracking-[-0.02em] text-ink`}
                >
                  {block.text}
                </h3>
              ) : (
                <h2
                  className={`${first ? 'mt-0' : 'mt-10'} mb-3.5 text-balance font-display text-[1.8rem] font-bold leading-[1.2] tracking-[-0.03em] text-ink`}
                >
                  {block.text}
                </h2>
              ),
            );
          }

          case 'prjCallout':
            return wrap(
              <p className="my-[22px] rounded-[10px] border border-l-[3px] border-indigo-500/16 border-l-indigo-500 bg-indigo-500/6 px-[18px] py-3.5 text-[14px] leading-[1.6] text-[#5b6373]">
                {block.text}
              </p>,
            );

          case 'prjMetrics':
            return wrap(
              <ul className="my-6 flex flex-wrap gap-x-[30px] gap-y-4 border-y border-line py-5">
                {(block.items ?? []).map((item, i) => (
                  <li key={item.id ?? i}>
                    <b className="block font-display text-[1.5rem] font-bold leading-[1.1] text-ink">{item.value}</b>
                    {item.label && <span className="text-[0.8rem] text-muted">{item.label}</span>}
                  </li>
                ))}
              </ul>,
            );

          case 'prjImage': {
            const media = typeof block.image === 'object' ? block.image : null;
            if (!media?.url) return null;

            const picture = (
              <Image
                src={media.url}
                alt={media.alt}
                width={media.width ?? 1600}
                height={media.height ?? 900}
                sizes="(min-width: 860px) 825px, 100vw"
                className="block h-auto w-full"
              />
            );

            const framed =
              block.frame === 'browser' ? (
                <div className="overflow-hidden rounded-[14px] border border-slate-900/10 bg-white shadow-[0_22px_50px_-24px_rgba(15,23,42,0.55)]">
                  <div className="flex items-center gap-2 border-b border-[#e4e6f0] bg-[#f2f3f9] px-3.5 py-2.5">
                    <span aria-hidden="true" className="flex gap-2">
                      <span className="size-2.5 rounded-full bg-line" />
                      <span className="size-2.5 rounded-full bg-line" />
                      <span className="size-2.5 rounded-full bg-line" />
                    </span>
                    <span className="flex-1 truncate text-center font-mono text-[11px] text-muted">
                      {hostOf(block.linkUrl) ?? ''}
                    </span>
                  </div>
                  {picture}
                </div>
              ) : (
                <div className="overflow-hidden rounded-[14px] shadow-[0_22px_50px_-26px_rgba(23,26,38,0.5)]">
                  {picture}
                </div>
              );

            return wrap(
              <figure className="my-7">
                {block.linkUrl ? (
                  <SmartLink href={block.linkUrl} newTab={block.newTab} className="block">
                    {framed}
                  </SmartLink>
                ) : (
                  framed
                )}
                {block.caption && (
                  <figcaption className="mt-3 text-center text-[15px] leading-[1.6] text-[#4b5563]">
                    {block.caption}
                  </figcaption>
                )}
              </figure>,
            );
          }

          case 'prjVideo': {
            const embed = embedUrl(block.url);

            return wrap(
              <figure className="my-7">
                {embed ? (
                  <div className="relative aspect-video overflow-hidden rounded-[14px] bg-black shadow-[0_22px_50px_-26px_rgba(23,26,38,0.5)]">
                    <iframe
                      src={embed}
                      title={block.caption || 'Video'}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 size-full border-0"
                    />
                  </div>
                ) : (
                  <video
                    src={block.url}
                    controls
                    preload="metadata"
                    className="w-full rounded-[14px] shadow-[0_22px_50px_-26px_rgba(23,26,38,0.5)]"
                  />
                )}
                {block.caption && (
                  <figcaption className="mt-3 text-center text-[15px] leading-[1.6] text-[#4b5563]">
                    {block.caption}
                  </figcaption>
                )}
              </figure>,
            );
          }

          case 'prjCode':
            return wrap(
              <div className="my-6">
                <CodeBlock
                  code={block.code}
                  language={block.language ?? 'text'}
                  title={block.title}
                  copyLabel={t('copy')}
                  copiedLabel={t('copied')}
                />
              </div>,
            );

          case 'prjButtons':
            return wrap(
              <div className="my-7 flex flex-wrap gap-3.5">
                {(block.items ?? []).map((button, i) => (
                  <SmartLink
                    key={button.id ?? i}
                    href={button.url}
                    newTab={button.newTab}
                    className={button.style === 'ghost' ? ghost : primary}
                  >
                    {button.label}
                  </SmartLink>
                ))}
              </div>,
            );

          default:
            return null;
        }
      })}
    </>
  );
}