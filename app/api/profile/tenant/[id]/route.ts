import prisma from '@/app/libs/prismaDb';
import { authOptions } from '@/app/utils/authOptions';
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

// GET: Busca o Tenant do usuário logado
export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    // Buscar o tenant associado ao usuário logado
    const tenant = await prisma.tenant.findUnique({
      where: {
        id: session.user.tenantId, // Assume que o tenantId está no user
      },
    });

    if (!tenant) {
      return NextResponse.json({ message: 'Tenant not found' }, { status: 404 });
    }

    return NextResponse.json({ tenant }, { status: 200 });
  } catch (error) {
    console.error('Error fetching tenant:', error);
    return NextResponse.json({ message: 'Failed to fetch tenant' }, { status: 500 });
  }
}

// PUT: Atualiza o nome do Tenant
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);
  const body = await req.json();

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const tenantId = params.id;
  const { name } = body;

  if (!name) {
    return NextResponse.json({ message: 'Tenant name is required' }, { status: 400 });
  }

  try {
    // Atualiza o nome do tenant
    const updatedTenant = await prisma.tenant.update({
      where: {
        id: tenantId,
      },
      data: {
        name: name,
      },
    });

    return NextResponse.json({ tenant: updatedTenant }, { status: 200 });
  } catch (error) {
    console.error('Error updating tenant:', error);
    return NextResponse.json({ message: 'Failed to update tenant' }, { status: 500 });
  }
}
