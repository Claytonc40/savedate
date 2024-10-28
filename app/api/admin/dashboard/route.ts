import prisma from '@/app/libs/prismaDb';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  // Obtém a sessão para capturar o tenantId do usuário logado
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tenantId = session.user.tenantId; // Obtém o tenantId da sessão
  const dateRange = searchParams.get('intervalo') || 'semana';
  const searchTerm = searchParams.get('busca') || '';

  // Define o intervalo de datas com base no parâmetro 'intervalo'
  let startDate: Date;
  const endDate = new Date();
  switch (dateRange) {
    case 'mes':
      startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      break;
    case 'ano':
      startDate = new Date();
      startDate.setFullYear(startDate.getFullYear() - 1);
      break;
    default:
      startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
  }

  try {
    // Dados agregados do dashboard
    const [
      totalEtiquetasGeradas,
      totalProdutosMonitorados,
      produtosExpirando,
      statusExpiracao,
      etiquetasPorCategoria,
      impressoesRecentes,
    ] = await Promise.all([
      prisma.printLog.count({
        where: { tenantId },
      }),

      prisma.product.count({
        where: { tenantId },
      }),

      prisma.alert.count({
        where: {
          tenantId,
          alertDate: { gte: startDate, lte: endDate },
          status: 'pending',
        },
      }),

      prisma.alert
        .groupBy({
          by: ['status'],
          _count: { _all: true },
          where: {
            tenantId,
            alertDate: { gte: startDate, lte: endDate },
          },
        })
        .then((groupedData) =>
          groupedData.map((group) => ({
            nome: group.status,
            valor: group._count._all,
          })),
        ),

      prisma.product
        .groupBy({
          by: ['categoryId'],
          _count: { _all: true },
          where: { tenantId },
        })
        .then((groupedData) =>
          groupedData.map(async (group) => {
            const category = await prisma.category.findUnique({ where: { id: group.categoryId } });
            return { nome: category?.name || 'Sem categoria', valor: group._count._all };
          }),
        )
        .then((data) => Promise.all(data)),

      prisma.printLog
        .findMany({
          where: { tenantId },
          orderBy: { timestamp: 'desc' },
          take: 5,
          select: {
            id: true,
            product: { select: { name: true } },
            quantity: true,
            timestamp: true,
          },
        })
        .then((prints) =>
          prints.map((print) => ({
            id: print.id,
            produto: print.product.name,
            quantidade: print.quantity,
            data: print.timestamp.toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
            }),
          })),
        ),
    ]);

    // Monta os dados finais do dashboard
    const dashboardData = {
      totalEtiquetasGeradas,
      totalProdutosMonitorados,
      produtosExpirando,
      statusExpiracao,
      etiquetasPorCategoria,
      impressoesRecentes,
    };

    return NextResponse.json(dashboardData, { status: 200 });
  } catch (error) {
    console.error('Erro ao obter dados do painel:', error);
    return NextResponse.json({ error: 'Erro ao buscar dados do painel' }, { status: 500 });
  }
}
