// app/api/company/payment-history/route.ts
import prisma from '@/app/libs/prismaDb';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Não autorizado' }, { status: 401 });
  }

  const paymentHistory = await prisma.paymentHistory.findMany({
    where: { tenantId: session.user.tenantId },
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      createdAt: true,
      amount: true,
      currency: true,
      status: true,
    },
  });

  const formattedHistory = paymentHistory.map((payment) => ({
    id: payment.id,
    date: payment.createdAt.toISOString(),
    amount: payment.amount,
    currency: payment.currency,
    status: payment.status,
  }));

  return NextResponse.json(formattedHistory);
}
