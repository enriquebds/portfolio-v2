'use server'

import { EMAIL } from '@/constants'
import { resend } from '@/services/resend'
import { buildContactSchema, type ContactInput } from '@/validations/contact'
import { getLocale, getTranslations } from 'next-intl/server'

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function sendContactEmail(input: ContactInput): Promise<ContactFormState> {
  const locale = await getLocale()
  const t = await getTranslations({ locale, namespace: 'contact' })

  const schema = buildContactSchema({
    nameMin: t('errors.nameMin'),
    nameMax: t('errors.nameMax'),
    emailInvalid: t('errors.emailInvalid'),
    messageMin: t('errors.messageMin'),
    messageMax: t('errors.messageMax'),
  })

  const parsed = schema.safeParse(input)
  if (!parsed.success) {
    return { status: 'error', message: t('errors.invalidData') }
  }

  const { name, email, message } = parsed.data

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Portfólio <onboarding@resend.dev>',
      to: process.env.CONTACT_TO_EMAIL ?? EMAIL,
      replyTo: email,
      subject: t('emailSubject', { name }),
      text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
    })

    if (error) {
      return { status: 'error', message: t('errors.sendError') }
    }

    return { status: 'success', message: t('successMessage') }
  } catch {
    return { status: 'error', message: t('errors.sendError') }
  }
}
