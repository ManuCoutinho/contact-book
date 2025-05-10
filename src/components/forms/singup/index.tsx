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
import { useSingup } from './hooks/useSingup'
import Toast from '@/components/toast'
import { modalStyle } from '@/styles/modal'

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
      <Button
        color='secondary'
        onClick={() => setOpen(true)}
        sx={{ color: '#64748b' }}
      >
        Registrar
      </Button>
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
          </Stack>
        </Paper>
      </Modal>
    </>
  )
}
