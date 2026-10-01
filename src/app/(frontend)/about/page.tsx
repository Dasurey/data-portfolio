import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { getTranslations, getLocale } from 'next-intl/server'
import Image from 'next/image'
import { Container } from '@/components/ui/Container'
import { ExperienceItem } from '@/components/layout/ExperienceItem'

export default async function AboutPage() {
  const locale = await getLocale()
  const t = await getTranslations('About')
  const payload = await getPayload({ config: configPromise })

  const { docs: experience } = await payload.find({
    collection: 'experience',
    sort: '-startDate',
    locale: locale as any,
  })

  return (
    <main className="flex flex-col">
      {/* SECCIÓN INTRO con grid-bg */}
      <section className="border-b border-[#e8eaf2] bg-[#f7f8fc] bg-[radial-gradient(#171a26_1px,transparent_1px)] [background-size:64px_64px] [background-position:center] opacity-[0.98]">
        <Container className="py-16 md:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr]">
            <div className="flex flex-col justify-center">
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#4f46e5] mb-4">
                {t('kicker')}
              </span>
              <h1 className="font-display text-4xl font-bold tracking-tight text-[#171a26] sm:text-6xl md:text-7xl">
                {t('title')}
              </h1>
              <p className="mt-8 font-display text-xl leading-relaxed text-[#171a26] sm:text-2xl">
                {t('lead')}
              </p>
            </div>
            
            <div className="flex flex-col gap-8">
              <div className="space-y-6 text-lg text-[#4a5163]">
                <p>{t('bio1')}</p>
                <p>{t('bio2')}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* SECCIÓN EXPERIENCIA */}
      <section className="bg-white py-16 md:py-24">
        <Container>
          <div className="mb-16 border-b border-[#e8eaf2] pb-8">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#4f46e5] mb-4 block">
              {t('experienceKicker')}
            </span>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="font-display text-3xl font-bold tracking-tight text-[#171a26] sm:text-4xl">
                {t('experienceTitle')}
              </h2>
              <p className="text-[#6b7385] font-medium">{t('experienceSub')}</p>
            </div>
          </div>

          <div className="mx-auto max-w-4xl">
            <div className="flex flex-col">
              {experience.map((item, index) => (
                <ExperienceItem 
                  key={item.id} 
                  item={item} 
                  isFirst={index === 0}
                  tPresent={t('current')}
                  tBadge={t('badgeCurrent')}
                />
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  )
}