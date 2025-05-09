import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

type Params = {
  params: {
    id: string
  }
}

export async function PUT(request: Request, { params }: Params) {
  const body = await request.json()
  const contactId = Number((await params).id)

  if (isNaN(contactId)) {
    return new NextResponse('Invalid contact ID', { status: 400 })
  }

  if (!body || !body.userId) {
    return new NextResponse('Missing body or userId', { status: 400 })
  }

  try {
    // Verifica se o contato existe e pertence ao usuário
    const existingContact = await prisma.contact.findUnique({
      where: { id: contactId },
      include: { user: true }
    })

    if (!existingContact) {
      return new NextResponse(JSON.stringify('Contact not found'), { status: 404 })
    }
    //aqui a validação correta seria viajwt
    if (existingContact.userId !== +body.userId) {
      return new NextResponse(JSON.stringify('Unauthorized: contact does not belong to user'), { status: 403 })
    }

    const updatedContact = await prisma.contact.update({
      where: { id: contactId },
      data: {
        cpf: body.cpf?.replaceAll('.', '').replace('-', '').trim(),
        name: body.name,
        phone: body.phone?.replace('(', '').replace('-', '').replace(')', '').trim(),
        address: {
          update: {
            street: body.street,
            number: body.number,
            city: body.city,
            state: body.state,
            country: body.country,
            cep: body.cep?.replace('-', '').trim(),
            neighborhood: body.neighborhood,
            complement: body.complement ?? null,
            location: body.location
          }
        }
      },
      include: {
        address: true,
        user: true
      }
    })

    return new NextResponse(JSON.stringify(updatedContact), { status: 200 })
  } catch (error) {
    console.error(error)
    return new NextResponse(JSON.stringify({ error: 'Internal server error', details: error }), { status: 500 })
  } finally {
    prisma.$disconnect()
  }
}

export async function DELETE(request: Request, { params }: Params) {
  const contactId = Number((await params).id)
  const userId = request.headers.get('userId') as string
  console.log('**', userId)


  if (isNaN(contactId)) {
    console.log('****')
    return new NextResponse(JSON.stringify('Invalid contact ID'), { status: 400 })
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
      return new NextResponse(JSON.stringify('Contact not found'), { status: 404 })
    }
    if (existingContact.userId !== +userId) {
      return new NextResponse(JSON.stringify('Unauthorized: contact does not belong to user'), { status: 403 })
    }

    await prisma.contact.delete({ where: { id: +contactId } })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error(error)
    return new NextResponse(JSON.stringify({ error: 'Internal server error', details: error }), { status: 500 })
  } finally {
    prisma.$disconnect()
  }
}
