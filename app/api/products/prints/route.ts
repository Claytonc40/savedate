import prisma from '@/app/libs/prismaDb'; // Import Prisma
import { authOptions } from '@/app/utils/authOptions'; // Import NextAuth options
import { getServerSession } from 'next-auth/next'; // Import session handler
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Fetch tenant details, active products, and related categories
    const tenant = await prisma.tenant.findUnique({
      where: {
        id: session.user.tenantId, // Filter by the tenant ID from the session
      },
      include: {
        products: {
          where: {
            status: 'active', // Only fetch active products
          },
          include: {
            category: true, // Include related category details
          },
        },
      },
    });

    if (!tenant) {
      return NextResponse.json({ message: 'Tenant not found' }, { status: 404 });
    }

    // Map products with additional information like expiration and ambient dates
    const productsWithDetails = tenant.products.map((product) => {
      let expirationDate = new Date();
      let ambientDateTime = null;

      // Calculate expiration date based on validity
      if (product.validity) {
        if (product.validityUnit === 'days') {
          expirationDate.setDate(expirationDate.getDate() + product.validity);
        } else if (product.validityUnit === 'hours') {
          expirationDate.setHours(expirationDate.getHours() + product.validity);
        }
      }

      // Calculate ambient date based on setting
      if (product.setting && product.setting !== 0) {
        ambientDateTime = new Date();
        if (product.settingUnit === 'days') {
          ambientDateTime.setDate(ambientDateTime.getDate() + product.setting);
        } else if (product.settingUnit === 'hours') {
          ambientDateTime.setHours(ambientDateTime.getHours() + product.setting);
        }
      }

      return {
        ...product,
        expirationDate: expirationDate.toISOString(), // Return expiration date as ISO string
        ambientDateTime: ambientDateTime ? ambientDateTime.toISOString() : null,
      };
    });

    // Extract distinct categories from the products
    const categories = tenant.products.reduce((acc: any[], product) => {
      if (!acc.find((category) => category.id === product.categoryId)) {
        acc.push(product.category);
      }
      return acc;
    }, []);

    return NextResponse.json(
      {
        products: productsWithDetails,
        categories: categories,
        tenantImage: tenant.image, // Return the tenant's image
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ message: 'Failed to fetch products' }, { status: 500 });
  }
}
