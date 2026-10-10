import type { GlobalConfig } from 'payload'

/** Sección "Skills & tooling" del Home: hasta 3 columnas, cada una con sus proyectos. */
export const Skills: GlobalConfig = {
  slug: 'skills',
  label: 'Skills & tooling',
  access: { read: () => true },
  fields: [
    {
      name: 'groups',
      type: 'array',
      label: 'Columns',
      labels: { singular: 'Column', plural: 'Columns' },
      minRows: 1,
      maxRows: 3,
      admin: { description: 'Cada fila es una columna del Home. Se reordenan arrastrando.' },
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
          localized: true,
          admin: { description: 'Nombre de la columna (ej: Data Engineering).' },
        },
        {
          name: 'icon',
          type: 'select',
          defaultValue: 'database',
          options: [
            { label: 'Database', value: 'database' },
            { label: 'Chart', value: 'chart' },
            { label: 'Sparkles (AI)', value: 'sparkles' },
            { label: 'Workflow', value: 'workflow' },
            { label: 'Shield', value: 'shield' },
            { label: 'Automation', value: 'zap' },
            { label: 'Layers', value: 'layers' },
            { label: 'Team', value: 'users' },
          ],
        },
        {
          name: 'projects',
          type: 'relationship',
          relationTo: 'projects',
          hasMany: true,
          admin: {
            description:
              'Proyectos de esta columna (casos de estudio). Las herramientas se calculan solas con el Tech Stack de cada proyecto.',
          },
        },
        {
          name: 'tools',
          type: 'relationship',
          relationTo: 'tools',
          hasMany: true,
          label: 'Skills',
          admin: {
            description: 'Elegí las habilidades que querés mostrar en esta columna.',
          },
        },
      ],
    },
  ],
}