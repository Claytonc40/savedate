import { checkProductExpiry } from '@/app/libs/checkProductExpiry';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    await checkProductExpiry();
    return NextResponse.json({ message: 'Verificação de vencimento concluída' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao verificar produtos:', error);
    return NextResponse.json({ error: 'Erro interno do servidor' }, { status: 500 });
  }
}
