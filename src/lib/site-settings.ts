import { cache } from 'react'
import { getLocale } from 'next-intl/server'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { Locale } from '@/i18n/config'

/** Foto y CV desde el admin (Globals → Site settings). */
export const getSiteSettings = cache(async () => {
  const locale = (await getLocale()) as Locale
  const payload = await getPayload({ config: configPromise })
  const settings = await payload.findGlobal({ slug: 'site-settings', depth: 1, locale })

  const photo = typeof settings.profilePhoto === 'object' ? settings.profilePhoto : null
  const resume = typeof settings.resume === 'object' ? settings.resume : null

  return {
    photo: photo?.url ? { src: photo.url, alt: photo.alt } : null,
    resumeUrl: resume?.url ?? null,
  }
})