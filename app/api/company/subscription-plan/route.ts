import prisma from '@/app/libs/prismaDb';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  // Consulta para obter o plano de assinatura do tenant e detalhes do plano
  const subscription = await prisma.subscription.findUnique({
    where: { tenantId: session.user.tenantId },
    include: {
      plan: {
        select: {
          name: true,
          maxProducts: true,
          maxUsers: true,
        },
      },
    },
  });

  // Verifica se a assinatura foi encontrada
  if (!subscription) {
    return NextResponse.json({ error: 'Plano de assinatura não encontrado' }, { status: 404 });
  }

  // Consulta adicional para obter o campo autoRenew do Tenant
  const tenant = await prisma.tenant.findUnique({
    where: { id: session.user.tenantId },
    select: { autoRenew: true },
  });

  return NextResponse.json({
    plan: {
      name: subscription.plan.name,
      maxProducts: subscription.plan.maxProducts,
      maxUsers: subscription.plan.maxUsers,
    },
    endDate: subscription.endDate.toISOString(),
    autoRenew: tenant?.autoRenew ?? false, // Garante um valor booleano padrão caso `tenant` seja `null`
  });
}
