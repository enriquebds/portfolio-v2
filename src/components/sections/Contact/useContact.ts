'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useInView } from '@/hooks/useInView'
import { contactSchema, type ContactInput } from '@/validations/contact'
import { sendContactEmail, type ContactFormState } from '@/actions/contact'

export const useContact = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 })
  const [serverState, setServerState] = useState<ContactFormState>({
    status: 'idle',
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  })

  const onSubmit = handleSubmit(async data => {
    const result = await sendContactEmail(data)

    setServerState(result)
    if (result.status === 'success') reset()
  })

  const isBusy = isSubmitting || !isValid

  return {
    ref,
    isInView,
    register,
    errors,
    isSubmitting,
    isBusy,
    onSubmit,
    serverState,
  }
}
