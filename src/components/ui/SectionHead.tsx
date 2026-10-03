import type { ReactNode } from 'react';

type Props = {
  kicker: string;
  title: string;
  sub?: ReactNode;
  className?: string;
  plain?: boolean; // sin línea inferior (.sechead--plain)
};

/** .sechead de la base: kicker mono + título display + subtítulo. */
export function SectionHead({ kicker, title, sub, className = '', plain = false }: Props) {
  return (
    <div
      className={`flex flex-col items-start gap-[11px] ${plain ? '' : 'border-b border-line pb-[22px]'} ${className}`} data-reveal
    >
      <div>
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.14em] text-accent">{kicker}</p>
        <h2 className="text-balance font-display text-[1.8rem] font-bold leading-[1.15] tracking-[-0.03em] text-ink sm:text-[2.3rem]">
          {title}
        </h2>
      </div>
      {sub && <p className="max-w-[58ch] text-pretty text-[0.98rem] text-muted">{sub}</p>}
    </div>
  );
}