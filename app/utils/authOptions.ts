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
          throw new Error('Incorrect password');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      // Check if the user already exists in the database
      const existingUser = await prisma.user.findUnique({
        where: { email: user.email ?? undefined },
      });

      if (!existingUser) {
        // If the user does not exist, create a new tenant and associate the user with it
        const newTenant = await prisma.tenant.create({
          data: {
            name: `${user.name ?? 'New Tenant'}'s Tenant`, // Customize the tenant name as needed
          },
        });

        // Create the new user and associate it with the new tenant
        const newUser = await prisma.user.create({
          data: {
            name: user.name,
            email: user.email,
            image: user.image,
            role: 'admin', // Default role for new users
            tenantId: newTenant.id, // Associate the user with the new tenant
          },
        });

        // Log the sign-up activity
        await prisma.userActivityLog.create({
          data: {
            userId: newUser.id,
            action: 'SIGNUP',
            metadata: { provider: account?.provider as string },
          },
        });

        return true;
      }

      // If the user already exists, link the provider (e.g., Google/Facebook) to the user account
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

      // Log the sign-in activity for the existing user
      await prisma.userActivityLog.create({
        data: {
          userId: existingUser.id,
          action: 'LOGIN',
          metadata: { provider: account?.provider },
        },
      });

      return true; // Allow the sign-in
    },
    async session({ session, token, user }) {
      // Attach user role and tenantId to the session
      if (token.sub) {
        const dbUser = await prisma.user.findUnique({
          where: { id: token.sub },
        });

        if (session.user && dbUser) {
          session.user.id = dbUser.id;
          session.user.role = dbUser.role;
          session.user.tenantId = dbUser.tenantId;
          session.user.image = dbUser.image;
        }
      }

      return session;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours in seconds
  },
  debug: process.env.NODE_ENV === 'development',
  secret: process.env.SECRET,
};
