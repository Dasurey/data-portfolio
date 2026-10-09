import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import { Documents } from './collections/Documents'
import { SiteSettings } from './globals/SiteSettings'

import { Projects } from './collections/Projects'
import { Media } from './collections/Media'
import { Experience } from './collections/Experience'
import { Skills } from './globals/Skills'
import { Teo } from './globals/Teo'
import { ProjectsPage } from './globals/ProjectsPage'
import { ProjectFilters } from './collections/ProjectFilters'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    components: {
      graphics: {
        Logo: '/components/Logo/Logo#Logo',
        Icon: '/components/Logo/Logo#Logo',
      },
    },
    // Limpio de componentes SCSS que dan error
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Projects,
    Media,
    Experience,
    ProjectFilters,
    Documents,
    {
      slug: 'users',
      auth: true,
      access: {
        delete: () => false,
        update: () => true,
      },
      fields: [],
    },
  ],
  globals: [Skills, Teo, ProjectsPage, SiteSettings],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
  }),
  sharp, // Necesario para procesamiento de imágenes
  localization: {
    locales: [
      { label: 'English', code: 'en' },
      { label: 'Español', code: 'es' },
    ],
    defaultLocale: 'en',
    fallback: true,
  },
  plugins: [
    vercelBlobStorage({
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      // Sin `disablePayloadAccessControl`: Payload lee los archivos desde Blob y el admin muestra las miniaturas.
      collections: { media: true, documents: true },
      token: process.env.BLOB_READ_WRITE_TOKEN,
      clientUploads: false,
    }),
  ],
})