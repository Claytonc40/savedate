'use client';

import Loading from '@/components/Loading/loading';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const ConfirmEmail = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleTokenConfirmation = async (token: string) => {
    try {
      setLoading(true);

      const response = await fetch('/api/auth/confirmation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token }),
      });

      const data = await response.json();

      if (response.status === 200) {
        toast.success('E-mail confirmado com sucesso!');
        router.push('/auth'); // Redireciona para a página de login após a confirmação
      }
    } catch (error) {
      toast.error('Ocorreu um erro ao confirmar o e-mail.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get('token');

    if (token) {
      handleTokenConfirmation(token);
    } else {
      toast.error('Token de confirmação não encontrado.');
    }
  }); // Não precisa mais de `searchParams` como dependência

  return (
    <div className="bg-gray-100 mt-8 flex min-h-screen items-start justify-center">
      <div className="mt-10 w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-semibold">
          {loading ? 'Confirmando seu e-mail...' : 'Confirmar E-mail'}
        </h1>
        {loading ? (
          <p className="text-gray-600 text-center">
            Por favor, aguarde enquanto confirmamos seu e-mail...
            <Loading />
          </p>
        ) : (
          <>
            <p className="text-center text-red">Token de confirmação não encontrado na URL.</p>
            <div className="mt-6 flex justify-center">
              <Link href="/auth">
                <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  Voltar para o Login
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ConfirmEmail;
