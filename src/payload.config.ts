import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Projects } from './collections/Projects'
import { Media } from './collections/Media'
import { Experience } from './collections/Experience'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    // Limpio de componentes SCSS que dan error
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Projects,
    Media,
    Experience,
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
})