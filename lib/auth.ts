// app/lib/auth.ts

import prisma from '@/app/libs/prismaDb';
import { getServerSession } from 'next-auth'; // assuming NextAuth.js is used for authentication

export async function getAuthenticatedUser() {
  const session = await getServerSession();

  if (!session || !session.user) {
    throw new Error('Unauthorized');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: { tenant: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}
