import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const useIsLogedIn = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') {
    return { session: null, loading: true }; // Retorna o estado de loading enquanto carrega a sessão
  }

  if (status === 'unauthenticated') {
    router.push('/auth'); // Redireciona para a página de login
    return { session: null, loading: false };
  }

  return { session, loading: false }; // Retorna a sessão se o usuário estiver autenticado
};

export { useIsLogedIn };
