import prisma from '@/app/libs/prismaDb';
import { authOptions } from '@/app/utils/authOptions';
import bcrypt from 'bcryptjs';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  // Obter a sessão do usuário logado
  const session = await getServerSession(authOptions);

  // Verificar se o usuário está autenticado
  if (!session || !session.user) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  try {
    // Obter o ID do usuário logado a partir da sessão
    const userId = session.user.id;

    // Parse do corpo da requisição para obter os dados enviados pelo frontend
    const body = await request.json();
    const { email, name, currentPassword, newPassword } = body;

    // Verificar se o usuário existe
    const existingUser = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!existingUser) {
      return NextResponse.json('Usuário não encontrado', { status: 404 });
    }

    // Se o e-mail foi alterado, verificar se já está em uso por outro usuário
    if (email && email !== existingUser.email) {
      const emailInUse = await prisma.user.findUnique({
        where: { email },
      });

      if (emailInUse) {
        return NextResponse.json('O e-mail já está em uso por outro usuário', { status: 400 });
      }
    }

    // Verificar a senha atual
    if (currentPassword && existingUser.hashedPassword) {
      const isPasswordValid = await bcrypt.compare(currentPassword, existingUser.hashedPassword);
      if (!isPasswordValid) {
        return NextResponse.json('Senha atual incorreta', { status: 400 });
      }
    }

    // Preparar os dados atualizados
    let updatedData: any = { name, email };
    if (newPassword) {
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      updatedData.hashedPassword = hashedPassword;
    }

    // Atualizar o usuário no banco de dados
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: updatedData,
    });

    return NextResponse.json({ updatedUser }, { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    return NextResponse.json('Erro interno', { status: 500 });
  }
}
