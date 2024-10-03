import prisma from '@/app/libs/prismaDb';
import { authOptions } from '@/app/utils/authOptions'; // Import NextAuth options
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

export async function PUT(request: Request) {
  const session = await getServerSession(authOptions);

  // Verifica se há sessão ativa
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { alertId, newStatus } = body;

    // Valida se alertId e newStatus estão presentes
    if (!alertId || !newStatus) {
      return NextResponse.json({ error: 'Alert ID and status are required' }, { status: 400 });
    }

    // Opcional: Verifica se o status é válido (pending, discarded, etc.)
    const validStatuses = ['pending', 'discarded', 'resolved']; // Adapte conforme necessário
    if (!validStatuses.includes(newStatus)) {
      return NextResponse.json({ error: 'Invalid status value' }, { status: 400 });
    }

    // Verifica se o alerta pertence ao mesmo tenant do usuário logado
    const alert = await prisma.alert.findUnique({
      where: { id: alertId },
      include: {
        tenant: true,
      },
    });

    if (!alert) {
      return NextResponse.json({ error: 'Alert not found' }, { status: 404 });
    }

    if (alert.tenantId !== session.user.tenantId) {
      return NextResponse.json({ error: 'Unauthorized to update this alert' }, { status: 403 });
    }

    // Atualiza o status do alerta no banco de dados
    const updatedAlert = await prisma.alert.update({
      where: { id: alertId },
      data: { status: newStatus },
    });

    return NextResponse.json(updatedAlert);
  } catch (error) {
    console.error('Error updating alert status:', error);
    return NextResponse.json({ error: 'Failed to update alert status' }, { status: 500 });
  }
}
// DELETE: Delete an alert by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const alertId = params.id;

  try {
    // Deleta o alerta com base no id e no tenantId do usuário
    const deletedAlert = await prisma.alert.deleteMany({
      where: {
        id: alertId,
        tenantId: session.user.tenantId, // Assegura a segurança baseada no tenant
      },
    });

    if (deletedAlert.count === 0) {
      return NextResponse.json({ message: 'Alert not found or unauthorized' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Alert deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting alert:', error);
    return NextResponse.json({ message: 'Failed to delete alert' }, { status: 500 });
  }
}
