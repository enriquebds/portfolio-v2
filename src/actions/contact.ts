'use server'

import { resend } from '@/services/resend'
import { contactSchema, type ContactInput } from '@/validations/contact'

export type ContactFormState = {
  status: 'idle' | 'success' | 'error'
  message?: string
}

export async function sendContactEmail(input: ContactInput): Promise<ContactFormState> {
  // Revalida no servidor — a validação do client (react-hook-form) é só UX,
  // nunca a fonte de verdade. O client pode ser burlado.
  const parsed = contactSchema.safeParse(input)
  if (!parsed.success) {
    return { status: 'error', message: 'Dados inválidos. Confira os campos e tente novamente.' }
  }

  const { name, email, message } = parsed.data

  try {
    const { error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL ?? 'Portfólio <onboarding@resend.dev>',
      to: process.env.CONTACT_TO_EMAIL ?? 'enrique.barbosasilva@gmail.com',
      replyTo: email,
      subject: `Contato via portfólio — ${name}`,
      text: `Nome: ${name}\nEmail: ${email}\n\n${message}`,
    })

    if (error) {
      return {
        status: 'error',
        message: 'Não foi possível enviar agora. Tente novamente em instantes.',
      }
    }

    return { status: 'success', message: 'Mensagem enviada! Retorno em breve.' }
  } catch {
    return {
      status: 'error',
      message: 'Não foi possível enviar agora. Tente novamente em instantes.',
    }
  }
}
