import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getTranslations, getLocale } from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { HeroDiagram } from '@/components/home/HeroDiagram'
import { PROFILE_PHOTO, RESUME_URL, SITE_INITIALS, SITE_NAME } from '@/config/site'

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
    limit: 3,
    sort: '-createdAt',
    locale: locale as any,
  })

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
      <section className="border-t border-slate-100 bg-slate-50/50 py-24 md:py-32">
        <Container>
          <div className="mb-16 flex items-baseline justify-between border-b border-slate-200 pb-8">
            <h2 className="font-mono text-xs uppercase tracking-widest text-slate-500">
              {t('selectedWorks')} / {projects.length.toString().padStart(2, '0')}
            </h2>
            <Link href="/projects" className="font-mono text-xs uppercase tracking-widest text-indigo-600">
              {t('viewAll')} →
            </Link>
          </div>

          {/* Si hay proyectos, mostramos la grid */}
          {projects.length > 0 ? (
            <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
              {projects.map((project) => (
                <Link key={project.id} href={`/projects/${project.slug}`} className="group flex flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-slate-200 shadow-sm transition-shadow group-hover:shadow-md">
                    {typeof project.image !== 'string' && project.image?.url && (
                      <Image
                        src={project.image.url}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </div>
                  <div className="mt-6">
                    <h3 className="text-xl font-medium text-slate-900 group-hover:text-indigo-600">
                      {project.title}
                    </h3>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.techStack?.map((tech: any) => (
                        <span key={tech.id} className="border border-slate-200 bg-white px-2 py-0.5 font-mono text-[10px] text-slate-500 uppercase">
                          {tech.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            /* SI NO HAY PROYECTOS, MOSTRAMOS UN ESTADO VACÍO ELEGANTE */
            <div className="flex min-h-[300px] items-center justify-center rounded-sm border-2 border-dashed border-slate-200">
              <div className="text-center">
                <p className="font-mono text-sm text-slate-400">{t('noProjects')}</p>
                <Link href="/admin" className="mt-4 inline-block text-xs uppercase tracking-widest text-indigo-600 underline decoration-indigo-200 underline-offset-4 hover:decoration-indigo-600">
                  + Create first project
                </Link>
              </div>
            </div>
          )}
        </Container>
      </section>
    </div>
  )
}