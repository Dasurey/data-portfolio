import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
  },
  // Habilitamos localización para que cada campo pueda tener versión EN y ES
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true, // Campo traducible
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      admin: {
        description: 'URL amigable (ej: analitica-predictiva-vivienda)',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
      localized: true,
    },
    {
      name: 'category',
      type: 'text',
      localized: true,
      admin: { description: 'Etiqueta chica sobre el título (ej: Data Engineering).' },
    },
    {
      name: 'filters',
      type: 'relationship',
      relationTo: 'project-filters',
      hasMany: true,
      admin: {
        description: 'Filtros a los que pertenece este proyecto (puede tener varios).',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Se muestra como tarjeta grande en el Home. Marcá uno solo.' },
    },
    {
      name: 'metrics',
      type: 'array',
      labels: { singular: 'Metric', plural: 'Metrics' },
      admin: { description: 'Datos clave a la derecha de la fila (se muestran hasta 3).' },
      fields: [
        { name: 'value', type: 'text', localized: true },
        { name: 'label', type: 'text', localized: true },
      ],
    },
    {
      name: 'content',
      type: 'richText', // Para el detalle del proyecto
      localized: true,
    },
    {
      name: 'techStack',
      type: 'array',
      label: 'Technical Stack',
      minRows: 1,
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
    },
    {
      name: 'repositoryUrl',
      type: 'text',
      label: 'GitHub / Repository URL',
    },
    {
      name: 'liveUrl',
      type: 'text',
      label: 'Live Demo URL',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}