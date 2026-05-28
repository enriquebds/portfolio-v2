import type { CollectionConfig } from 'payload'

export const Skills: CollectionConfig = {
  slug: 'skills',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'category', 'level', 'order'],
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Frontend', value: 'frontend' },
        { label: 'Backend', value: 'backend' },
        { label: 'DevOps', value: 'devops' },
        { label: 'Soft Skills', value: 'softskills' },
      ],
    },
    {
      name: 'level',
      type: 'select',
      required: true,
      options: [
        { label: 'Avançado', value: 'avancado' },
        { label: 'Intermediário', value: 'intermediario' },
        { label: 'Básico', value: 'basico' },
      ],
    },
    { name: 'icon', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
