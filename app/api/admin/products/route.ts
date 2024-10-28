import prisma from '@/app/libs/prismaDb';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const busca = searchParams.get('busca') || '';

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const tenantId = session.user.tenantId;

  try {
    const produtos = await prisma.product.findMany({
      where: {
        tenantId,
        name: { contains: busca, mode: 'insensitive' },
      },
      select: {
        id: true,
        name: true,
        category: { select: { name: true } },
        validity: true,
      },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(produtos);
  } catch (error) {
    console.error('Erro ao buscar produtos:', error);
    return NextResponse.json({ erro: 'Erro ao buscar produtos' }, { status: 500 });
  }
}
