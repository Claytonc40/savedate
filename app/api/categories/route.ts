import prisma from '@/app/libs/prismaDb';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Busca todas as categorias do usuário logado
    const categories = await prisma.category.findMany({
      where: {
        tenantId: session.user.tenantId, // Garantir que as categorias pertencem ao tenant do usuário logado
      },
      select: {
        id: true,
        name: true,
        notificationEnabled: true,
      },
    });

    return NextResponse.json({ categories }, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ message: 'Failed to fetch categories' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name, notificationEnabled } = await request.json();

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { message: 'Nome da categoria é obrigatório e deve ser uma string' },
        { status: 400 },
      );
    }

    const newCategory = await prisma.category.create({
      data: {
        name,
        notificationEnabled: notificationEnabled || false,
        tenantId: session.user.tenantId,
      },
    });

    return NextResponse.json(newCategory, { status: 201 });
  } catch (error) {
    console.error('Erro ao adicionar categoria:', error);
    return NextResponse.json({ message: 'Erro ao adicionar categoria' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id, name, notificationEnabled } = await request.json();

    if (!id || typeof id !== 'string') {
      return NextResponse.json(
        { message: 'ID da categoria é obrigatório e deve ser uma string' },
        { status: 400 },
      );
    }

    if (!name || typeof name !== 'string') {
      return NextResponse.json(
        { message: 'Nome da categoria é obrigatório e deve ser uma string' },
        { status: 400 },
      );
    }

    const updatedCategory = await prisma.category.update({
      where: {
        id,
        tenantId: session.user.tenantId,
      },
      data: {
        name,
        notificationEnabled: notificationEnabled || false,
      },
    });

    return NextResponse.json(updatedCategory);
  } catch (error) {
    console.error('Erro ao atualizar categoria:', error);
    return NextResponse.json({ message: 'Erro ao atualizar categoria' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get('id');

  if (!categoryId || typeof categoryId !== 'string') {
    return NextResponse.json(
      { message: 'ID da categoria é obrigatório e deve ser uma string' },
      { status: 400 },
    );
  }

  try {
    const deletedCategory = await prisma.category.deleteMany({
      where: {
        id: categoryId,
        tenantId: session.user.tenantId,
      },
    });

    if (deletedCategory.count === 0) {
      return NextResponse.json(
        { message: 'Categoria não encontrada ou não autorizada' },
        { status: 404 },
      );
    }

    return NextResponse.json({ message: 'Categoria deletada com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar categoria:', error);
    return NextResponse.json({ message: 'Erro ao deletar categoria' }, { status: 500 });
  }
}
