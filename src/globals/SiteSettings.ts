import type { GlobalConfig } from 'payload'

/** Archivos del sitio que cambian desde el admin, sin volver a desplegar. */
export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site settings',
  access: { read: () => true },
  fields: [
    {
      name: 'profilePhoto',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Tu foto (Home y About). Cuadrada o casi cuadrada se ve mejor.' },
    },
    {
      name: 'resume',
      type: 'upload',
      relationTo: 'documents',
      localized: true,
      admin: {
        description:
          'PDF del currículum. Podés elegir uno por idioma (cambiá el Locale arriba); si falta el del español se usa el de inglés.',
      },
    },
  ],
}