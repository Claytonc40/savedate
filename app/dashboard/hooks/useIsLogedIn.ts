import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const useIsLogedIn = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return; // Não faz nada enquanto carrega a sessão

    if (status === 'unauthenticated') {
      router.push('/auth'); // Redireciona para login se o usuário não estiver autenticado
    }

    if (status === 'authenticated') {
      // Verificar se a assinatura é válida ou se o usuário não tem assinatura
      const isSubscriptionValid = session?.user?.subscriptionActive;
      const subscriptionExpired = session?.user?.subscription?.isExpired;

      if (!isSubscriptionValid || subscriptionExpired) {
        // Exibe modal de assinatura ou redireciona
        router.push('/admin/subscription'); // Alternativamente, redireciona para página de assinatura
      }
    }
  }, [status, session, router]);

  return { session, loading: status === 'loading' };
};
export { useIsLogedIn };
