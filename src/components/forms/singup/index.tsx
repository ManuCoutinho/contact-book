'use client'

import {
  Box,
  Button,
  IconButton,
  Modal,
  Stack,
  TextField,
  Typography,
  Snackbar
} from '@mui/material'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { style } from './styles'
import { useSingup } from './hooks/useSingup'

export default function SingupForm() {
  const {
    errors,
    register,
    onCreateUser,
    open,
    handleClose,
    isSubmitting,
    toast,
    handleCloseToast,
    setOpen,
    isDisabled
  } = useSingup()
  return (
    <>
      <Button color='secondary' onClick={() => setOpen(true)}>
        Registrar
      </Button>
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleCloseToast}
        message={toast.message}
      />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-create-account'
        aria-describedby='create user account'
      >
        <Box
          component='form'
          sx={style}
          onSubmit={onCreateUser}
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
            <Typography variant='h5'>Crie sua conta</Typography>
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
            <TextField
              label='Confirme a senha'
              type='password'
              size='small'
              {...register('passwordConfirmation')}
              helperText={errors.passwordConfirmation?.message}
              error={!!errors.passwordConfirmation?.message}
            />
          </fieldset>

          <Stack className='w-full mt-6'>
            <Button disabled={isDisabled} type='submit' loading={isSubmitting}>
              Registrar
            </Button>
            <Button
              color='info'
              onClick={() => console.log('to login')}
              disabled={isSubmitting}
            >
              Você tem uma conta? Faça o login
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}
