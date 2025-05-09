'use server'
import { session } from '@/lib/session'
import { ApiException } from '@/utils'

export default async function getContact() {
  const auth = await session()
  const token = auth?.user?.accessToken
  if (!!token) {
    const res = await fetch(`${process.env.API_URL}/contacts`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      next: { tags: ['get-contacts'] },
      cache: 'force-cache'
    })

    if (res.ok) {
      const data = await res.json()
      return data
    }

    if (!res.ok) {
      const error = await res.json()
      throw new ApiException(error.message, res.status)
    }
  }
}
