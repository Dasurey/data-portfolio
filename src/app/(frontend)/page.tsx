import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getTranslations, getLocale } from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { HeroDiagram } from '@/components/home/HeroDiagram'
import { PROFILE_PHOTO, RESUME_URL, SITE_INITIALS, SITE_NAME } from '@/config/site'
import { FeaturedProject } from '@/components/home/FeaturedProject'
import { ProjectRow } from '@/components/home/ProjectRow'
import { SectionHead } from '@/components/ui/SectionHead'
import { AboutSection } from '@/components/home/AboutSection'
import { AreasSection } from '@/components/home/AreasSection'
import { SkillsSection } from '@/components/home/SkillsSection'

export default async function HomePage() {
  const locale = await getLocale()
  const t = await getTranslations('Home')
  const tNav = await getTranslations('Nav')
  const [firstName, ...lastNames] = SITE_NAME.split(' ')
  const stats = [
    { num: t('stat1Num'), label: t('stat1Label') },
    { num: t('stat2Num'), label: t('stat2Label') },
    { num: t('stat3Num'), label: t('stat3Label') },
  ]
  const payload = await getPayload({ config: configPromise })

  // Traemos datos
  const { docs: projects } = await payload.find({
    collection: 'projects',
    limit: 6,
    sort: '-createdAt',
    locale: locale as any,
  })

  const featured = projects.find((project) => project.featured)
  const rows = projects.filter((project) => project.id !== featured?.id).slice(0, 3)

  return (
    <div className="flex flex-col">
      {/* Hero: .hero.grid-bg de la base */}
      <section className="border-b border-line bg-grid">
        <Container className="grid items-center gap-11 pb-[82px] pt-[52px] lg:grid-cols-[1.02fr_1fr] lg:gap-16 lg:pt-[76px]">
          <div>
            {PROFILE_PHOTO ? (
              <Image
                src={PROFILE_PHOTO}
                alt={SITE_NAME}
                width={192}
                height={192}
                priority
                className="mb-[22px] size-24 rounded-full object-cover ring-[3px] ring-accent/25 ring-offset-[3px] ring-offset-white"
              />
            ) : (
              <div
                aria-hidden="true"
                className="mb-[22px] grid size-24 place-items-center rounded-full bg-brand font-display text-3xl font-bold text-white ring-[3px] ring-accent/25 ring-offset-[3px] ring-offset-white"
              >
                {SITE_INITIALS}
              </div>
            )}

            {/* .status-chip */}
            <div className="mb-[26px] inline-flex items-center gap-[9px] rounded-full border border-line-strong bg-white py-1.5 pl-[11px] pr-3.5">
              <span
                aria-hidden="true"
                className="size-[7px] animate-[livePulse_2.4s_ease-in-out_infinite] rounded-full bg-live motion-reduce:animate-none"
              />
              <span className="text-xs font-semibold uppercase tracking-[0.13em] text-accent">{t('role')}</span>
            </div>

            <h1 className="mb-5 font-display text-[3rem] font-bold leading-[1.02] tracking-[-0.035em] text-ink sm:text-[4.3rem]">
              {firstName}
              {lastNames.length > 0 && (
                <>
                  <br />
                  {lastNames.join(' ')}
                </>
              )}
            </h1>

            <p className="mb-8 max-w-[38ch] text-pretty text-[1.18rem] leading-[1.62] text-ink-soft">
              {t('heroDescription')}
            </p>

            {/* .stats */}
            <ul className="mb-8 flex max-w-[520px] flex-wrap gap-[18px] border-y border-line-strong py-[18px] sm:flex-nowrap sm:gap-0">
              {stats.map((stat) => (
                <li
                  key={stat.label}
                  className="flex-[1_1_40%] sm:flex-1 sm:border-l sm:border-line sm:px-5 sm:first:border-l-0 sm:first:pl-0"
                >
                  <span className="block bg-brand bg-clip-text font-display text-[1.55rem] font-bold leading-none text-transparent">
                    {stat.num}
                  </span>
                  <span className="mt-[7px] block text-[0.78rem] leading-[1.4] text-muted">{stat.label}</span>
                </li>
              ))}
            </ul>

            {/* .btn-row */}
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="rounded-full bg-brand px-7 py-[13px] text-[0.95rem] font-semibold leading-normal text-white shadow-[0_8px_22px_-8px_rgba(79,70,229,0.55)] transition-[transform,box-shadow] hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-10px_rgba(79,70,229,0.7)] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                {t('viewPortfolio')}
              </Link>
              {RESUME_URL && (
                <a
                  href={RESUME_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border-[1.5px] border-line-strong bg-white px-[26px] py-3 text-[0.95rem] font-semibold leading-normal text-accent transition-colors hover:border-accent motion-reduce:transition-none"
                >
                  {tNav('resume')}
                </a>
              )}
            </div>
          </div>

          <HeroDiagram />
        </Container>
      </section>

      {/* LA SECCIÓN DE PROYECTOS SE MUESTRA SIEMPRE, CAMBIA EL CONTENIDO */}
      {/* 01 — Selected work: sección #work de la base */}
      <section>
        <Container className="pb-5 pt-14 sm:pt-[78px]">
          <SectionHead
            className="mb-11"
            kicker={`01 — ${t('selectedWorks')}`}
            title={t('workTitle')}
            sub={t('workSub')}
          />

          {featured && (
            <div className="mb-16" data-reveal>
              <FeaturedProject project={featured} />
            </div>
          )}

          {rows.length > 0 && (
            <div className="border-t border-line">
              {rows.map((project, index) => (
                <div key={project.id} data-reveal>
                  <ProjectRow project={project} index={index} />
                </div>
              ))}
            </div>
          )}

          {projects.length === 0 && (
            <p className="py-16 text-center font-mono text-sm text-muted">{t('noProjects')}</p>
          )}

          {projects.length > 0 && (
            <div className="py-12 text-center">
              <Link
                href="/projects"
                className="inline-block rounded-full border-[1.5px] border-line-strong bg-white px-6 py-[11px] text-[0.92rem] font-semibold leading-normal text-accent transition-colors hover:border-accent motion-reduce:transition-none"
              >
                {t('seeAll')}
              </Link>
            </div>
          )}
        </Container>
      </section>
      <AreasSection />
      <SkillsSection />
      <AboutSection />
    </div>
  )
}