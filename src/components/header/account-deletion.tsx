'use client'
import { useState, useTransition } from 'react'
import {
  Button,
  IconButton,
  MenuItem,
  Modal,
  Paper,
  Typography
} from '@mui/material'
import PersonRemoveRoundedIcon from '@mui/icons-material/PersonRemoveRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import DangerousRoundedIcon from '@mui/icons-material/DangerousRounded'
import { onDeleteUserAccount } from '@/services'
import { modalStyle } from '@/styles/modal'
import { signOut } from 'next-auth/react'

export function AccountDeletion() {
  const [open, setOpen] = useState(false)
  const [pending, start] = useTransition()
  const handleClose = () => {
    setOpen(false)
  }
  return (
    <>
      <MenuItem
        className='w-full flex items-center gap-1'
        onClick={() => setOpen(true)}
      >
        <PersonRemoveRoundedIcon />
        Excluir conta
      </MenuItem>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-account-deletion'
        aria-describedby='account disclaimer'
      >
        <Paper component='form' sx={modalStyle}>
          <div className='w-full space-y-6'>
            <div className='flex items-center gap-2'>
              <DangerousRoundedIcon fontSize='large' color='error' />
              <Typography variant='h6'>
                Confirma a exclusão da sua conta?
              </Typography>
            </div>
            <span className='absolute top-1 right-2'>
              <IconButton aria-label='close modal' onClick={handleClose}>
                <CloseRoundedIcon />
              </IconButton>
            </span>
            <Typography sx={{ textWrap: 'pretty', marginBottom: '6px' }}>
              {' '}
              Ao confirmar sua conta será excluída permanentemente.
            </Typography>
            <Typography fontSize='small' color='textSecondary'>
              Esta ação não poderá ser desfeita!
            </Typography>
            <div className='p-4 flex items-center w-full gap-4 justify-end mt-6'>
              <Button
                onClick={() =>
                  start(() => {
                    onDeleteUserAccount().then(() => signOut())
                  })
                }
                loading={pending}
                disabled={pending}
                color='error'
                variant='contained'
              >
                Sim
              </Button>
              <Button onClick={handleClose}>Não</Button>
            </div>
          </div>
        </Paper>
      </Modal>
    </>
  )
}
