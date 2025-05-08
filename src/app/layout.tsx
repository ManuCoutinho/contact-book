import type { Metadata } from 'next'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import InitColorSchemeScript from '@mui/material/InitColorSchemeScript'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import '@/styles/globals.css'
import theme from '@/styles/theme'

export const metadata: Metadata = {
  title: 'My Contacts',
  description: 'All contacts in one place...'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='pt-BR' dir='ltr'>
      <body className='antialiased scroll-smooth'>
        <InitColorSchemeScript attribute='class' />
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <main className='@container/main mx-auto p-6'>{children}</main>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
