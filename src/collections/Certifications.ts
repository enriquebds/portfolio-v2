import type { CollectionConfig } from 'payload'

export const Certifications: CollectionConfig = {
  slug: 'certifications',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'issuer', 'type', 'order'] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'issuer', type: 'text', required: true },
    {
      name: 'type', type: 'select', required: true,
      options: [
        { label: 'Certification', value: 'certification' },
        { label: 'Degree', value: 'degree' },
      ],
    },
    { name: 'date', type: 'text' },
    { name: 'credentialUrl', type: 'text' },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
