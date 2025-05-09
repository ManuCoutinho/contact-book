'use server'

import { auth } from './auth.config'

export async function session() {
  const userSession = await auth()

  if (!userSession) return null
  return userSession
}