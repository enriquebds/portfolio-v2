import type { CollectionConfig } from 'payload'

export const Projects: CollectionConfig = {
  slug: 'projects',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'status', 'featured', 'order'],
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true, required: true },
    { name: 'description', type: 'textarea' },
    { name: 'longDescription', type: 'richText' },
    { name: 'stack', type: 'array', fields: [{ name: 'tech', type: 'text' }] },
    { name: 'githubUrl', type: 'text' },
    { name: 'liveUrl', type: 'text' },
    { name: 'thumbnail', type: 'upload', relationTo: 'media' },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Published', value: 'published' },
        { label: 'Coming Soon', value: 'coming-soon' },
        { label: 'Draft', value: 'draft' },
      ],
    },
    { name: 'featured', type: 'checkbox', defaultValue: false },
    { name: 'order', type: 'number', defaultValue: 0 },
  ],
}
