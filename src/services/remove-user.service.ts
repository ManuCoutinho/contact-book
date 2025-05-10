'use server'

import { session } from '@/lib/session'
import { ApiException } from '@/utils'

export default async function onDeleteUserAccount() {
  const auth = await session()
  const token = auth?.user?.accessToken

  if (!token) throw new ApiException('User not authorized', 401)

  const res = await fetch(`${process.env.API_URL}/delete-account`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
  if (res.ok) {
    return
  }

  if (!res.ok) {
    const error = await res.json()

    throw new ApiException(error.message, res.status)
  }
}
