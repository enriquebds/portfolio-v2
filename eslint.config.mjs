import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import eslintConfigPrettier from 'eslint-config-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({ baseDirectory: __dirname })

const eslintConfig = [
  {
    ignores: [
      '.next/**',
      'build/**',
      'out/**',
      'next-env.d.ts',
      // Payload-generated files
      'src/types/payload-types.ts',
      'src/app/(payload)/admin/**/importMap.ts',
    ],
  },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    rules: {
      // Labels estilizados como `// texto` dentro do JSX são intencionais (tema dev).
      'react/jsx-no-comment-textnodes': 'off',
    },
  },
  // Must stay last: disables ESLint rules that conflict with Prettier.
  eslintConfigPrettier,
]

export default eslintConfig
