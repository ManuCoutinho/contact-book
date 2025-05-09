import { NextResponse } from "next/server"
import { prisma } from '@/lib/prisma'

export async function POST(request: Request) {
  const body = await request.json()

  if (request.method !== 'POST') {
    return new NextResponse('Method not allowed', { status: 405 })
  }

  if (!body) return new NextResponse('Missing required body', { status: 400 })

  try {
    await prisma.contact.create({
      data: {
        cpf: body.cpf,
        name: body.name,
        phone: body.phone,
        user: {
          connect: { id: body.userId }
        },
        address: {
          create: {
            street: body.street,
            number: body.number,
            city: body.city,
            state: body.state,
            country: body.country,
            cep: body.cep,
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
    prisma.$disconnect()
    return new NextResponse(JSON.stringify(`Contact created`), { status: 201 })
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 })
  }
}

export async function GET(request: Request) {

  const userId = await request.headers.get('userId')

  if (!userId) return new NextResponse('Missing required userId', { status: 400 })

  try {
    const contacts = await prisma.contact.findMany({
      where: {
        userId: +userId
      },
      include: {
        address: true,
        user: true
      }
    })
    prisma.$disconnect()
    return new NextResponse(JSON.stringify(contacts), { status: 200 })
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 })
  }
}


