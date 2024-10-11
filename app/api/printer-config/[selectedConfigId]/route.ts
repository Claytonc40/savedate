import prisma from '@/app/libs/prismaDb';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

// Rota DELETE: Excluir uma configuração de impressora
export async function DELETE(
  request: Request,
  { params }: { params: { selectedConfigId: string } },
) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const tenantId = session.user.tenantId; // Obtém o tenantId da sessão
  const { selectedConfigId } = params; // Captura o ID da configuração a ser excluída

  if (!selectedConfigId) {
    return NextResponse.json({ error: 'ID da configuração não fornecido' }, { status: 400 });
  }

  try {
    // Verifica se a configuração pertence ao tenant atual
    const config = await prisma.printerConfig.findUnique({
      where: { id: selectedConfigId },
    });

    if (!config) {
      return NextResponse.json({ error: 'Configuração não encontrada' }, { status: 404 });
    }

    if (config.tenantId !== tenantId) {
      return NextResponse.json(
        { error: 'Você não tem permissão para excluir esta configuração' },
        { status: 403 },
      );
    }

    // Exclui a configuração
    await prisma.printerConfig.delete({
      where: { id: selectedConfigId },
    });

    return NextResponse.json({ message: 'Configuração excluída com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao excluir a configuração:', error);
    return NextResponse.json({ error: 'Erro ao excluir a configuração' }, { status: 500 });
  }
}
