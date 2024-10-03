import prisma from '@/app/libs/prismaDb';
import sendEmail from '@/app/utils/sendEmail';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('Recebendo solicitação para redefinição de senha.');

    const body = await request.json();
    const { email } = body;

    console.log('E-mail recebido:', email);

    if (!email) {
      console.log('E-mail não fornecido.');
      return new NextResponse('Falta informação', { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      console.log(`Usuário com e-mail ${email} não encontrado.`);
      return NextResponse.json(`Usuário com ${email} não existe`, { status: 401 });
    }

    console.log('Usuário encontrado:', user);

    if (user) {
      const token = crypto.randomBytes(32).toString('hex');
      const tokenExpiration = new Date(new Date().getTime() + 60 * 60000); // 60000 milliseconds in a minute

      console.log('Token gerado:', token);
      console.log('Expiração do token:', tokenExpiration);

      await prisma.user.update({
        where: {
          email,
        },
        data: {
          resetToken: token,
          resetTokenExpiry: tokenExpiration,
        },
      });

      console.log('Token de redefinição salvo no banco de dados para o usuário:', user.email);

      await prisma.userActivityLog.create({
        data: {
          userId: user.id,
          action: 'ENVIO_CONFIRM_EMAIL',
          metadata: {
            reason: 'E-mail confirmado com sucesso',
          },
        },
      });

      console.log('Log de atividade criado para o usuário:', user.email);

      // Envio do e-mail
      const resetLink = `${process.env.APP_URL}/reset-password?token=${token}`;
      const textContent = '';
      const htmlContent = `
        <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
          <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
            <h2 style="text-align: center; color: #1a73e8;">BurgerMetrics - Redefinição de Senha</h2>
            <p style="font-size: 16px; line-height: 1.6;">
              Olá, ${user.name}!,
            </p>
            <p style="font-size: 16px; line-height: 1.6;">
              Você solicitou uma redefinição de senha para sua conta no BurgerMetrics. Para redefinir sua senha, clique no botão abaixo:
            </p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${resetLink}" style="background-color: #1a73e8; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px;">
                Redefinir Senha
              </a>
            </div>
            <p style="font-size: 14px; color: #999; text-align: center;">
              Se você não solicitou essa alteração, pode ignorar este e-mail.
            </p>
            <p style="font-size: 14px; color: #999; text-align: center;">
              Este link expira em 1 hora.
            </p>
          </div>
        </div>
      `;

      console.log('Iniciando o envio do e-mail para:', email);
      await sendEmail(email, 'Redefinir Senha', textContent, htmlContent);
      console.log('E-mail enviado com sucesso para:', email);
    }

    return NextResponse.json(`Redefinir link enviado para ${email}`, { status: 200 });
  } catch (error) {
    console.log('Erro durante o processo de redefinição de senha:', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
