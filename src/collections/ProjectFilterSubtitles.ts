import type { CollectionConfig } from 'payload'

/** Los botones de filtro de /projects (Anomaly detection, Big data, Sprint (internship)…). Cada proyecto elige cuáles tiene. */
export const ProjectFilterSubtitles: CollectionConfig = {
  slug: 'project-filterSubtitles',
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
      admin: { description: 'Texto del botón (ej: Anomaly detection, Big data, Sprint (internship)...)' },
    },
  ],
}