import crypto from 'crypto'; // For generating token
// app/api/users/route.ts
import prisma from '@/app/libs/prismaDb';
import sendEmail from '@/app/utils/sendEmail'; // Import email sending utility
import { getAuthenticatedUser } from '@/lib/auth';
import { NextResponse } from 'next/server';

// Get all users in the current tenant (GET) or create a new user in the current tenant (POST)
export async function GET() {
  try {
    const authUser = await getAuthenticatedUser();

    if (!authUser) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const users = await prisma.user.findMany({
      where: { tenantId: authUser.tenantId },
    });

    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching users', error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // Obtenha o usuário autenticado (administrador)
    const adminUser = await getAuthenticatedUser();

    // Verifique se o usuário autenticado é um administrador
    if (adminUser.role !== 'admin') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 403 });
    }

    // Obtenha os dados enviados na requisição
    const { name, email, role, status } = await request.json();

    // Verifique se os campos obrigatórios foram fornecidos
    if (!name || !email || !role || !status) {
      return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    // Verifique se já existe um usuário com o mesmo e-mail
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'User with this email already exists' }, { status: 400 });
    }

    // Gerar token de convite e data de expiração
    const token = crypto.randomBytes(32).toString('hex');
    const tokenExpiration = new Date(new Date().getTime() + 24 * 60 * 60 * 1000); // Expira em 24 horas

    // Crie o novo usuário, associando ao mesmo tenantId do administrador
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        role,
        status,
        tenantId: adminUser.tenantId, // O usuário herda o tenantId do administrador
        invitationToken: token, // Salva o token gerado no usuário
        invitationTokenExpiry: tokenExpiration, // Salva a data de expiração do token
        emailVerified: false, // Email ainda não confirmado
      },
    });

    // Cria o link de convite para completar o registro e confirmar o email
    const inviteLink = `${process.env.APP_URL}/complete-registration?token=${token}`;

    // Estiliza o corpo do e-mail com HTML
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
        <div style="max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
          <h2 style="text-align: center; color: #1a73e8;">Você foi convidado a se juntar ao Save Date, ${name}!</h2>
          <p style="font-size: 16px; line-height: 1.6;">
            Para completar o seu cadastro e confirmar seu e-mail, clique no link abaixo:
          </p>
          <div style="text-align: center; margin: 20px 0;">
            <a href="${inviteLink}" style="background-color: #1a73e8; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 4px; font-size: 16px;">
              Completar Cadastro
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

    // Envia o e-mail de convite
    await sendEmail(email, 'Convite para completar cadastro no Save Date', '', htmlContent);

    // Retorne o novo usuário criado
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { message: 'Error creating user', error: (error as Error).message },
      { status: 500 },
    );
  }
}
