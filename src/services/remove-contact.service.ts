'use server'

import { ApiException } from "@/utils";
import { revalidateTag } from "next/cache";

export default async function onDeleteContact(user: number, contactId: number) {

  if (!contactId) throw new ApiException('Missing [contactId]', 400)
  if (!user) throw new ApiException('Missing [userid]', 400)

  const res = await fetch(`${process.env.API_URL}/contact/${contactId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'userId': String(user)
    }
  })
  if (res.ok) {
    revalidateTag('get-contacts')
    return
  }

  if (!res.ok) {
    const error = await res.json()
    console.log('🐼', error)
    throw new ApiException(error.message, res.status)
  }

}