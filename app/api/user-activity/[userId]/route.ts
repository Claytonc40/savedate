import prisma from '@/app/libs/prismaDb';
import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    const logs = await prisma.userActivityLog.findMany({
      where: { userId },
      orderBy: { timestamp: 'desc' },
    });

    if (!logs || logs.length === 0) {
      return NextResponse.json({ error: 'No logs found' }, { status: 404 });
    }

    return NextResponse.json(logs);
  } catch (error) {
    console.error('Error fetching user activity logs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
