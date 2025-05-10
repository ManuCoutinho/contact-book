'use server'

import { session } from '@/lib/session'
import { ApiException } from '@/utils'
import { revalidateTag } from 'next/cache'

export default async function onDeleteContact(contactId: number) {
  const auth = await session()
  const token = auth?.user?.accessToken
  if (!contactId) throw new ApiException('Missing [contactId]', 400)
  if (!token) throw new ApiException('Missing valid token', 401)

  const res = await fetch(
    `${process.env.API_URL}/contact-delete/${contactId}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    }
  )
  if (res.ok) {
    revalidateTag('get-contacts')
    return
  }

  if (!res.ok) {
    const error = await res.json()

    throw new ApiException(error.message, res.status)
  }
}
