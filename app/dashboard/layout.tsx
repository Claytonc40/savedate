'use client';

import '@/css/satoshi.css';
import '@/css/style.css';
import 'flatpickr/dist/flatpickr.min.css';
import { Inter } from 'next/font/google';
import { useRouter } from 'next/navigation'; // Corrige o hook para ser usado corretamente
import React from 'react';
import { Toaster } from 'sonner';
import DefaultLayout from './_components/Layouts/DefaultLayout';
import Loading from './_components/Loading'; // Supondo que você tenha um componente de loading
import { useIsLogedIn } from './hooks/useIsLogedIn';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { session, loading } = useIsLogedIn(); // Pega o loading e session do hook

  // Exibe o loading enquanto o estado de sessão está carregando
  if (loading) {
    return <Loading />;
  }

  // Redireciona se o usuário não estiver autenticado
  if (!session) {
    return router.push('/auth'); // Redireciona pa+ra a página de login
  }

  return (
    <div suppressHydrationWarning={true} className="dark:bg-graydark dark:text-bodydark">
      <Toaster position="top-center" richColors />
      <DefaultLayout>{children}</DefaultLayout>
    </div>
  );
}
