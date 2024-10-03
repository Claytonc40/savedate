'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';

interface IProps {
  children: React.ReactNode;
}

export const AuthContext = ({ children }: IProps) => {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-work.js').then(
        (registration) => {
          console.log('Service Worker registrado com sucesso:', registration.scope);
        },
        (err) => {
          console.log('Falha ao registrar o Service Worker', err);
        },
      );
    }
  }, []);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>{children}</SessionProvider>;
    </QueryClientProvider>
  );
};
