'use client'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registerUser } from '@/services'
import { type RegisterForm, registerSchema } from '../schema'

export function useSingup() {
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
  } = useForm<RegisterForm>({
    resolver: yupResolver(registerSchema),
    criteriaMode: 'firstError',
    mode: 'onBlur'
  })

  const onSubmit: SubmitHandler<RegisterForm> = async (data) => {

    registerUser({
      password: data.password.trim(),
      email: data.email.trim()
    })
      .then(() => {
        setToast({ message: 'Usuário criado com sucesso!', open: true, severity: 'success' })
        handleClose()
      })
      .catch(() => {
        setToast({ message: 'Ocorreu um error ao criar o usuário', open: true, severity: 'error' })
      })
  }


  function handleClose() {
    clearErrors()
    reset()
    setOpen(false)
  }

  const hasError = Object.keys(errors).length > 0
  const isDisabled = isSubmitting || hasError

  const onCreateUser = handleSubmit(onSubmit)
  function handleCloseToast() {
    setToast({ message: '', open: false, severity: '' })
  }
  return {
    onCreateUser,
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
