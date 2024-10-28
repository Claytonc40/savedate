import prisma from '@/app/libs/prismaDb';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const tenantId = session.user.tenantId;

  try {
    const categorias = await prisma.category.findMany({
      where: { tenantId },
      select: { id: true, name: true },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(categorias);
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return NextResponse.json({ erro: 'Erro ao buscar categorias' }, { status: 500 });
  }
}
