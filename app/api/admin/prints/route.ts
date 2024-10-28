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
    const ultimasImpressoes = await prisma.printLog.findMany({
      where: { tenantId },
      orderBy: { timestamp: 'desc' },
      take: 10,
      select: {
        id: true,
        product: { select: { name: true } },
        quantity: true,
        timestamp: true,
      },
    });
    return NextResponse.json(
      ultimasImpressoes.map((impressao) => ({
        id: impressao.id,
        produto: impressao.product.name,
        quantidade: impressao.quantity,
        data: impressao.timestamp.toISOString(),
      })),
    );
  } catch (error) {
    console.error('Erro ao buscar impressões:', error);
    return NextResponse.json({ erro: 'Erro ao buscar impressões' }, { status: 500 });
  }
}
