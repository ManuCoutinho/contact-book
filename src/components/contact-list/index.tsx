'use client'
import { Box, Button, Grid, Stack, Typography } from '@mui/material'
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded'
import setUrlParams from '@/utils/set-url-params'
export default function ContactList() {
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
      <Typography color='textDisabled' variant='caption' align='center'>
        Faça o login ou registre-se para utilizar
      </Typography>
      <Box sx={{ height: '100%' }}></Box>
    </Grid>
  )
}
