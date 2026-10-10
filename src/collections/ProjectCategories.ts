import type { CollectionConfig } from 'payload'

/** Los botones de filtro de /projects (Anomaly Detection, Sprint, Generative AI…). Cada proyecto elige cuáles tiene. */
export const ProjectCategories: CollectionConfig = {
  slug: 'project-categories',
  labels: { singular: 'Category', plural: 'Categories' },
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
      admin: { description: 'Texto del botón (ej: Anomaly Detection, Sprint, Generative AI).' },
    },
  ],
}