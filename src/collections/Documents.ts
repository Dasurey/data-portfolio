import type { CollectionConfig } from 'payload'

/** PDFs (currículum, etc.). Se guardan en Vercel Blob, no en el repo. */
export const Documents: CollectionConfig = {
  slug: 'documents',
  labels: { singular: 'Document', plural: 'Documents' },
  admin: { useAsTitle: 'title' },
  access: { read: () => true },
  upload: { mimeTypes: ['application/pdf'] },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: { description: 'Nombre para encontrarlo en el admin (ej: CV octubre 2026).' },
    },
  ],
}