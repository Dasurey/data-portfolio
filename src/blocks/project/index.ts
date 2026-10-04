import { lexicalEditor } from '@payloadcms/richtext-lexical'
import type { Block } from 'payload'

/** Bloques con los que se arma el cuerpo de la página de cada proyecto. */
export const projectBlocks: Block[] = [
  {
    slug: 'prjText',
    labels: { singular: 'Text', plural: 'Texts' },
    fields: [
      {
        name: 'size',
        type: 'select',
        defaultValue: 'normal',
        options: [
          { label: 'Normal paragraph', value: 'normal' },
          { label: 'Intro (large)', value: 'lede' },
        ],
      },
      { name: 'body', type: 'richText', localized: true, required: true, editor: lexicalEditor() },
    ],
  },
  {
    slug: 'prjHeading',
    labels: { singular: 'Heading', plural: 'Headings' },
    fields: [
      { name: 'text', type: 'text', localized: true, required: true },
      {
        name: 'level',
        type: 'select',
        defaultValue: 'h2',
        options: [
          { label: 'Large', value: 'h2' },
          { label: 'Small', value: 'h3' },
        ],
      },
    ],
  },
  {
    slug: 'prjCallout',
    labels: { singular: 'Note box', plural: 'Note boxes' },
    fields: [{ name: 'text', type: 'textarea', localized: true, required: true }],
  },
  {
    slug: 'prjMetrics',
    labels: { singular: 'Metrics strip', plural: 'Metrics strips' },
    fields: [
      {
        name: 'items',
        type: 'array',
        labels: { singular: 'Metric', plural: 'Metrics' },
        minRows: 1,
        maxRows: 6,
        fields: [
          { name: 'value', type: 'text', localized: true, required: true },
          { name: 'label', type: 'text', localized: true },
        ],
      },
    ],
  },
  {
    slug: 'prjImage',
    labels: { singular: 'Image', plural: 'Images' },
    fields: [
      { name: 'image', type: 'upload', relationTo: 'media', required: true },
      { name: 'caption', type: 'text', localized: true },
      {
        name: 'frame',
        type: 'select',
        defaultValue: 'none',
        options: [
          { label: 'Plain', value: 'none' },
          { label: 'Browser window', value: 'browser' },
        ],
      },
      {
        name: 'linkUrl',
        type: 'text',
        admin: { description: 'Opcional: si lo completás, la imagen lleva a esta dirección (https://... o /projects/...).' },
      },
      {
        name: 'newTab',
        type: 'checkbox',
        defaultValue: true,
        label: 'Open link in a new tab',
        admin: { condition: (_, siblingData) => Boolean(siblingData?.linkUrl) },
      },
    ],
  },
  {
    slug: 'prjVideo',
    labels: { singular: 'Video', plural: 'Videos' },
    fields: [
      {
        name: 'url',
        type: 'text',
        required: true,
        admin: { description: 'Link de YouTube o Vimeo, o de un archivo de video (.mp4).' },
      },
      { name: 'caption', type: 'text', localized: true },
    ],
  },
  {
    slug: 'prjCode',
    labels: { singular: 'Code', plural: 'Code blocks' },
    fields: [
      { name: 'title', type: 'text', admin: { description: 'Opcional: nombre del archivo o "Terminal".' } },
      {
        name: 'language',
        type: 'select',
        defaultValue: 'bash',
        options: [
          { label: 'Bash', value: 'bash' },
          { label: 'JavaScript', value: 'javascript' },
          { label: 'TypeScript', value: 'typescript' },
          { label: 'Python', value: 'python' },
          { label: 'SQL', value: 'sql' },
          { label: 'JSON', value: 'json' },
          { label: 'YAML', value: 'yaml' },
          { label: 'Plain text / diagram', value: 'text' },
        ],
      },
      { name: 'code', type: 'code', required: true, admin: { language: 'plaintext' } },
    ],
  },
  {
    slug: 'prjButtons',
    labels: { singular: 'Buttons', plural: 'Button rows' },
    fields: [
      {
        name: 'items',
        type: 'array',
        labels: { singular: 'Button', plural: 'Buttons' },
        minRows: 1,
        maxRows: 4,
        fields: [
          { name: 'label', type: 'text', localized: true, required: true },
          {
            name: 'url',
            type: 'text',
            required: true,
            admin: { description: 'Dirección completa (https://...) o interna (/projects).' },
          },
          {
            name: 'style',
            type: 'select',
            defaultValue: 'primary',
            options: [
              { label: 'Filled', value: 'primary' },
              { label: 'Outline', value: 'ghost' },
            ],
          },
          { name: 'newTab', type: 'checkbox', defaultValue: false, label: 'Open in a new tab' },
        ],
      },
    ],
  },
]