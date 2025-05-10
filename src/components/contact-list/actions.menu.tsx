import { useState } from 'react'
import { IconButton, Menu, MenuItem } from '@mui/material'
import MoreVertRounded from '@mui/icons-material/MoreVertRounded'
import EditRoundedIcon from '@mui/icons-material/EditRounded'
import { useContact } from '@/hooks/useContact'
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded'
import setUrlParams from '@/utils/set-url-params'
import type { Contact } from '@/types'
import { useDeleteContact } from './hooks/useDeleteContact'
import Toast from '../toast'

export function ActionsMenu({ item }: { item: Contact }) {
  const { setContact } = useContact()
  const { onDeleteContact, toast, handleCloseToast } = useDeleteContact()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  function handleSetEditionMode() {
    setContact(item)
    setUrlParams([
      { key: 'mode', value: 'edit' },
      { key: 'contact', value: String(item.id) }
    ])
    handleClose()
  }

  return (
    <div>
      <Toast {...toast} handleClose={handleCloseToast} />
      <IconButton
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
      >
        <MoreVertRounded />
      </IconButton>
      <Menu
        id='long-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              width: '15ch'
            }
          }
        }}
      >
        <MenuItem
          className='flex items-center gap-1.5'
          onClick={handleSetEditionMode}
        >
          <EditRoundedIcon fontSize='small' /> Editar
        </MenuItem>
        <MenuItem
          className='flex items-center gap-1.5'
          onClick={() => {
            onDeleteContact(item.id)
            handleClose()
          }}
        >
          <DeleteForeverRoundedIcon fontSize='small' /> Deletar
        </MenuItem>
      </Menu>
    </div>
  )
}
