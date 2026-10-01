import type { CollectionConfig } from 'payload'

export const Experience: CollectionConfig = {
  slug: 'experience',
  admin: { useAsTitle: 'company' },
  access: { read: () => true },
  fields: [
    { name: 'company', type: 'text', required: true },
    { name: 'role', type: 'text', required: true, localized: true },
    { name: 'startDate', type: 'date', required: true, admin: { date: { pickerAppearance: 'monthOnly' } } },
    { name: 'endDate', type: 'date', admin: { date: { pickerAppearance: 'monthOnly' }, description: 'Dejar vacío si es el trabajo actual' } },
    { name: 'description', type: 'textarea', required: true, localized: true },
    {
      name: 'stack',
      type: 'array',
      fields: [{ name: 'name', type: 'text' }],
    },
    {
  name: 'links',
  type: 'array',
  fields: [
    { name: 'label', type: 'text' },
    { name: 'url', type: 'text' }
  ]
}
  ],
}