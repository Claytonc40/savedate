import prisma from '@/app/libs/prismaDb';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { productId, notifySectors, notificationTypes } = await request.json();

    if (!productId || !notifySectors || !notificationTypes) {
      return NextResponse.json(
        { error: 'Product ID, notifySectors, and notificationTypes are required' },
        { status: 400 },
      );
    }

    const notificationSettings = await prisma.product.update({
      where: {
        id: productId,
        tenantId: session.user.tenantId,
      },
      data: {
        notifiedSectors: {
          set: notifySectors.map((sectorId: string) => ({ id: sectorId })),
        },
        notificationTypes,
      },
    });

    return NextResponse.json(notificationSettings, { status: 200 });
  } catch (error) {
    console.error('Error configuring notifications:', error);
    return NextResponse.json({ error: 'Failed to configure notifications' }, { status: 500 });
  }
}
