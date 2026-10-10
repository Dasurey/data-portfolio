import type { CollectionConfig } from 'payload'


/** Texto de la línea gris bajo la portada de la página del proyecto de /projects (Anomaly detection, Big data, Sprint (internship)…). Cada proyecto elige cuáles tiene. */
export const ProjectFilterSubtitles: CollectionConfig = {
  slug: 'project-filter-subtitles',
  labels: { singular: 'Subtitle', plural: 'Subtitles' },
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
      admin: { description: 'Texto de la línea gris bajo la portada de la página del proyecto (ej: Anomaly detection, Big data, Sprint (internship)...)' },
    },
  ],
}