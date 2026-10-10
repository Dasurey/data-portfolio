import type { CollectionConfig, TextFieldSingleValidation } from 'payload'
import { projectBlocks } from '../blocks/project'
import {
  BlocksFeature,
  FixedToolbarFeature,
  LinkFeature,
  TextStateFeature,
  lexicalEditor,
  type LinkFields,
} from '@payloadcms/richtext-lexical'

import { textStateConfig } from '../lib/textState'
import { getServerSideURL } from '../utilities/getURL'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
        livePreview: {
      url: ({ data }) => `${getServerSideURL()}/projects/${data?.slug}`,
    },
    preview: (doc) => (doc?.slug ? `${getServerSideURL()}/projects/${doc.slug}` : null),
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
      name: 'techStack',
      type: 'relationship',
      relationTo: 'tools',
      hasMany: true,
      label: 'Technical Stack',
      admin: {
        allowCreate: true,
        description: 'Seleccioná las tecnologías utilizadas en este proyecto o agregá una nueva.',
      },
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
    {
      name: 'content',
      type: 'richText',
      localized: true,
      admin: {
        description:
          'Escribí con "/" para insertar títulos, listas, notas, imágenes, videos, código y botones. Seleccioná texto para darle formato, link, color o resaltado.',
      },
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          // Sin Relationship ni Upload (las imágenes van con el bloque Image) y con el link de abajo.
          ...defaultFeatures.filter((feature) => !['relationship', 'upload', 'link'].includes(feature.key)),
          LinkFeature({
            // Links internos a proyectos (tienen página) y a experiencias (van a /about).
            enabledCollections: ['projects', 'experience'],
            fields: ({ defaultFields }) => [
              ...defaultFields.filter((field) => !('name' in field && field.name === 'url')),
              {
                name: 'url',
                type: 'text',
                admin: { condition: (_data, siblingData) => siblingData?.linkType !== 'internal' },
                label: ({ t }) => t('fields:enterURL'),
                required: true,
                validate: ((value, options) => {
                  if ((options?.siblingData as LinkFields)?.linkType === 'internal') return true
                  return value ? true : 'URL is required'
                }) as TextFieldSingleValidation,
              },
            ],
          }),
          FixedToolbarFeature(),
          TextStateFeature({ state: textStateConfig }),
          BlocksFeature({ blocks: projectBlocks }),
        ],
      }),
    },
  ],
}