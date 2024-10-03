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
    const deletedProduct = await prisma.product.deleteMany({
      where: {
        id: productId,
        tenantId: session.user.tenantId, // Ensure tenant security
      },
    });

    if (deletedProduct.count === 0) {
      return NextResponse.json({ message: 'Product not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Product deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ message: 'Failed to delete product' }, { status: 500 });
  }
}
