'use server'

import { ContactForm } from '@/components/forms/add-contact/schema'
import { session } from '@/lib/session'
import { ApiException } from '@/utils'
import { revalidateTag } from 'next/cache'

export default async function onCreateContact(
  body: ContactForm,
  location: string
) {
  const auth = await session()
  if (!location) throw new ApiException('Missing location', 400)
  if (!body) throw new ApiException('Missing valid body', 400)
  if (!auth) throw new ApiException('Unauthorized', 401)
  const token = auth?.user?.accessToken
  const res = await fetch(`${process.env.API_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      ...body,
      location: location
    })
  })

  if (res.ok) {
    revalidateTag('get-contacts')
    const data = await res.json()
    return data
  }

  if (!res.ok) {
    const error = await res.json()
    throw new ApiException(error.message, res.status)
  }
}
