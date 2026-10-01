import type { CollectionConfig } from 'payload'

export const Experience: CollectionConfig = {
  slug: 'experience',
  admin: { useAsTitle: 'company' },
  access: { read: () => true },
  fields: [
    { name: 'company', type: 'text', required: true },
    { name: 'role', type: 'text', required: true, localized: true },
    { name: 'startDate', type: 'date', required: true, admin: { date: { pickerAppearance: 'monthOnly' } } },
    {
      name: 'endDate',
      type: 'date',
      admin: { date: { pickerAppearance: 'monthOnly' }, description: 'Dejar vacío si es el trabajo actual' },
    },
    {
      // Ahora es opcional: un párrafo corto de intro. Los puntos van en "highlights".
      name: 'description',
      type: 'textarea',
      localized: true,
      admin: { description: 'Opcional: un párrafo corto de introducción. Los puntos van en "Highlights".' },
    },
    {
      name: 'highlights',
      type: 'array',
      labels: { singular: 'Highlight', plural: 'Highlights' },
      admin: { description: 'Una fila por punto. Se muestran como viñetas y se reordenan arrastrando.' },
      // Las filas son las mismas en todos los idiomas; solo cambia el texto de cada una.
      fields: [{ name: 'text', type: 'textarea', localized: true }],
    },
    { name: 'stack', type: 'array', fields: [{ name: 'name', type: 'text' }] },
    {
      name: 'links',
      type: 'array',
      fields: [
        { name: 'label', type: 'text' },
        { name: 'url', type: 'text' },
      ],
    },
  ],
}