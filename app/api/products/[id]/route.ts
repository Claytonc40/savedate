//app/api/products/[id]/route.ts

import prisma from '@/app/libs/prismaDb'; // Your Prisma DB instance
import { authOptions } from '@/app/utils/authOptions'; // Your NextAuth options
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

// GET: Retrieve a single product by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const productId = params.id;

  try {
    const product = await prisma.product.findFirst({
      where: {
        isDeleted: false, // Ensure the product is not deleted
        id: productId,
        tenantId: session.user.tenantId,
      },
    });

    if (!product) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ message: 'Failed to fetch product' }, { status: 500 });
  }
}

// PUT: Update a product by ID
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const productId = params.id;

  try {
    // Check if the product exists and belongs to the tenant
    const existingProduct = await prisma.product.findFirst({
      where: {
        id: productId,
        tenantId: session.user.tenantId,
      },
    });

    if (!existingProduct) {
      return NextResponse.json({ message: 'Product not found or unauthorized' }, { status: 404 });
    }

    const {
      name,
      batch,
      validity,
      validityUnit,
      setting, // Add setting field
      settingUnit, // Add settingUnit field
      status, // Add status field
      categoryId,
      notifySectors = [], // Default to an empty array if undefined
      notificationTypes,
    } = await request.json();

    // Safeguard: Ensure notifySectors is an array
    const sectorIds = Array.isArray(notifySectors) ? notifySectors : [];

    // Update the product
    const updatedProduct = await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        name,
        batch,
        validity,
        validityUnit,
        setting, // Ensure setting is updated
        settingUnit, // Ensure settingUnit is updated
        status, // Ensure status is updated
        categoryId,
        notifiedSectors: {
          set: sectorIds.map((sectorId: string) => ({ id: sectorId })),
        },
        notificationTypes,
      },
    });

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 });
  }
}

// DELETE: Delete a product by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const productId = params.id;

  try {
    // Atualizar o campo `isDeleted` para true em vez de deletar o produto
    const updatedProduct = await prisma.product.updateMany({
      where: {
        id: productId,
        tenantId: session.user.tenantId, // Garantir segurança por tenant
        isDeleted: false, // Só atualiza se o produto não tiver sido deletado ainda
      },
      data: {
        isDeleted: true, // Marcamos o produto como deletado
      },
    });

    if (updatedProduct.count === 0) {
      return NextResponse.json(
        { message: 'Produto não encontrado ou não autorizado' },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: 'Produto deletado com sucesso (Soft Delete)' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Erro ao deletar o produto:', error);
    return NextResponse.json({ message: 'Erro ao deletar o produto' }, { status: 500 });
  }
}
