// app/api/unsubscribe/route.ts
import prisma from '@/app/libs/prismaDb'; // Importe o prisma corretamente
import { authOptions } from '@/app/utils/authOptions'; // Certifique-se de que authOptions está correto
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Não autenticado' }, { status: 401 });
  }

  const userId = session.user.id;

  try {
    // Parse o corpo da requisição
    const { endpoint } = await request.json();

    // Remover a inscrição do banco de dados pelo userId e endpoint
    const result = await prisma.pushSubscription.deleteMany({
      where: {
        userId: userId,
        endpoint: endpoint,
      },
    });

    if (result.count === 0) {
      return NextResponse.json({ error: 'Nenhuma inscrição encontrada.' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erro ao remover a inscrição.' }, { status: 500 });
  }
}
