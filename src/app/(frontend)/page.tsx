import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getTranslations, getLocale } from 'next-intl/server'
import Link from 'next/link'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'

export default async function HomePage() {
  const locale = await getLocale()
  const t = await getTranslations('Home')
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
      {/* EL HERO SE MUESTRA SIEMPRE */}
      <section className="py-24 md:py-40">
        <Container>
          <div className="max-w-4xl">
            <span className="mb-6 block font-mono text-xs uppercase tracking-[0.3em] text-indigo-600">
              {/* Si la traducción falla, se verá el nombre de la llave, no quedará vacío */}
              {t('role')}
            </span>
            <h1 className="text-4xl font-semibold tracking-tight text-slate-900 sm:text-6xl md:text-7xl lg:text-8xl">
              {t('heroTitle')} <br className="hidden sm:block" /> 
              <span className="font-light italic text-slate-400">{t('heroTitleItalic')}</span>
            </h1>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-slate-600 md:text-xl">
              {t('heroDescription')}
            </p>
          </div>
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