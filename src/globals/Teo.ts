import type { GlobalConfig } from 'payload'

/** Página personal (/teo): portada + galería de fotos, todo editable desde el admin. */
export const Teo: GlobalConfig = {
  slug: 'teo',
  label: 'Teo page',
  access: { read: () => true },
  fields: [
    {
      name: 'kicker',
      type: 'text',
      localized: true,
      admin: { description: 'Etiqueta chica sobre el título (ej: Off the clock).' },
    },
    { name: 'title', type: 'text', localized: true },
    { name: 'lead', type: 'textarea', localized: true },
    {
      name: 'heroPhoto',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Foto grande de la portada.' },
    },
    { name: 'galleryTitle', type: 'text', localized: true },
    {
      name: 'photos',
      type: 'upload',
      relationTo: 'media',
      hasMany: true,
      admin: { description: 'Galería: elegí varias fotos a la vez y ordenalas arrastrando.' },
    },
  ],
}