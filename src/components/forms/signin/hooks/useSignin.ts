'use client'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { type LoginForm, loginSchema } from '../schema'

export function useSingin() {
  const searchParams = useSearchParams()
  const errorUrl = searchParams.get('error')
  const [open, setOpen] = useState(false)
  const [toast, setToast] = useState({
    open: false,
    message: '',
    severity: ''
  })
  const {
    register,
    handleSubmit,
    clearErrors,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<LoginForm>({
    resolver: yupResolver(loginSchema),
    criteriaMode: 'firstError',
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<LoginForm> = async (data) => {
    await signIn('credentials', {
      ...data,
      redirectTo: '/'
    }).catch(() => {
      setToast({ message: 'Credenciais inválidas!', open: true, severity: 'error' })
    })
  }

  useEffect(() => {

    if (errorUrl) {
      setToast({ message: 'Credenciais inválidas!', open: true, severity: 'error' })
    }
  }, [errorUrl])

  function handleClose() {
    clearErrors()
    reset()
    setOpen(false)
  }

  const hasError = Object.keys(errors).length > 0
  const isDisabled = isSubmitting || hasError

  const onLogin = handleSubmit(onSubmit)
  function handleCloseToast() {
    setToast({ message: '', open: false, severity: '' })
  }
  return {
    onLogin,
    handleCloseToast,
    register,
    errors,
    hasError,
    handleClose,
    toast,
    open,
    isDisabled,
    setOpen,
    isSubmitting
  }
}
