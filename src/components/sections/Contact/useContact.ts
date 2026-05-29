'use client'

import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import { useInView } from '@/hooks/useInView'
import { buildContactSchema, type ContactInput } from '@/validations/contact'
import { sendContactEmail, type ContactFormState } from '@/actions/contact'

export const useContact = () => {
  const t = useTranslations('contact')
  const { ref, isInView } = useInView({ threshold: 0.1 })
  const [serverState, setServerState] = useState<ContactFormState>({
    status: 'idle',
  })

  const schema = useMemo(
    () =>
      buildContactSchema({
        nameMin: t('errors.nameMin'),
        nameMax: t('errors.nameMax'),
        emailInvalid: t('errors.emailInvalid'),
        messageMin: t('errors.messageMin'),
        messageMax: t('errors.messageMax'),
      }),
    [t],
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(schema),
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
