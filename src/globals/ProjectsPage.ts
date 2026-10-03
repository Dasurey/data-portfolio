import type { GlobalConfig } from 'payload'

/** Página /projects: las secciones (bloques) y qué filtros muestra cada una. */
export const ProjectsPage: GlobalConfig = {
  slug: 'projects-page',
  label: 'Projects page',
  access: { read: () => true },
  fields: [
    {
      name: 'sections',
      type: 'array',
      labels: { singular: 'Section', plural: 'Sections' },
      admin: {
        description:
          'Bloques de la página, en el orden en que se muestran: arrastrá las filas para reordenarlas. Cada sección muestra los proyectos que tengan alguno de sus filtros. Un proyecto aparece una sola vez (en la primera sección que lo incluya). Los que no estén en ninguna van al final, en "More work".',
      },
      fields: [
        { name: 'title', type: 'text', required: true, localized: true },
        { name: 'description', type: 'textarea', localized: true },
        {
          name: 'filters',
          type: 'relationship',
          relationTo: 'project-filters',
          hasMany: true,
          admin: {
            description:
              'Filtros de esta sección: muestra los proyectos que tengan cualquiera de ellos. Sin filtros, la sección queda vacía y no se muestra.',
          },
        },
      ],
    },
  ],
}