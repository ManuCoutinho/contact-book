'use client'
import { createContext, useState } from 'react'
import type { Contact } from '@/types'

type ContactContextType = {
  contact: Contact | null
  setContact: (arg: Contact | null) => void
}
export const ContactContext = createContext<ContactContextType>({
  contact: null,
  setContact: () => null
})

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [currentContact, setCurrentContact] = useState<Contact | null>(null)

  return (
    <ContactContext.Provider
      value={{ contact: currentContact, setContact: setCurrentContact }}
    >
      {children}
    </ContactContext.Provider>
  )
}
