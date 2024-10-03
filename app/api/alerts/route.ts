import prisma from '@/app/libs/prismaDb';
import { authOptions } from '@/app/utils/authOptions'; // Import NextAuth options
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

  try {
    // Buscar alertas com status pendente e filtrar por tenantId
    const alerts = await prisma.alert.findMany({
      where: {
        status: 'pending', // Apenas status 'pending'
        tenantId: tenantId, // Filtrar pelo tenantId do usuário
      },
      include: {
        product: true, // Inclui as informações do produto
      },
      orderBy: {
        alertDate: 'asc', // Ordena pela data de expiração em ordem crescente
      },
    });

    // Formatar alertas para o frontend
    const formattedAlerts = alerts.map((alert) => ({
      id: alert.id,
      productName: alert.product.name,
      lot: alert.lotNumber,
      quantity: alert.quantity, // Adiciona a quantidade
      expiryDate: alert.alertDate, // Formata a data
      daysUntilExpiry: Math.ceil(
        (alert.alertDate.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
      ),
      status: alert.status,
    }));

    // Retornar a resposta com os alertas formatados
    return NextResponse.json({
      alerts: formattedAlerts,
      total: alerts.length,
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: 500 });
  }
}
