import type { CollectionConfig } from 'payload'

/** Los botones de filtro de /projects (AI, Real-Time NLP, Credit ML…). Cada proyecto elige cuáles tiene. */
export const ProjectFilters: CollectionConfig = {
  slug: 'project-filters',
  labels: { singular: 'Filter', plural: 'Filters' },
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
      localized: true,
      admin: { description: 'Texto del botón (ej: AI, Real-Time NLP, Credit ML).' },
    },
  ],
}