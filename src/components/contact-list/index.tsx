'use client'
import { Fragment } from 'react'
import { Box, Button, Divider, Grid, List, ListItem, ListItemText, ListItemButton, Stack, Typography } from '@mui/material'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import setUrlParams from '@/utils/set-url-params'
import phoneMask from '@/utils/phone-mask'
import cpfMask from '@/utils/cpf-mask'
import type { Contact } from '@/types'
import { useGeolocation } from '@/hooks/useGeolocation'

export default function ContactList({ contacts }: Readonly<{ contacts: Contact[] }>) {
  const { setGeolocation } = useGeolocation()
  function handleCreateContact() {
    setUrlParams([{ key: 'mode', value: 'create' }])
  }
  return (
    <Grid size={4} className='min-h-max'>
      <Stack direction='row' justifyContent='space-between'>
        <Typography component='h4' variant='overline' fontSize='large'>
          Contatos
        </Typography>
        <Button
          size='small'
          variant='text'
          onClick={handleCreateContact}
          color='warning'
          startIcon={<AddCircleOutlineRoundedIcon fontSize='small' />}

        >
          Novo
        </Button>
      </Stack>
      {!contacts && (
        <Typography color='textDisabled' variant='caption' align='center'>
          Faça o login ou registre-se para utilizar
        </Typography>
      )}
      <Box sx={{ height: '100%' }}>
        <List dense>
          {contacts.map((contact, i) => {
            const fullAddress = `${contact.address.street}, ${contact.address.number}, ${contact.address.neighborhood} - ${contact.address.city} - ${contact.address.state}`
            const isLast = i + 1 === contacts.length
            return (
              <Fragment key={contact.id}>
                <ListItem disablePadding>
                  <ListItemButton onClick={() => setGeolocation(contact.address.location)}>
                    <ListItemText
                      primary={`${contact.name} (${cpfMask(contact.cpf)})`}
                      secondary={
                        <span className='flex flex-col gap-1'>
                          <Typography component='span' fontSize='small'>{contact.user.email} - Tel: {phoneMask(contact.phone)}</Typography>
                          <Typography component='span' fontSize='small'>{fullAddress}</Typography>
                        </span>
                      }
                    />
                  </ListItemButton>
                </ListItem>
                {
                  !isLast ? <Divider component="li" /> : null
                }
              </Fragment>
            )
          })}
        </List>
      </Box>
    </Grid>
  )
}
