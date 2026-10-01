import { getTranslations } from 'next-intl/server';

import { Container } from '@/components/ui/Container';

export default async function ProjectsPage() {
  const t = await getTranslations('Nav');

  return (
    <section className="py-24 md:py-32">
      <Container>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
          {t('projects')}
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
          ut labore et dolore magna aliqua.
        </p>
      </Container>
    </section>
  );
}
