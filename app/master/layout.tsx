'use client';
import '@/css/satoshi.css';
import '@/css/style.css';
import { Role } from '@prisma/client';
import 'flatpickr/dist/flatpickr.min.css';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast, Toaster } from 'sonner';
import DefaultLayout from './_components/Layouts/DefaultLayout';
import Loading from './_components/Loading';
import useAdminRoute from './hooks/useAdminRoute';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { session, loading } = useAdminRoute();

  if (loading) {
    return <Loading />;
  }

  if (session?.user?.role === Role.admin) {
    return (
      <div suppressHydrationWarning={true} className="dark:bg-boxdark-2 dark:text-bodydark">
        <Toaster position="top-center" richColors />
        <DefaultLayout>{children}</DefaultLayout>
      </div>
    );
  } else {
    router.push('/dashboard');
    return toast.error('Voce não tem permissão para acessar esta página');
  }
}
