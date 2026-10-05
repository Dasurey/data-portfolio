import type { DefaultNodeTypes, SerializedBlockNode, SerializedLinkNode, TypedEditorState } from '@payloadcms/richtext-lexical';
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical';
import {
  LinkJSXConverter,
  RichText as ConvertRichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { textStateConfig } from '@/lib/textState';
import type {
  PrjButtonsBlock,
  PrjCalloutBlock,
  PrjCodeBlock,
  PrjImageBlock,
  PrjLedeBlock,
  PrjMetricsBlock,
  PrjVideoBlock,
} from '@/payload-types';

import { CodeBlock } from './CodeBlock';

type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      PrjLedeBlock | PrjCalloutBlock | PrjMetricsBlock | PrjImageBlock | PrjVideoBlock | PrjCodeBlock | PrjButtonsBlock
    >;

type Labels = { copy: string; copied: string };

// Estilos del texto del editor (hijos directos), con los valores de la página de proyecto de la base.
const base = [
  '[&>p]:mb-[18px] [&>p]:text-[16px] [&>p]:leading-[1.8] [&>p]:text-muted',
  '[&>h2]:mb-3.5 [&>h2]:mt-10 [&>h2]:text-balance [&>h2]:font-display [&>h2]:text-[1.8rem] [&>h2]:font-bold [&>h2]:leading-[1.2] [&>h2]:tracking-[-0.03em] [&>h2]:text-ink',
  '[&>h3]:mb-3 [&>h3]:mt-8 [&>h3]:font-display [&>h3]:text-[1.35rem] [&>h3]:font-bold [&>h3]:tracking-[-0.02em] [&>h3]:text-ink',
  '[&>h2:first-child]:mt-0 [&>h3:first-child]:mt-0',
  '[&>ul]:mb-5 [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:mb-5 [&>ol]:list-decimal [&>ol]:pl-5',
  '[&_li]:mb-2 [&_li]:text-[16px] [&_li]:leading-[1.7] [&_li]:text-muted',
  '[&>blockquote]:my-6 [&>blockquote]:border-l-[3px] [&>blockquote]:border-indigo-500 [&>blockquote]:pl-4 [&>blockquote]:italic',
  '[&_:is(p,li)_a]:text-ink [&_:is(p,li)_a]:underline [&_:is(p,li)_a]:underline-offset-2',
  '[&_:not(pre)>code]:rounded-[5px] [&_:not(pre)>code]:bg-indigo-500/8 [&_:not(pre)>code]:px-1.5 [&_:not(pre)>code]:py-px [&_:not(pre)>code]:text-[0.875rem] [&_:not(pre)>code]:text-pink-600',
].join(' ');

const primary =
  'inline-block rounded-full bg-brand px-[26px] py-3 text-[0.92rem] font-semibold leading-normal text-white shadow-[0_8px_22px_-8px_rgba(79,70,229,0.55)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(79,70,229,0.7)] motion-reduce:transition-none motion-reduce:hover:translate-y-0';
const ghost =
  'inline-block rounded-full border-[1.5px] border-line-strong bg-white px-6 py-[11px] text-[0.92rem] font-semibold leading-normal text-accent transition-colors hover:border-accent motion-reduce:transition-none';

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

// Links internos a otros documentos del CMS (proyectos u otras páginas).
const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const doc = linkNode.fields.doc;
  const slug = typeof doc?.value === 'object' ? (doc.value as { slug?: string }).slug : undefined;
  if (!slug) return '#';
  return doc?.relationTo === 'projects' ? `/projects/${slug}` : `/${slug}`;
};

const makeConverters =
  (labels: Labels): JSXConvertersFunction<NodeTypes> =>
  ({ defaultConverters }) => ({
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref }),

    // Colores y resaltados del editor: se guardan bajo la clave "$" del texto.
    text: (args) => {
      const base = defaultConverters.text(args);
      const key = (args.node as { $?: Record<string, string> }).$?.color;
      const css = key ? textStateConfig.color[key]?.css : undefined;
      if (!css) return base;

      const style = Object.fromEntries(
        Object.entries(css).map(([prop, value]) => [
          prop.replace(/-([a-z])/g, (_, letter: string) => letter.toUpperCase()),
          value,
        ]),
      );
      return <span style={style}>{base}</span>;
    },

    blocks: {
      prjLede: ({ node }) => (
        <div className="mb-[18px] text-[19px] leading-[1.7] text-[#1f2937]">{node.fields.text}</div>
      ),

      prjCallout: ({ node }) => (
        <div className="my-[22px] rounded-[10px] border border-l-[3px] border-indigo-500/16 border-l-indigo-500 bg-indigo-500/6 px-[18px] py-3.5 text-[14px] leading-[1.6] text-[#5b6373]">
          {node.fields.text}
        </div>
      ),

      prjMetrics: ({ node }) => (
        <div className="my-6 flex flex-wrap gap-x-[30px] gap-y-4 border-y border-line py-5">
          {(node.fields.items ?? []).map((item, i) => (
            <div key={item.id ?? i}>
              <b className="block font-display text-[1.5rem] font-bold leading-[1.1] text-ink">{item.value}</b>
              {item.label && <span className="text-[0.8rem] text-muted">{item.label}</span>}
            </div>
          ))}
        </div>
      ),

      prjImage: ({ node }) => {
        const media = typeof node.fields.image === 'object' ? node.fields.image : null;
        if (!media?.url) return null;

        const picture = (
          <div className="overflow-hidden rounded-[14px] shadow-[0_22px_50px_-26px_rgba(23,26,38,0.5)]">
            <Image
              src={media.url}
              alt={media.alt}
              width={media.width ?? 1600}
              height={media.height ?? 900}
              sizes="(min-width: 860px) 825px, 100vw"
              className="block h-auto w-full"
            />
          </div>
        );

        return (
          <figure className="my-7">
            {node.fields.linkUrl ? (
              <SmartLink href={node.fields.linkUrl} newTab={node.fields.newTab} className="block">
                {picture}
              </SmartLink>
            ) : (
              picture
            )}
            {node.fields.caption && (
              <figcaption className="mt-3 text-center text-[15px] leading-[1.6] text-[#4b5563]">
                {node.fields.caption}
              </figcaption>
            )}
          </figure>
        );
      },

      prjVideo: ({ node }) => {
        const embed = embedUrl(node.fields.url);

        return (
          <figure className="my-7">
            {embed ? (
              <div className="relative aspect-video overflow-hidden rounded-[14px] bg-black shadow-[0_22px_50px_-26px_rgba(23,26,38,0.5)]">
                <iframe
                  src={embed}
                  title={node.fields.caption || 'Video'}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 size-full border-0"
                />
              </div>
            ) : (
              <video
                src={node.fields.url}
                controls
                preload="metadata"
                className="w-full rounded-[14px] shadow-[0_22px_50px_-26px_rgba(23,26,38,0.5)]"
              />
            )}
            {node.fields.caption && (
              <figcaption className="mt-3 text-center text-[15px] leading-[1.6] text-[#4b5563]">
                {node.fields.caption}
              </figcaption>
            )}
          </figure>
        );
      },

      prjCode: ({ node }) => (
        <CodeBlock
          code={node.fields.code}
          language={node.fields.language ?? 'text'}
          title={node.fields.title}
          copyLabel={labels.copy}
          copiedLabel={labels.copied}
        />
      ),

      prjButtons: ({ node }) => (
        <div className="my-7 flex flex-wrap gap-3.5">
          {(node.fields.items ?? []).map((button, i) => (
            <SmartLink
              key={button.id ?? i}
              href={button.url}
              newTab={button.newTab}
              className={button.style === 'ghost' ? ghost : primary}
            >
              {button.label}
            </SmartLink>
          ))}
        </div>
      ),
    },
  });

/** Cuerpo de la página de un proyecto: el campo Content del admin. */
export function ProjectContent({ data, labels }: { data: SerializedEditorState; labels: Labels }) {
  return (
    <ConvertRichText data={data as TypedEditorState<NodeTypes>} converters={makeConverters(labels)} className={base} />
  );
}