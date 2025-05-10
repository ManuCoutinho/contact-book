'use client'
import { Fragment } from 'react'
import { useSession } from 'next-auth/react'
import {
  Box,
  Button,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Stack,
  Typography,
  TextField
} from '@mui/material'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import { useGeolocation } from '@/hooks/useGeolocation'
import { useContact } from '@/hooks/useContact'
import setUrlParams from '@/utils/set-url-params'
import phoneMask from '@/utils/phone-mask'
import cpfMask from '@/utils/cpf-mask'
import { ActionsMenu } from './actions.menu'
import type { Contact } from '@/types'
import { useFilterData } from './hooks/useFilterData'

export default function ContactList({
  contacts
}: Readonly<{ contacts: Contact[] }>) {
  const { data } = useSession()
  const { filteredData, search, setSearch } = useFilterData(contacts)
  const { setGeolocation } = useGeolocation()
  const { contact: store } = useContact()
  const isAuth = !!data?.user
  function handleCreateContact() {
    if (isAuth) {
      setUrlParams([{ key: 'mode', value: 'create' }])
    }
  }
  console.log('🙀', filteredData)
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
          disabled={!isAuth}
        >
          Novo
        </Button>
      </Stack>
      {!isAuth ? (
        <Typography color='textDisabled' variant='caption' align='center'>
          Faça o login ou registre-se para utilizar
        </Typography>
      ) : (
        <Box sx={{ height: '100%' }}>
          <TextField
            sx={{ marginBottom: '6px' }}
            fullWidth
            size='small'
            type='search'
            label='Buscar...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <List dense>
            {filteredData?.map((contact, i) => {
              const fullAddress = `${contact.address.street}, ${
                contact.address.number
              }, ${contact.address.complement ?? ''} ${
                contact.address.neighborhood
              } - ${contact.address.city} - ${contact.address.state}`
              const isLast = i + 1 === contacts.length
              return (
                <Fragment key={contact.id}>
                  <ListItem disablePadding>
                    <ListItemButton
                      selected={contact.id === store?.id}
                      onClick={() => setGeolocation(contact.address.location)}
                    >
                      <ListItemText
                        primary={contact.name}
                        secondary={
                          <span className='flex flex-col gap-1'>
                            <Typography component='span' fontSize='small'>
                              CPF: {cpfMask(contact.cpf)} - Tel:{' '}
                              {phoneMask(contact.phone)}
                            </Typography>
                            <Typography component='span' fontSize='small'>
                              {fullAddress}
                            </Typography>
                          </span>
                        }
                      />
                    </ListItemButton>
                    <ActionsMenu item={contact} />
                  </ListItem>
                  {!isLast ? <Divider component='li' /> : null}
                </Fragment>
              )
            })}
          </List>
        </Box>
      )}
    </Grid>
  )
}
