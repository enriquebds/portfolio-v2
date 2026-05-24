import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { Projects } from './src/collections/Projects.ts'
import { Experience } from './src/collections/Experience.ts'
import { Certifications } from './src/collections/Certifications.ts'
import { Skills } from './src/collections/Skills.ts'
import { Media } from './src/collections/Media.ts'
import path from 'path'
import { fileURLToPath } from 'url'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    meta: { titleSuffix: '— Enrique Barbosa' },
  },
  collections: [Projects, Experience, Certifications, Skills, Media],
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
