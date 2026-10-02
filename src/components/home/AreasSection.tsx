import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/Container';
import { SectionHead } from '@/components/ui/SectionHead';
import { AREAS } from '@/config/home';

/** Sección 02: .banded + .grid-six de la base (celdas separadas por líneas de 1px). */
export async function AreasSection() {
  const t = await getTranslations('Home');

  return (
    <section className="mt-[70px] border-y border-line bg-tint">
      <Container className="py-14 sm:py-[70px]">
        <SectionHead plain className="mb-[38px]" kicker={t('areasKicker')} title={t('areasTitle')} sub={t('areasSub')} />

        <div className="grid gap-px overflow-hidden rounded-2xl border border-[#e4e6f0] bg-[#e4e6f0] sm:grid-cols-2 lg:grid-cols-3">
          {AREAS.map(({ key, icon: Icon }) => (
            <div key={key} className="bg-white px-[26px] py-[30px]">
              <span className="mb-4 grid size-11 place-items-center rounded-xl bg-accent/10 text-accent">
                <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mb-[9px] font-display text-[1.08rem] font-bold tracking-[-0.015em] text-ink">
                {t(`areas.${key}.title`)}
              </h3>
              <p className="text-[0.93rem] leading-[1.6] text-muted">{t(`areas.${key}.desc`)}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}