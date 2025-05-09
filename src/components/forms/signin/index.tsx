'use client'

import {
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
  Paper
} from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { useSingin } from './hooks/useSignin'
import Toast from '@/components/toast'
import { modalStyle } from '@/styles/modal'

export default function SinginForm() {
  const {
    errors,
    register,
    onLogin,
    open,
    handleClose,
    isSubmitting,
    toast,
    handleCloseToast,
    setOpen,
    isDisabled
  } = useSingin()
  return (
    <>

      <Button onClick={() => setOpen(true)} color='primary'>entrar</Button>
      <Toast {...toast} handleClose={handleCloseToast} />

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-create-account'
        aria-describedby='create user account'
      >
        <Paper
          component='form'
          sx={modalStyle}
          onSubmit={onLogin}
          id='form-register-account'
          method='POST'
          aria-label='form-register-account'
        >
          <span className='absolute top-1 right-2'>
            <IconButton aria-label='close modal' onClick={handleClose}>
              <CloseRoundedIcon />
            </IconButton>
          </span>
          <fieldset
            form='form-register-account'
            className='size-full flex flex-col gap-6'
          >
            <Typography variant='h5'>Faça o login</Typography>
            <TextField
              size='small'
              label='E-mail'
              type='email'
              inputMode='email'
              {...register('email')}
              helperText={errors.email?.message}
              error={!!errors.email?.message}
            />
            <TextField
              label='Senha'
              size='small'
              type='password'
              {...register('password')}
              helperText={errors.password?.message}
              error={!!errors.password?.message}
            />
          </fieldset>
          <Stack className='w-full mt-6'>
            <Button disabled={isDisabled} type='submit' loading={isSubmitting}>
              Entrar
            </Button>
          </Stack>
        </Paper>
      </Modal>
    </>
  )
}
