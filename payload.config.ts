import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Projects } from './src/collections/Projects'
import { Experience } from './src/collections/Experience'
import { Certifications } from './src/collections/Certifications'
import { Skills } from './src/collections/Skills'
import { Media } from './src/collections/Media'
import { Users } from './src/collections/Users'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'
const devOrigins =
  process.env.NODE_ENV === 'development'
    ? ['http://localhost:3000', 'http://localhost:3001', 'http://localhost:3002']
    : []
const allowedOrigins = Array.from(new Set([serverURL, ...devOrigins].filter(Boolean)))

export default buildConfig({
  serverURL,
  cors: allowedOrigins,
  csrf: allowedOrigins,
  admin: {
    user: 'users',
    meta: { titleSuffix: '— Enrique Barbosa' },
  },
  localization: {
    locales: ['pt-BR', 'en-US'],
    defaultLocale: 'pt-BR',
    fallback: true,
  },
  collections: [Users, Projects, Experience, Certifications, Skills, Media],
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    push: true,
  }),
  secret: process.env.PAYLOAD_SECRET || 'dev-secret-change-in-production',
  typescript: {
    outputFile: path.resolve(dirname, 'src/types/payload-types.ts'),
  },
  upload: { limits: { fileSize: 5000000 } },
})
