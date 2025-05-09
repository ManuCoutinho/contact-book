'use server'
import { ApiException } from "@/utils"


export default async function getContacts(user: string) {
  if (!user) throw new ApiException('Missing [userid]', 400)

  const res = await fetch(`${process.env.API_URL}/contacts`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'UserId': user
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