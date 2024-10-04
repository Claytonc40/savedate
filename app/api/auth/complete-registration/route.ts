//app/api/auth/complete-registration/route.ts

import prisma from '@/app/libs/prismaDb';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { token, password } = await request.json();

    // Verifica se o token foi fornecido
    if (!token || !password) {
      return NextResponse.json({ message: 'Missing token or password' }, { status: 400 });
    }

    // Busca o usuário com o token de convite fornecido
    const user = await prisma.user.findFirst({
      where: {
        invitationToken: token,
        invitationTokenExpiry: {
          gte: new Date(), // Verifica se o token ainda está válido
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 400 });
    }

    // Criptografa a nova senha
    const hashedPassword = await bcrypt.hash(password, 12);

    // Atualiza o usuário com a nova senha, confirma o email e remove o token
    await prisma.user.update({
      where: { id: user.id },
      data: {
        hashedPassword,
        invitationToken: null, // Remove o token após o uso
        invitationTokenExpiry: null,
        emailVerified: true, // Marca o email como confirmado
      },
    });

    return NextResponse.json(
      { message: 'Registration completed and email confirmed successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error completing registration:', error);
    return NextResponse.json({ message: 'Failed to complete registration' }, { status: 500 });
  }
}
