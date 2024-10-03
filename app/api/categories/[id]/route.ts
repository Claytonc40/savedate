import prisma from '@/app/libs/prismaDb'; // Import your Prisma instance
import { authOptions } from '@/app/utils/authOptions'; // Import NextAuth options
import { getServerSession } from 'next-auth/next';
import { NextResponse } from 'next/server';

// DELETE: Delete a category by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const categoryId = params.id;

  try {
    // Check if the category exists and belongs to the tenant (if multi-tenancy is in place)
    const existingCategory = await prisma.category.findFirst({
      where: {
        id: categoryId,
        // Optionally, include tenantId if you're handling multi-tenancy
        // tenantId: session.user.tenantId
      },
    });

    if (!existingCategory) {
      return NextResponse.json({ message: 'Category not found' }, { status: 404 });
    }

    // Delete the category
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });

    return NextResponse.json({ message: 'Category deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error deleting category:', error);
    return NextResponse.json({ message: 'Failed to delete category' }, { status: 500 });
  }
}
