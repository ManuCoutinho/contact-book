import { NextResponse } from "next/server"
import { prisma } from '@/lib/prisma'
import { jwtDecoder } from '@/utils'

export async function POST(request: Request) {
  const body = await request.json()
  const auth = request.headers.get('Authorization')

  if (request.method !== 'POST') {
    return new NextResponse('Method not allowed', { status: 405 })
  }
  if (!auth) return new NextResponse('Unauthorized', { status: 401 })
  const token = jwtDecoder<{ id: number; email: string }>(auth as string)
  const userId = token?.id
  if (!userId) return new NextResponse('Missing required body', { status: 400 })

  try {
    await prisma.contact.create({
      data: {
        cpf: body.cpf.replaceAll('.', '').replace('-', '').trim(),
        name: body.name,
        phone: body.phone.replace('(', '').replace('-', '').replace(')', '').trim(),
        user: {
          connect: { id: +userId }
        },
        address: {
          create: {
            street: body.street,
            number: body.number,
            city: body.city,
            state: body.state,
            country: body.country,
            cep: body.cep.replace('-', '').trim(),
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

    return new NextResponse(JSON.stringify(`Contact created`), { status: 201 })
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 })
  } finally {
    prisma.$disconnect()
  }
}

export async function GET(request: Request) {
  const auth = request.headers.get('Authorization')

  if (!auth) return new NextResponse('Unauthorized', { status: 401 })
  const token = jwtDecoder<{ id: number; email: string }>(auth as string)
  const userId = token?.id 

  if (!userId) return new NextResponse('Missing required body', { status: 400 })

  try {
    const contacts = await prisma.contact.findMany({
      where: {
        userId: +userId
      },
      orderBy: {
        name: 'asc'
      },
      select: {
        id: true,
        name: true,
        phone: true,
        cpf: true,
        address: {
          select: {
            id: true,
            street: true,
            number: true,
            city: true,
            state: true,
            country: true,
            cep: true,
            neighborhood: true,
            complement: true,
            location: true
          }
        },
        user: {
          select: {
            id: true,
            email: true
          }
        }
      }
    })
    prisma.$disconnect()
    return new NextResponse(JSON.stringify(contacts), { status: 200 })
  } catch (error) {
    return new NextResponse(JSON.stringify(error), { status: 500 })
  }
}


