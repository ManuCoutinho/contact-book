import { useContext } from 'react'
import { ContactContext } from '@/contexts/contact.context'

export function useContact() {
  const context = useContext(ContactContext)

  if (!context) throw new Error('Contact context needs a provider')
  return context
}
