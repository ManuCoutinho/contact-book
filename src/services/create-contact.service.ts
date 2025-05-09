'use server'

import { ContactForm } from "@/components/forms/add-contact/schema";
import { ApiException } from "@/utils";

export default async function onCreateContact(body: ContactForm, location: string, user: string) {

  if (!location) throw new ApiException('Missing location', 400)
  if (!body) throw new ApiException('Missing valid body', 400)
  if (!user) throw new ApiException('Missing [userid]', 400)

  const res = await fetch(`${process.env.API_URL}/contacts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'userId': user
    },
    body: JSON.stringify({
      ...body,
      location: location
    })
  })

  if (!res.ok) {
    const error = await res.json()
    throw new ApiException(error.message, res.status)
  }
  const data = await res.json()
  return data
}

//todo: validação de body
//todo: criação de login
//todo: inclusão de auth header
//todo: GET com  filtro
//todo: PUT AND DELETE
//todo: criação logout
//todo: exclusão da pópria conta