import prisma from '@/app/libs/prismaDb'; // Import Prisma
import { authOptions } from '@/app/utils/authOptions'; // Import NextAuth options
import { getServerSession } from 'next-auth/next'; // Import session handler
import { NextResponse } from 'next/server';

// GET: Retrieve all active products
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Busca o tenant do usuário logado junto com os produtos ativos e a imagem
    const tenant = await prisma.tenant.findUnique({
      where: {
        id: session.user.tenantId,
      },
      include: {
        products: {
          where: {
            status: 'active', // Filtra apenas os produtos com status 'active'
          },
        },
      },
    });

    if (!tenant) {
      return NextResponse.json({ message: 'Tenant not found' }, { status: 404 });
    }

    // Calcular a data de vencimento e ambientação para cada produto ativo
    const productsWithExpiry = tenant.products.map((product) => {
      let expirationDate = new Date(); // Data e hora atuais do servidor
      let ambientDateTime = null; // Para a ambientação

      // Calcula a validade
      if (product.validity) {
        if (product.validityUnit === 'days') {
          expirationDate.setDate(expirationDate.getDate() + product.validity);
        } else if (product.validityUnit === 'hours') {
          expirationDate.setHours(expirationDate.getHours() + product.validity);
        }
      }

      // Calcula a ambientação (setting) se não for 0 ou null
      if (product.setting && product.setting !== 0) {
        ambientDateTime = new Date(); // Usa a hora atual como base
        if (product.settingUnit === 'days') {
          ambientDateTime.setDate(ambientDateTime.getDate() + product.setting);
        } else if (product.settingUnit === 'hours') {
          ambientDateTime.setHours(ambientDateTime.getHours() + product.setting);
        }
      }

      // Adiciona a hora do servidor à expiração
      const serverTime = new Date();
      expirationDate.setHours(
        serverTime.getHours(),
        serverTime.getMinutes(),
        serverTime.getSeconds(),
      );

      return {
        ...product,
        expirationDate, // Data de expiração
        ambientDateTime: ambientDateTime ? ambientDateTime.toISOString() : null, // Data de ambientação
        serverTime: serverTime.toLocaleTimeString(), // Hora do servidor
      };
    });

    return NextResponse.json({
      products: productsWithExpiry,
      tenantImage: tenant.image, // Inclui a imagem do tenant no retorno
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 });
  }
}
