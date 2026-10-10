import type { CollectionConfig } from 'payload'

export const Tools: CollectionConfig = {
  slug: 'tools',
  labels: {
    singular: 'Tool',
    plural: 'Tools',
  },
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
      admin: {
        description: 'Nombre de la tecnología o herramienta, por ejemplo Python, SQL o AWS S3.',
      },
    },
  ],
}