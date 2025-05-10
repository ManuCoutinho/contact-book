import { NextResponse } from 'next/server'
import { generateSaltHash } from '@/utils'
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()

  if (request.method !== 'POST') {
    return new NextResponse('Method not allowed', { status: 405 })
  }

  if (!body) return new NextResponse('Missing required body', { status: 400 })

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email: body.email }
    })

    if (existingUser) {
      return new NextResponse(JSON.stringify('Email already registered'), {
        status: 400
      })
    }

    const pswHash = await generateSaltHash(body.password)

    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: pswHash
      }
    })
    prisma.$disconnect()
    return new NextResponse(
      JSON.stringify({
        email: user.email,
        id: user.id
      }),
      { status: 201 }
    )
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 })
  }
}
