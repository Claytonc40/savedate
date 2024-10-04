import { PrismaAdapter } from '@next-auth/prisma-adapter';
import bcrypt from 'bcryptjs';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import FacebookProvider from 'next-auth/providers/facebook';
import GoogleProvider from 'next-auth/providers/google';

import prisma from '@/app/libs/prismaDb';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ?? 'admin', // Default role for new users
        };
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Invalid Credentials');
        }

        // Find user in the database
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error('User not found');
        }

        if (!user?.hashedPassword) {
          throw new Error('This account uses an OAuth provider');
        }

        if (!user.emailVerified) {
          throw new Error('Email not verified');
        }

        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.hashedPassword);

        if (!isPasswordCorrect) {
          throw new Error('CredentialsSignin'); // Define um nome de erro específico para senha incorreta
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email ?? undefined },
      });

      if (!existingUser) {
        const newTenant = await prisma.tenant.create({
          data: {
            name: `${user.name ?? 'New Tenant'}'s Tenant`,
          },
        });

        const newUser = await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            image: user.image,
            role: 'admin',
            tenantId: newTenant.id,
          },
        });

        await prisma.userActivityLog.create({
          data: {
            userId: newUser.id,
            action: 'SIGNUP',
            metadata: { provider: account?.provider as string },
          },
        });

        return true;
      }

      await prisma.account.upsert({
        where: {
          provider_providerAccountId: {
            provider: account?.provider as string,
            providerAccountId: account?.providerAccountId as string,
          },
        },
        create: {
          userId: existingUser.id,
          provider: account?.provider as string,
          providerAccountId: account?.providerAccountId as string,
          type: 'oauth',
        },
        update: {},
      });

      await prisma.userActivityLog.create({
        data: {
          userId: existingUser.id,
          action: 'LOGIN',
          metadata: { provider: account?.provider },
        },
      });

      return true;
    },
    async session({ session, token, user }) {
      if (token.sub) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
          include: { tenant: true },
        });

        if (session.user && dbUser) {
          session.user.id = dbUser.id;
          session.user.role = dbUser.role;
          session.user.tenantId = dbUser.tenantId;
          session.user.image = dbUser.image;
        }

        // Adicionando a verificação da assinatura
        if (dbUser?.tenant) {
          const subscription = await prisma.subscription.findUnique({
            where: { tenantId: dbUser.tenant.id },
          });

          session.user.subscriptionActive = subscription?.isActive ?? false;
        }
      }

      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60,
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.SECRET,
};
