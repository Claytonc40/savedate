import prisma from '@/app/libs/prismaDb';
import { authOptions } from '@/app/utils/authOptions'; // Import NextAuth options
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json('Unauthorized', { status: 401 });
  }

  const body = await request.json();

  let { productId, quantity, lotNumber } = body;
  lotNumber = lotNumber || 'N/A'; // Atribui 'N/A' se lotNumber for nulo/undefined

  if (!productId || !quantity || !lotNumber) {
    return NextResponse.json('Missing information', { status: 400 });
  }

  try {
    // Fetch product and tenant information along with its category
    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        category: true, // Inclui a categoria do produto para verificar a notificação
      },
    });

    if (!product) {
      console.log('Produto não encontrado');
      return NextResponse.json('Product not found', { status: 404 });
    }

    const tenantId = product.tenantId;

    // Sempre cria o log de impressão
    await prisma.printLog.create({
      data: {
        productId,
        tenantId,
        printedBy: session.user.id,
        quantity,
      },
    });

    // Verifica se a categoria permite criar alertas
    if (!product.category.notificationEnabled) {
      console.log('Notificação desativada para esta categoria, criando apenas o log de impressão.');
      return NextResponse.json(
        'Print log created successfully (no alert due to disabled notifications)',
        { status: 200 },
      );
    }

    // Se a notificação estiver habilitada, calcula a data de validade e cria o alerta
    let expirationDate = new Date();

    if (product.validity) {
      if (product.validityUnit === 'days') {
        expirationDate.setDate(expirationDate.getDate() + product.validity);
      } else if (product.validityUnit === 'hours') {
        expirationDate.setHours(expirationDate.getHours() + product.validity);
      } else {
        return NextResponse.json('Invalid validity unit', { status: 400 });
      }

      if (expirationDate) {
        await prisma.alert.create({
          data: {
            productId,
            tenantId,
            alertDate: expirationDate,
            status: 'pending',
            quantity,
            lotNumber,
          },
        });
      }
    }

    return NextResponse.json('Print log and alert created successfully', { status: 200 });
  } catch (error) {
    console.error('Error processing print request:', error);
    return NextResponse.json('Internal Server Error', { status: 500 });
  }
}
