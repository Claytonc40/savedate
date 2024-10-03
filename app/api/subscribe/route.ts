// app/api/subscribe/route.ts
import prisma from '@/app/libs/prismaDb';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const userId = session.user.id; // Obtém o ID do usuário autenticado

  try {
    const subscription = await request.json();

    // Validação básica da estrutura da assinatura
    if (!subscription.endpoint || !subscription.keys || typeof subscription.keys !== 'object') {
      return NextResponse.json({ error: 'Assinatura inválida' }, { status: 400 });
    }

    const { p256dh, auth } = subscription.keys;

    if (typeof p256dh !== 'string' || typeof auth !== 'string') {
      return NextResponse.json({ error: 'Chaves inválidas na assinatura' }, { status: 400 });
    }

    // Verifica se a assinatura já existe
    const existingSubscription = await prisma.pushSubscription.findFirst({
      where: {
        userId: userId,
        endpoint: subscription.endpoint,
      },
    });

    if (existingSubscription) {
      return NextResponse.json({ success: true, message: 'Assinatura já existe.' });
    }

    // Salva a nova assinatura no banco de dados
    await prisma.pushSubscription.create({
      data: {
        userId: userId,
        endpoint: subscription.endpoint,
        keys: {
          p256dh: subscription.keys.p256dh,
          auth: subscription.keys.auth,
        },
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erro ao salvar a inscrição:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar a inscrição.', details: (error as Error).message },
      { status: 500 },
    );
  }
}
