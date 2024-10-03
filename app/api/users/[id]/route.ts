// app/api/users/[id]/route.ts

import prisma from '@/app/libs/prismaDb';
import { getAuthenticatedUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

// Fetch, Update or Delete user by id in the same tenant

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const authUser = await getAuthenticatedUser();

    if (!authUser) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user || user.tenantId !== authUser.tenantId) {
      return NextResponse.json(
        { message: 'User not found or not in the same tenant' },
        { status: 404 },
      );
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching user', error }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const { name, email, role, status } = await request.json();

  try {
    const authUser = await getAuthenticatedUser();

    // Only admins can update users
    if (authUser.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user || user.tenantId !== authUser.tenantId) {
      return NextResponse.json(
        { message: 'User not found or not in the same tenant' },
        { status: 404 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: { name, email, role, status },
    });

    return NextResponse.json(updatedUser, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating user', error }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  try {
    const authUser = await getAuthenticatedUser();

    // Only admins can delete users
    if (authUser.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user || user.tenantId !== authUser.tenantId) {
      return NextResponse.json(
        { message: 'User not found or not in the same tenant' },
        { status: 404 },
      );
    }

    await prisma.user.delete({ where: { id } });

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error deleting user', error }, { status: 500 });
  }
}
