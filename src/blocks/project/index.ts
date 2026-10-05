import type { Block, Option } from 'payload'

/** Lenguajes del bloque de código (nombres que entiende el resaltador). */
const languages: Option[] = [
  { label: 'Bash / Terminal', value: 'bash' },
  { label: 'PowerShell', value: 'powershell' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'TypeScript', value: 'typescript' },
  { label: 'JSX', value: 'jsx' },
  { label: 'TSX', value: 'tsx' },
  { label: 'Python', value: 'python' },
  { label: 'R', value: 'r' },
  { label: 'SQL', value: 'sql' },
  { label: 'JSON', value: 'json' },
  { label: 'YAML', value: 'yaml' },
  { label: 'HTML', value: 'html' },
  { label: 'CSS', value: 'css' },
  { label: 'Markdown', value: 'markdown' },
  { label: 'Dockerfile', value: 'dockerfile' },
  { label: 'Diff', value: 'diff' },
  { label: 'Java', value: 'java' },
  { label: 'C#', value: 'csharp' },
  { label: 'C++', value: 'cpp' },
  { label: 'Go', value: 'go' },
  { label: 'Rust', value: 'rust' },
  { label: 'PHP', value: 'php' },
  { label: 'Plain text / diagram', value: 'text' },
]

/** Bloques que se insertan con "/" dentro del campo Content de un proyecto. */
export const projectBlocks: Block[] = [
  {
    slug: 'prjLede',
    interfaceName: 'PrjLedeBlock',
    labels: { singular: 'Intro (large text)', plural: 'Intros' },
    fields: [{ name: 'text', type: 'textarea', required: true }],
  },
  {
    slug: 'prjCallout',
    interfaceName: 'PrjCalloutBlock',
    labels: { singular: 'Note box', plural: 'Note boxes' },
    fields: [{ name: 'text', type: 'textarea', required: true }],
  },
  {
    slug: 'prjMetrics',
    interfaceName: 'PrjMetricsBlock',
    labels: { singular: 'Metrics strip', plural: 'Metrics strips' },
    fields: [
      {
        name: 'items',
        type: 'array',
        labels: { singular: 'Metric', plural: 'Metrics' },
        minRows: 1,
        maxRows: 6,
        fields: [
          { name: 'value', type: 'text', required: true },
          { name: 'label', type: 'text' },
        ],
      },
    ],
  },
  {
    slug: 'prjImage',
    interfaceName: 'PrjImageBlock',
    labels: { singular: 'Image', plural: 'Images' },
    fields: [
      { name: 'image', type: 'upload', relationTo: 'media', required: true },
      { name: 'caption', type: 'text' },
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
    interfaceName: 'PrjVideoBlock',
    labels: { singular: 'Video', plural: 'Videos' },
    fields: [
      {
        name: 'url',
        type: 'text',
        required: true,
        admin: { description: 'Link de YouTube o Vimeo, o de un archivo de video (.mp4).' },
      },
      { name: 'caption', type: 'text' },
    ],
  },
  {
    slug: 'prjCode',
    interfaceName: 'PrjCodeBlock',
    labels: { singular: 'Code', plural: 'Code blocks' },
    fields: [
      { name: 'title', type: 'text', admin: { description: 'Opcional: nombre del archivo o "Terminal".' } },
      { name: 'language', type: 'select', defaultValue: 'bash', options: languages },
      { name: 'code', type: 'code', required: true, admin: { language: 'plaintext' } },
    ],
  },
  {
    slug: 'prjButtons',
    interfaceName: 'PrjButtonsBlock',
    labels: { singular: 'Buttons', plural: 'Button rows' },
    fields: [
      {
        name: 'items',
        type: 'array',
        labels: { singular: 'Button', plural: 'Buttons' },
        minRows: 1,
        maxRows: 4,
        fields: [
          { name: 'label', type: 'text', required: true },
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