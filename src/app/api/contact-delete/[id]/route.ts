import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { jwtDecoder } from '@/utils'

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const contactId = Number((await params).id)

  const auth = request.headers.get('Authorization') as string
  if (!auth) return new NextResponse('Unauthorized', { status: 401 })
  const token = jwtDecoder<{ id: number; email: string }>(auth as string)
  const userId = token?.id
  if (isNaN(contactId)) {
    return new NextResponse(JSON.stringify('Invalid contact ID'), {
      status: 400
    })
  }

  if (!userId) {
    return new NextResponse(JSON.stringify('Missing userId'), { status: 400 })
  }

  try {
    // Verifica se o contato existe e pertence ao usuário
    const existingContact = await prisma.contact.findUnique({
      where: { id: +contactId },
      include: { user: true }
    })

    if (!existingContact) {
      return new NextResponse(JSON.stringify('Contact not found'), {
        status: 404
      })
    }

    if (existingContact.userId !== +userId) {
      return new NextResponse(
        JSON.stringify('Unauthorized: contact does not belong to user'),
        { status: 403 }
      )
    }

    await prisma.contact.delete({ where: { id: +contactId } })

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
