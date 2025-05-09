'use client'
import { Button, Card, Container, Divider, Grid, Stack, Typography } from '@mui/material'
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone';
import { ContactList, SingupForm, AddContactForm } from '@/components'
import { useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import type { Contact } from '@/types';
import { GeoLocationProvider } from '@/contexts/geolocation.context';
import { ContactProvider } from '@/contexts/contact.context';

const Map = dynamic(() => import('@/components/map'), { ssr: false });

export default function HomeView({ data }: Readonly<{ data: Contact[] }>) {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')

  return (
    <Container maxWidth='xl' className='p-6 flex flex-col gap-6'>
      <Stack direction='row' spacing={4} alignItems='center' alignSelf='flex-end'>
        <Button color='primary'>entrar</Button>
        <SingupForm />
      </Stack>
      <div>
        <span>
          <MenuBookTwoToneIcon fontSize='large' />
          <Typography component='h1' variant='h3' sx={{ fontWeight: '700' }}>My Contacts</Typography>
        </span>
        <Typography component='h3' variant='subtitle2'>Guarde e gerencie sua lista de contatos</Typography>
      </div>
      <ContactProvider>
        <GeoLocationProvider>
          <Card className='p-6 min-h-[500px] size-full' elevation={4}>
            <Grid container spacing={4}>
              <ContactList contacts={data} />
              <Divider orientation='vertical' flexItem />
              {mode === 'view' ? <Map /> : <AddContactForm />}
            </Grid>
          </Card>
        </GeoLocationProvider>
      </ContactProvider>
    </Container>
  )
}
