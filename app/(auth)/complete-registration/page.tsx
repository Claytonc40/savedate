'use client'; // Certifique-se de que o código é executado no lado do cliente

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation'; // Hook para capturar parâmetros da URL
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

// Evitar que a página seja pré-renderizada
export const dynamic = 'force-dynamic'; // Força a página a ser renderizada somente no cliente

export default function CompleteRegistration() {
  const searchParams = useSearchParams(); // Hook para capturar os parâmetros da URL
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null); // Armazena o token no estado
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenValid, setTokenValid] = useState<boolean | null>(null); // Estado para saber se o token é válido

  // Verifica a validade do token ao carregar a página
  useEffect(() => {
    const tokenFromParams = searchParams.get('token'); // Captura o valor do token da URL
    if (!tokenFromParams) {
      toast.error('Token não encontrado');
      router.push('/auth'); // Redireciona para a página de login se o token não for encontrado
      return;
    }

    setToken(tokenFromParams); // Armazena o token no estado

    const validateToken = async () => {
      try {
        const res = await fetch(`/api/auth/validate-token?token=${tokenFromParams}`); // Endpoint para validar o token
        const data = await res.json();
        if (res.ok) {
          setTokenValid(true); // O token é válido
        } else {
          setTokenValid(false); // O token é inválido ou expirado
          toast.error(data.message || 'Token inválido ou expirado');
        }
      } catch (error) {
        setTokenValid(false);
        toast.error('Erro ao validar o token.');
      }
    };

    validateToken();
  }, [searchParams, router]);

  const handleCompleteRegistration = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem.');
      return;
    }

    if (!password) {
      toast.error('Por favor, preencha a senha.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/complete-registration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || 'Erro ao completar o registro.');
      }

      toast.success('Registro completado com sucesso! Você será redirecionado.');
      router.push('/auth'); // Redireciona o usuário para a página de login após o registro
    } catch (error) {
      toast.error((error as Error).message || 'Erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  // Exibição condicional com base na validade do token
  if (tokenValid === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Verificando token...</p>
      </div>
    );
  }

  if (!tokenValid) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-full max-w-md rounded-md bg-white p-8 text-center shadow-md">
          <h1 className="mb-6 text-center text-2xl font-bold">Token inválido ou expirado</h1>
          <Button className="w-full" onClick={() => router.push('/auth')}>
            Voltar para Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-md bg-white p-8 shadow-md">
        <h1 className="mb-6 text-center text-2xl font-bold">Complete seu Registro</h1>

        <form onSubmit={handleCompleteRegistration}>
          <div className="mb-4">
            <label htmlFor="password" className="text-gray-700 block text-sm font-medium">
              Nova Senha
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="confirm-password" className="text-gray-700 block text-sm font-medium">
              Confirme sua Senha
            </label>
            <Input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1 block w-full"
            />
          </div>

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Carregando...' : 'Completar Registro'}
          </Button>
        </form>
      </div>
    </div>
  );
}
