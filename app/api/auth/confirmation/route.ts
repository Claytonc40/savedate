import prisma from '@/app/libs/prismaDb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { token } = await request.json();

  try {
    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          not: null,
        },
      },
    });

    if (!user || !user.resetTokenExpiry) {
      return NextResponse.json('Token inválido ou expirado', { status: 404 });
    }

    const now = new Date();
    if (now > user.resetTokenExpiry) {
      return NextResponse.json('O link de confirmação expirou', { status: 400 });
    }

    // Atualiza o usuário, confirmando o e-mail e invalidando o token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });
    //LOG de atividade
    await prisma.userActivityLog.create({
      data: {
        userId: user.id,
        action: 'CONFIRM_EMAIL',
        metadata: {
          reason: 'E-mail confirmado com sucesso',
        },
      },
    });
    return NextResponse.json({ message: 'E-mail confirmado com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao confirmar o e-mail', error);
    return NextResponse.json('Erro interno', { status: 500 });
  }
}
