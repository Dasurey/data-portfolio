import type { GlobalConfig } from 'payload'

/** Página /projects: filtros (botones de arriba) y secciones (bloques con sus proyectos). */
export const ProjectsPage: GlobalConfig = {
  slug: 'projects-page',
  label: 'Projects page',
  access: { read: () => true },
  fields: [
    {
      name: 'filters',
      type: 'array',
      labels: { singular: 'Filter', plural: 'Filters' },
      admin: {
        description:
          'Botones de filtro (el botón "All work" se agrega solo). Cada filtro lista los proyectos que lo cumplen; un proyecto puede estar en varios.',
      },
      fields: [
        { name: 'label', type: 'text', required: true, localized: true },
        { name: 'projects', type: 'relationship', relationTo: 'projects', hasMany: true },
      ],
    },
    {
      name: 'sections',
      type: 'array',
      labels: { singular: 'Section', plural: 'Sections' },
      admin: {
        description:
          'Bloques de la página, en el orden en que se muestran: arrastrá las filas para reordenarlas. Un proyecto aparece una sola vez (en la primera sección que lo incluya). Los que no estén en ninguna van al final, en "More work".',
      },
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', localized: true },
        {
          name: 'projects',
          type: 'relationship',
          relationTo: 'projects',
          hasMany: true,
          admin: { description: 'Proyectos de esta sección, en el orden en que se muestran (arrastrá para ordenar).' },
        },
      ],
    },
  ],
}