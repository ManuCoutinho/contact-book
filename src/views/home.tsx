'use client'
import dynamic from 'next/dynamic'
import { useSearchParams } from 'next/navigation'
import { Card, Container, Divider, Grid, Typography } from '@mui/material'
import MenuBookTwoToneIcon from '@mui/icons-material/MenuBookTwoTone'
import { ContactList, Header, AddContactForm } from '@/components'
import { GeoLocationProvider } from '@/contexts/geolocation.context'
import { ContactProvider } from '@/contexts/contact.context'
import type { Contact } from '@/types'

const Map = dynamic(() => import('@/components/map'), { ssr: false })

export default function HomeView({ data }: Readonly<{ data: Contact[] }>) {
  const searchParams = useSearchParams()
  const mode = searchParams.get('mode')

  const modeSelection = {
    view: <Map />,
    edit: <AddContactForm />,
    create: <AddContactForm />
  }

  return (
    <Container maxWidth='xl' className='p-6 flex flex-col gap-6'>
      <Header />
      <div>
        <span>
          <MenuBookTwoToneIcon fontSize='large' />
          <Typography component='h1' variant='h3' sx={{ fontWeight: '700' }}>
            My Contacts
          </Typography>
        </span>
        <Typography component='h3' variant='subtitle2'>
          Guarde e gerencie sua lista de contatos
        </Typography>
      </div>
      <ContactProvider>
        <GeoLocationProvider>
          <Card className='p-6 min-h-[500px] size-full' elevation={4}>
            <Grid container spacing={4}>
              <ContactList contacts={data} />
              <Divider orientation='vertical' flexItem />
              {modeSelection[(mode as keyof typeof modeSelection) ?? 'view']}
            </Grid>
          </Card>
        </GeoLocationProvider>
      </ContactProvider>
    </Container>
  )
}
