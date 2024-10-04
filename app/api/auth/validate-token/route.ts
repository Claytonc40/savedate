//app/api/auth/validate-token/route.ts

import prisma from '@/app/libs/prismaDb';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ message: 'Token não fornecido' }, { status: 400 });
  }

  try {
    // Busca o usuário com o token fornecido e verifica se o token ainda é válido
    const user = await prisma.user.findFirst({
      where: {
        invitationToken: token,
        invitationTokenExpiry: {
          gte: new Date(), // Token ainda é válido se a data de expiração não foi atingida
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'Token inválido ou expirado' }, { status: 400 });
    }

    // Token é válido
    return NextResponse.json({ message: 'Token válido' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao validar token:', error);
    return NextResponse.json({ message: 'Erro ao validar token' }, { status: 500 });
  }
}
