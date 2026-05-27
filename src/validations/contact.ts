import { z } from 'zod'

// Schema do formulário de contato — reutilizável no client e no server (Zod v4).
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Informe seu nome (mínimo 2 caracteres).')
    .max(100, 'Nome muito longo.'),
  email: z.email('Informe um email válido.'),
  message: z
    .string()
    .trim()
    .min(10, 'A mensagem precisa ter pelo menos 10 caracteres.')
    .max(2000, 'Mensagem muito longa (máximo 2000 caracteres).'),
})

export type ContactInput = z.infer<typeof contactSchema>
