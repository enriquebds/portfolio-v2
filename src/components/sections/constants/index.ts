import { EMAIL } from '@/constants'

const CONTACT_ITEMS = [
  {
    label: 'Email',
    value: EMAIL,
    href: `mailto:${EMAIL}`,
    icon: '✉',
    display: EMAIL,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/enriquebds',
    href: 'https://linkedin.com/in/enriquebds',
    icon: '🔗',
    display: '/in/enriquebds',
  },
  {
    label: 'GitHub',
    value: 'github.com/enriquebds',
    href: 'https://github.com/enriquebds',
    icon: '⌥',
    display: '/enriquebds',
  },
  {
    label: 'Telefone',
    value: '+55 11 97552-0983',
    href: 'tel:+5511975520983',
    icon: '📱',
    display: '+55 11 97552-0983',
  },
]

const FORM_FIELDS = [
  { name: 'name', label: 'Nome', type: 'text', placeholder: 'Seu nome' },
  {
    name: 'email',
    label: 'Email',
    type: 'email',
    placeholder: 'seu@email.com',
  },
] as const

export { FORM_FIELDS, CONTACT_ITEMS }
