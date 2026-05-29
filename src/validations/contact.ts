import { z } from 'zod'

interface ContactErrorMessages {
  nameMin: string
  nameMax: string
  emailInvalid: string
  messageMin: string
  messageMax: string
}

export function buildContactSchema(msgs: ContactErrorMessages) {
  return z.object({
    name: z.string().trim().min(2, msgs.nameMin).max(100, msgs.nameMax),
    email: z.email(msgs.emailInvalid),
    message: z.string().trim().min(10, msgs.messageMin).max(2000, msgs.messageMax),
  })
}

export type ContactInput = z.infer<ReturnType<typeof buildContactSchema>>
