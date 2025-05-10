import { prisma } from '@/lib/prisma'
import { jwtDecoder } from '@/utils'
import { NextResponse } from 'next/server'

export async function PATCH(request: Request) {
  const auth = request.headers.get('Authorization') as string
  if (request.method !== 'PATCH')
    return new NextResponse('Method not allowed', { status: 45 })

  if (!auth) return new NextResponse('Unauthorized', { status: 401 })

  const token = jwtDecoder<{ id: number; email: string }>(auth as string)
  const userId = token?.id

  if (!userId) {
    return new NextResponse(
      JSON.stringify('Unauthorized: user do not have permission'),
      { status: 403 }
    )
  }

  try {
    await prisma.user.update({
      where: { id: +userId },
      data: {
        active: false
      }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error(error)
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error', details: error }),
      { status: 500 }
    )
  } finally {
    prisma.$disconnect()
  }
}
