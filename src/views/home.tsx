import { Button, Card, Container, Grid, Stack, Typography } from '@mui/material'
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import { Map, ContactList } from '@/components'

export default function HomeView() {
  return (
    <Container maxWidth='xl' className='p-6 flex flex-col gap-6'>
      <Stack direction='row' spacing={4} alignItems='center' alignSelf='flex-end'>
        <Button color='primary'>entrar</Button>
        <Button color='secondary'>Registrar</Button>
      </Stack>
      <div>
        <span>
          <MenuBookTwoToneIcon fontSize='large' />
          <Typography component='h1' variant='h3' sx={{ fontWeight: '700' }}>My Contacts</Typography>
        </span>
        <Typography component='h3' variant='subtitle2'>Guarde e gerencie sua lista de contatos</Typography>
      </div>
      <Card className='p-6 mt-4' elevation={3}>
        <Grid container spacing={0}>
          <ContactList />
          <Map />
        </Grid>
      </Card>
    </Container>
  )
}
