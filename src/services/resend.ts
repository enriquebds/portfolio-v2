import { Resend } from 'resend'

// Cliente Resend compartilhado. A API key é lida do ambiente (server-only).
export const resend = new Resend(process.env.RESEND_API_KEY)
