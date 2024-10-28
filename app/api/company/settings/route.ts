// app/api/company/settings/route.ts
import prisma from '@/app/libs/prismaDb';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const tenant = await prisma.tenant.findUnique({
    where: { id: session.user.tenantId },
    select: {
      name: true,
      emailDefault: true,
      phoneDefault: true,
      street: true,
      number: true,
      complement: true,
      neighborhood: true,
      city: true,
      state: true,
      zipCode: true,
      autoRenew: true,
      licenseExpirationDate: true,
    },
  });

  if (!tenant) {
    return NextResponse.json({ error: 'Empresa não encontrada' }, { status: 404 });
  }

  return NextResponse.json(tenant);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  try {
    const {
      companyName,
      emailDefault,
      phoneDefault,
      street,
      number,
      complement,
      neighborhood,
      city,
      state,
      zipCode,
      autoRenew,
    } = await request.json();

    const updatedTenant = await prisma.tenant.update({
      where: { id: session.user.tenantId },
      data: {
        name: companyName,
        emailDefault,
        phoneDefault,
        street,
        number,
        complement,
        neighborhood,
        city,
        state,
        zipCode,
        autoRenew,
      },
    });

    return NextResponse.json(updatedTenant, { status: 200 });
  } catch (error) {
    console.error('Erro ao salvar configurações:', error);
    return NextResponse.json({ error: 'Falha ao salvar configurações' }, { status: 500 });
  }
}
