import type { CollectionConfig } from 'payload'

export const Experience: CollectionConfig = {
  slug: 'experience',
  admin: {
    useAsTitle: 'company',
    defaultColumns: ['company', 'role', 'current', 'order'],
  },
  fields: [
    { name: 'company', type: 'text', required: true },
    { name: 'role', type: 'text', required: true, localized: true },
    { name: 'startDate', type: 'date', required: true },
    { name: 'endDate', type: 'date' },
    { name: 'location', type: 'text', localized: true },
    {
      name: 'description',
      type: 'array',
      localized: true,
      fields: [{ name: 'bullet', type: 'text' }],
    },
    { name: 'stack', type: 'array', fields: [{ name: 'tech', type: 'text' }] },
    { name: 'current', type: 'checkbox', defaultValue: false },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
