//app/api/products/route.ts

import prisma from '@/app/libs/prismaDb'; // Import Prisma
import { authOptions } from '@/app/utils/authOptions'; // Import NextAuth options
import { getServerSession } from 'next-auth/next'; // Import session handler
import { NextResponse } from 'next/server';

// GET: Retrieve all products
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  // Verifica se o usuário está logado
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Busca os produtos com base no tenantId e filtra os que não estão deletados
    const products = await prisma.product.findMany({
      where: {
        tenantId: session.user.tenantId, // Garantir que os produtos pertencem ao tenant do usuário logado
        isDeleted: false, // Considera apenas produtos que não foram deletados (Soft Delete)
      },
      include: {
        category: true, // Inclui a categoria relacionada ao produto
      },
    });

    return NextResponse.json(products, { status: 200 });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ message: 'Failed to fetch products' }, { status: 500 });
  }
}

// POST: Create a new product
export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const {
      name,
      batch,
      validity,
      validityUnit,
      setting, // Adding setting
      settingUnit, // Adding setting unit
      status, // Adding status
      categoryId,
      notifySectors = [], // Ensure notifySectors is an array or default to an empty array
      notificationTypes = [], // Default to an empty array if notificationTypes is not provided
    } = await request.json();

    if (!name || !categoryId) {
      return NextResponse.json(
        { error: 'Product name and category are required' },
        { status: 400 },
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        name,
        batch,
        validity,
        validityUnit,
        setting, // Ensure setting is saved
        settingUnit, // Ensure setting unit is saved
        status, // Ensure status is saved
        tenantId: session.user.tenantId,
        categoryId,
        notifiedSectors: {
          connect: notifySectors.map((sectorId: string) => ({ id: sectorId })),
        },
        notificationTypes,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 });
  }
}
