'use client'
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Stack, IconButton, MenuItem, Menu } from "@mui/material";
import { SinginForm, SingupForm } from '@/components/forms';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Face2RoundedIcon from '@mui/icons-material/Face2Rounded'
import { AccountDeletion } from './account-deletion'

export default function Header() {
  const { data: session } = useSession()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (session?.user) {
    return (
      <div className="w-full flex items-center justify-end">
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleMenu}
          color="warning"

        >
          <Face2RoundedIcon />
        </IconButton>
        <Menu
          id="menu-account"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          sx={{ width: '30ch' }}
        >
          <AccountDeletion />
          <MenuItem className="w-full flex items-center gap-1" onClick={() => {
            signOut()
            handleClose()
          }}>
            <LogoutRoundedIcon />
            Sair
          </MenuItem>
        </Menu>
      </div>
    )
  }
  return (
    <Stack component='header' direction='row' spacing={4} alignItems='center' alignSelf='flex-end'>
      <SinginForm />
      <SingupForm />
    </Stack>
  )
}