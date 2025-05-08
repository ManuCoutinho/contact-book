'use server'
import { ApiException } from "@/utils"

type Body = {
  email: string
  password: string
}
export default async function registerUser(body: Body) {
  if (!body) return new ApiException('Missing body', 400)

  const res = await fetch(`${process.env.API_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const error = await res.json()
    throw new ApiException(error.message, res.status)
  }
  const data = await res.json()
  return data
}