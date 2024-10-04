//app/api/auth/register/route.ts

import prisma from '@/app/libs/prismaDb';
import sendEmail from '@/app/utils/sendEmail';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    console.log('Iniciando o processo de registro para:', email);

    if (!email || !name || !password) {
      console.log('Falta de informações no registro:', { email, name, password });
      return NextResponse.json('Falta informação', { status: 400 });
    }

    // Verifica se o usuário já existe
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log('Usuário já existe com este e-mail:', email);
      return NextResponse.json('O usuário já existe com este e-mail', { status: 400 });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(password, 12);
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpiration = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // Expira em 24 horas

    // Cria o Tenant para o novo usuário (admin)
    const tenant = await prisma.tenant.create({
      data: {
        name: `${name}'s Company`,
      },
    });

    // Cria o usuário no banco de dados como Admin e associa ao Tenant
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
        resetToken: token,
        resetTokenExpiry: tokenExpiration,
        role: 'admin', // Define o usuário como Admin
        tenant: {
          connect: {
            id: tenant.id, // Conecta o usuário ao tenant recém-criado
          },
        },
      },
    });

    console.log('Usuário Admin criado com o Tenant:', tenant.name);

    // Cria o link de confirmação
    const link = `${process.env.APP_URL}/confirm-email?token=${token}`;

    // Estiliza o corpo do e-mail com HTML
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2 style="text-align: center; color: #1a73e8;">Bem-vindo ao Save Date, ${name}!</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Estamos felizes por você se juntar ao Save Date. Para completar o seu cadastro, clique no link abaixo para confirmar seu e-mail:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${link}" style="background-color: #1a73e8; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px;">
              Confirmar e-mail
            </a>
          </div>
          <p style="font-size: 14px; color: #999; text-align: center;">
            Se você não solicitou esse e-mail, pode ignorá-lo.
          </p>
          <p style="font-size: 14px; color: #999; text-align: center;">
            Este link expira em 24 horas.
          </p>
        </div>
      </div>
    `;

    // Envia o e-mail de confirmação
    await sendEmail(email, 'Confirmação de e-mail', '', htmlContent);

    return NextResponse.json(
      `O link de confirmação foi enviado para ${email}. Por favor, verifique seu e-mail!`,
      { status: 200 },
    );
  } catch (error) {
    console.log('Erro durante o processo de registro:', error);
    return NextResponse.json('Internal Error', { status: 500 });
  }
}
