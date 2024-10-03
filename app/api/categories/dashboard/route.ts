// app/api/categories/dashboard/route.ts
import prisma from '@/app/libs/prismaDb';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function GET() {
  // Obter a sessão do usuário
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.tenantId) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const tenantId = session.user.tenantId;

  try {
    // Buscar produtos agrupados por categoria
    const productsByCategory = await prisma.product.groupBy({
      by: ['categoryId'],
      _count: {
        id: true, // Contar o número de produtos em cada categoria
      },
      where: {
        tenantId: tenantId, // Filtrar pelo tenantId do usuário logado
      },
    });

    // Buscar os nomes das categorias com base nos `categoryId`
    const categoryIds = productsByCategory.map((group) => group.categoryId);
    const categories = await prisma.category.findMany({
      where: {
        id: { in: categoryIds },
      },
      select: {
        id: true,
        name: true,
      },
    });

    // Mapear os nomes das categorias para os resultados do `groupBy`
    const formattedData = productsByCategory.map((group) => {
      const category = categories.find((cat) => cat.id === group.categoryId);
      return {
        name: category ? category.name : 'Unknown',
        value: group._count.id,
      };
    });

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    return NextResponse.json({ error: 'Failed to fetch products by category' }, { status: 500 });
  }
}
