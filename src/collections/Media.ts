import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  upload: {
    staticDir: 'media',
    imageSizes: [
      // Tamaños de imagen predefinidos para miniaturas y optimización de carga
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*'],
    // Reduce el tamaño de las imágenes para optimizar la carga y el almacenamiento
    resizeOptions: { width: 2000, withoutEnlargement: true },
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      localized: true,
    },
  ],
  admin: { defaultColumns: ['filename', 'alt', 'updatedAt'] },
}
