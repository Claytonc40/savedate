import prisma from '@/app/libs/prismaDb';
import { authOptions } from '@/app/utils/authOptions'; // Import NextAuth options
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function GET() {
  // Obtém a sessão atual
  const session = await getServerSession(authOptions);

  // Verifica se há uma sessão ativa
  if (!session || !session.user || !session.user.tenantId) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  // Pega o tenantId da sessão do usuário logado
  const tenantId = session.user.tenantId;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Zera as horas para comparar apenas a data

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Data de amanhã para definir o intervalo de hoje

    // Buscar alertas de produtos NA validade (ou seja, `alertDate` >= hoje)
    const validProducts = await prisma.alert.findMany({
      where: {
        status: 'pending', // Status 'pending' (não descartados)
        tenantId: tenantId, // Filtrar pelo tenantId do usuário logado
        alertDate: {
          gte: today, // Produtos cuja validade ainda está ativa (alertDate >= hoje)
        },
      },
      include: {
        product: true, // Incluir as informações do produto
      },
      orderBy: {
        alertDate: 'asc', // Ordenar pela data de alerta
      },
    });

    // Produtos vencidos já implementados, apenas mantendo para referência
    const expiredProducts = await prisma.alert.findMany({
      where: {
        status: 'pending', // Status 'pending' (não descartados)
        tenantId: tenantId, // Filtrar pelo tenantId do usuário logado
        alertDate: {
          lt: today, // Produtos cuja validade expirou (alertDate < hoje)
        },
      },
      include: {
        product: true, // Incluir as informações do produto
      },
      orderBy: {
        alertDate: 'asc', // Ordenar pela data de alerta
      },
    });

    // Buscar alertas de produtos que estão vencendo hoje
    const expiringToday = await prisma.alert.findMany({
      where: {
        status: 'pending', // Status 'pending' (não descartados)
        tenantId: tenantId, // Filtrar pelo tenantId do usuário logado
        alertDate: {
          gte: today, // Produtos cuja validade expira hoje ou mais
          lt: tomorrow, // Limite até amanhã (para garantir que pegamos só o dia de hoje)
        },
      },
      include: {
        product: true, // Incluir informações do produto
      },
      orderBy: {
        alertDate: 'asc', // Ordenar pela data de alerta
      },
    });

    const formattedProducts = expiringToday.map((alert) => ({
      productName: alert.product.name,
      quantity: alert.quantity, // Ajuste conforme o campo exato de quantidade no modelo
      alertDate: alert.alertDate, // Formatar a data
    }));

    // Retornar os produtos encontrados
    return NextResponse.json({ validProducts, expiredProducts, expiringToday: formattedProducts });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json({ error: 'Failed to fetch alerts' }, { status: 500 });
  }
}
