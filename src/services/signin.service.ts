'use server'
import { prisma } from '@/lib/prisma'
import jwt from 'jsonwebtoken'
import { comparePassword } from '@/utils'

const JWT_SECRET = process.env.JWT_SECRET || 'buahahaha'

export default async function signIn(email: string, password: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) return null

    const passwordMatch = await comparePassword(password, user.password)
    if (!passwordMatch) return null

    //24h valid
    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '1d' }
    )

    return {
      id: user.id,
      email: user.email,
      token
    }
  } catch (error) {
    console.error('Auth error:', error)
    return null
  }
}