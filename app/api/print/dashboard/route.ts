// app/api/print/dashboard/route.ts
import prisma from '@/app/libs/prismaDb';
import { authOptions } from '@/app/utils/authOptions'; // Import NextAuth options
import { addDays } from '@/app/utils/dateUtils'; // Função para calcular datas passadas
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function GET() {
  // Obter a sessão do usuário
  const session = await getServerSession(authOptions);

  // Verificar se há uma sessão ativa
  if (!session || !session.user || !session.user.tenantId) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  // Pegar o tenantId da sessão do usuário logado
  const tenantId = session.user.tenantId;

  try {
    const today = new Date();
    const oneWeekAgo = addDays(today, -7);
    const oneMonthAgo = addDays(today, -30);

    // Somar quantidade de etiquetas impressas na última semana, filtradas pelo tenantId
    const weekPrintedLabels = await prisma.printLog.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        tenantId: tenantId, // Filtrar pelo tenantId
        timestamp: {
          gte: oneWeekAgo, // Etiquetas impressas na última semana
        },
      },
    });

    // Somar quantidade de etiquetas impressas no último mês, filtradas pelo tenantId
    const monthPrintedLabels = await prisma.printLog.aggregate({
      _sum: {
        quantity: true,
      },
      where: {
        tenantId: tenantId, // Filtrar pelo tenantId
        timestamp: {
          gte: oneMonthAgo, // Etiquetas impressas no último mês
        },
      },
    });

    return NextResponse.json({
      week: weekPrintedLabels._sum.quantity || 0, // Verificar se o valor não é nulo
      month: monthPrintedLabels._sum.quantity || 0, // Verificar se o valor não é nulo
    });
  } catch (error) {
    console.error('Error fetching print logs:', error);
    return NextResponse.json({ error: 'Failed to fetch print logs' }, { status: 500 });
  }
}
