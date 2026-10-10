'use client';

import { useId, useState } from 'react';

import type { Experience } from '@/payload-types';

type Props = {
  item: Experience;
  isLast: boolean;
  nowLabel: string; // "now" / "hoy"
  currentLabel: string; // "Current" / "Actual"
};

// UTC: evita que un "1 de enero" se vea como el año anterior en horario argentino.
const yearOf = (iso: string) => new Date(iso).getUTCFullYear();

/** "2018–19", "2019" (mismo año) o "2024–now": el formato del timeline de la base. */
function yearRange(start: string, end: string | null | undefined, nowLabel: string) {
  const from = yearOf(start);
  if (!end) return `${from}–${nowLabel}`;

  const to = yearOf(end);
  return from === to ? `${from}` : `${from}–${String(to).slice(-2)}`;
}

export function ExperienceItem({ item, isLast, nowLabel, currentLabel }: Props) {
  const isCurrent = !item.endDate;
  const panelId = useId();

  // Intro opcional (un párrafo por línea) + viñetas (una por fila de "highlights") + stack + links
  const paragraphs = (item.description ?? '')
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);

  const highlights = (item.highlights ?? []).flatMap((h) => {
    const text = h.text?.trim();
    return text ? [text] : [];
  });

  const stack = (item.techStack ?? []).flatMap((tool) => (typeof tool === 'object' && tool.label ? [tool.label] : []));

  const links = (item.links ?? []).flatMap((l) =>
    l.url && l.label ? [{ id: l.id ?? l.url, url: l.url, label: l.label }] : [],
  );

  // Sin nada para mostrar, la fila queda fija (sin "+"), como las de estudios en la base.
  const expandable = paragraphs.length + highlights.length + stack.length + links.length > 0;
  const [open, setOpen] = useState(isCurrent && expandable); // solo el cargo actual arranca abierto

  const heading = (
    <span className="block">
      {isCurrent && (
        <span className="mb-[9px] inline-block rounded-full bg-brand px-2.5 py-[3px] text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-white">
          {currentLabel}
        </span>
      )}
      <span
        className={`block font-display font-bold leading-[1.25] tracking-[-0.02em] text-ink ${
          isCurrent ? 'text-[1.22rem]' : 'text-[1.1rem]'
        }`}
      >
        {item.role}
      </span>
      <span className="mt-[3px] block text-[0.94rem] font-semibold text-ink-soft">{item.company}</span>
    </span>
  );

  return (
    <div className="grid grid-cols-[64px_24px_minmax(0,1fr)] sm:grid-cols-[96px_28px_minmax(0,1fr)]">
      {/* .tl-year */}
      <div
        className={`py-[22px] pr-2.5 text-right font-mono text-xs sm:pr-4 ${
          isCurrent ? 'font-semibold text-accent' : 'text-muted'
        }`}
      >
        {yearRange(item.startDate, item.endDate, nowLabel)}
      </div>

      {/* .tl-rail + .tl-node: la línea termina en el último nodo */}
      <div className="relative" aria-hidden="true">
        <span
          className={`absolute left-1/2 top-0 w-0.5 -translate-x-1/2 bg-line-strong ${isLast ? 'h-7' : 'bottom-0'}`}
        />
        <span
          className={`absolute left-1/2 top-7 -translate-x-1/2 rounded-full border-2 ${
            isCurrent
              ? 'size-[13px] border-white bg-brand ring-4 ring-accent/16'
              : 'size-[11px] border-node bg-white'
          }`}
        />
      </div>

      {/* .tl-body (+ .tl-current-card para el cargo actual) */}
      <div className={isCurrent ? 'py-2.5 pl-3' : 'py-2 pl-3'}>
        <div
          className={
            isCurrent
              ? 'rounded-2xl border border-indigo-500/30 bg-linear-to-b from-indigo-500/7 to-accent-2/2 p-1.5'
              : ''
          }
        >
          {expandable ? (
            <button
              type="button"
              aria-expanded={open}
              aria-controls={panelId}
              onClick={() => setOpen((value) => !value)}
              className={`flex w-full items-start justify-between gap-[18px] rounded-xl text-left transition-colors hover:bg-accent/5 motion-reduce:transition-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                isCurrent ? 'p-3.5' : 'p-2.5'
              }`}
            >
              {heading}

              {/* .exp-icon: el "+" gira a "×" al abrir */}
              <span
                aria-hidden="true"
                className={`mt-0.5 grid size-6 shrink-0 place-items-center rounded-[7px] text-sm leading-none transition-colors motion-reduce:transition-none ${
                  open ? 'bg-brand text-white' : 'bg-accent/10 text-accent'
                }`}
              >
                <span
                  className={`block transition-transform duration-[250ms] motion-reduce:transition-none ${
                    open ? 'rotate-45' : ''
                  }`}
                >
                  +
                </span>
              </span>
            </button>
          ) : (
            <div className={isCurrent ? 'p-3.5' : 'p-2.5'}>{heading}</div>
          )}

          {/* .exp-panel: 0fr → 1fr anima la altura sin medir nada */}
          {expandable && (
            <div
              id={panelId}
              inert={!open}
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,0.7,0.2,1)] motion-reduce:transition-none ${
                open ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              }`}
            >
              <div className="min-h-0 overflow-hidden">
                <div className={isCurrent ? 'px-3.5 pb-1' : 'px-2.5 pb-1'}>
                  {paragraphs.map((text, i) => (
                    <p key={i} className="mt-2 max-w-[70ch] text-pretty text-[0.94rem] leading-[1.6] text-ink-soft">
                      {text}
                    </p>
                  ))}

                  {/* Una viñeta por fila de "highlights" (los puntitos violetas) */}
                  {highlights.length > 0 && (
                    <ul className="mt-2 list-disc space-y-1.5 pl-5 text-[0.94rem] leading-[1.6] text-ink-soft marker:text-accent/50">
                      {highlights.map((text, i) => (
                        <li key={i} className="text-pretty">
                          {text}
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* .exp-stack */}
                  {stack.length > 0 && (
                    <p className="mt-3 font-mono text-[0.72rem] text-muted">{stack.join(' · ')}</p>
                  )}

                  {/* .pill-row / .pill--lg */}
                  {links.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-[7px]">
                      {links.map((link) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block rounded-full border border-accent/15 bg-accent/8 px-3 py-[5px] text-[0.74rem] font-semibold text-accent-ink transition-colors hover:bg-accent/15 motion-reduce:transition-none"
                        >
                          {link.label} →
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}