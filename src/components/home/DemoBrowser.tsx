'use client';

import Image from 'next/image';
import { useRef, useState } from 'react';

import { SITE_INITIALS } from '@/config/site';

type Props = {
  url: string;
  host: string;
  title: string;
  imageSrc: string;
  imageAlt: string;
  labels: { run: string; note: string; openNewTab: string; close: string };
};

/** .browser + .demo-launch + .overlay de la base: la demo corre en un iframe a pantalla completa. */
export function DemoBrowser({ url, host, title, imageSrc, imageAlt, labels }: Props) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [active, setActive] = useState(false);

  const open = () => {
    setActive(true);
    dialogRef.current?.showModal();
  };

  return (
    <>
      {/* .browser */}
      <div className="overflow-hidden rounded-[14px] border border-slate-900/10 bg-white shadow-[0_22px_50px_-24px_rgba(15,23,42,0.55)]">
        <div className="flex items-center gap-2 border-b border-[#e4e6f0] bg-[#f2f3f9] px-3.5 py-2.5">
          <span aria-hidden="true" className="flex gap-2">
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
            <span className="size-2.5 rounded-full bg-line" />
          </span>
          <span className="flex-1 truncate text-center font-mono text-[11px] text-muted">{host}</span>
        </div>

        <div className="relative h-[340px]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-cover object-top"
          />

          {/* .demo-launch */}
          <button
            type="button"
            onClick={open}
            className="group absolute inset-0 flex w-full flex-col items-center justify-center gap-3 bg-dark/[0.42] backdrop-blur-[1.5px] focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-white"
          >
            <span className="inline-flex items-center gap-[11px] rounded-full bg-brand px-7 py-[13px] text-[0.95rem] font-semibold text-white shadow-[0_10px_30px_-8px_rgba(79,70,229,0.8)] transition-transform group-hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
              <span aria-hidden="true" className="border-y-[5px] border-l-8 border-y-transparent border-l-white" />
              {labels.run}
            </span>
            <span className="text-xs tracking-[0.02em] text-white/80">{labels.note}</span>
          </button>
        </div>
      </div>

      {/* .overlay */}
      <dialog
        ref={dialogRef}
        aria-label={title}
        onClose={() => setActive(false)}
        className="m-0 h-dvh max-h-none w-screen max-w-none flex-col gap-3.5 border-0 bg-dark/[0.78] p-[22px] text-white backdrop-blur-[6px] backdrop:bg-transparent open:flex"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-[11px]">
            <span
              aria-hidden="true"
              className="grid size-7 place-items-center rounded-lg bg-brand font-display text-xs font-bold"
            >
              {SITE_INITIALS}
            </span>
            <span className="font-display text-base font-bold">{title}</span>
            <span className="truncate font-mono text-[11px] text-dark-link">{host}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/18 px-[18px] py-[9px] text-[0.85rem] font-semibold text-[#c3c8d6] transition-colors hover:text-white motion-reduce:transition-none"
            >
              {labels.openNewTab} ↗
            </a>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="rounded-full bg-white/12 px-5 py-2.5 text-[0.85rem] font-semibold text-white"
            >
              {labels.close} ✕
            </button>
          </div>
        </div>

        {active && (
          <iframe
            src={url}
            title={title}
            allow="microphone"
            className="w-full flex-1 rounded-[14px] border-0 bg-white shadow-[0_40px_90px_-30px_rgba(0,0,0,0.7)]"
          />
        )}
      </dialog>
    </>
  );
}