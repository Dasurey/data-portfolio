import Link from 'next/link';

import { Container } from '@/components/ui/Container';

type Crumb = { label: string; href?: string };

/** .about-banner de la base: degradé índigo → violeta con el título y el recorrido. */
export function PageBanner({ title, crumbs, ariaLabel }: { title: string; crumbs: Crumb[]; ariaLabel: string }) {
  return (
    <section className="bg-brand text-center text-white">
      <Container className="py-12 sm:py-[58px]">
        <h1 className="mb-3.5 text-balance font-display text-[2.2rem] font-bold leading-[1.15] tracking-[-0.03em] sm:text-[3rem]">
          {title}
        </h1>

        <nav aria-label={ariaLabel}>
          <ol className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[0.95rem]">
            {crumbs.map((crumb, index) => (
              <li
                key={crumb.label}
                className="flex items-center gap-3"
                aria-current={index === crumbs.length - 1 ? 'page' : undefined}
              >
                {index > 0 && (
                  <svg
                    viewBox="0 0 24 24"
                    className="size-[18px]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M4 12h16M14 6l6 6-6 6" />
                  </svg>
                )}
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-opacity hover:opacity-80 motion-reduce:transition-none">
                    {crumb.label}
                  </Link>
                ) : (
                  <span>{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </nav>
      </Container>
    </section>
  );
}