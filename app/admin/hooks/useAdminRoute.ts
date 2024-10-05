'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const useAdminRoute = (redirectTo = '/auth') => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    // Wait until the session is checked
    if (status === 'loading') return;
    const isSubscriptionValid = session?.user?.subscriptionActive;
    const subscriptionExpired = session?.user?.subscription?.isExpired;

    // Redirect if not logged in or not an admin

    if (!session || session.user.role !== 'admin') {
      router.push(redirectTo);
    } else {
      if (!isSubscriptionValid || subscriptionExpired) {
        // Exibe modal de assinatura ou redireciona
        router.push('/admin/subscription'); // Alternativamente, redireciona para página de assinatura
      }
      setLoading(false);
    }
  }, [session, status, redirectTo, router]);

  // Return the session and a loading state for conditional rendering
  return { session, loading };
};

export default useAdminRoute;
