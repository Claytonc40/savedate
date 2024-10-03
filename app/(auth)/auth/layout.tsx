'use client';
import Loading from '@/components/Loading/loading';
import { useRouter } from 'next/navigation';
import { Toaster } from 'sonner';
import { useIsLogedIn } from '../../dashboard/hooks/useIsLogedIn';
import BottomText from '../auth/components/BottomText';
import Logo from '../auth/components/Logo';
import Video from '../auth/components/video';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { session, loading } = useIsLogedIn(); // Pega o loading e session do hook

  // Exibe o loading enquanto o estado de sessão está carregando
  if (loading) {
    return <Loading />;
  }

  // Redireciona se o usuário estiver autenticado
  if (session) {
    return router.push('/dashboard'); // Redireciona pa+ra a dashboard
  }
  return (
    <div className="w-full overflow-hidden">
      <div className="m-auto h-screen 2xl:container">
        <Video />
        <div className="relative ml-auto flex h-full lg:w-6/12">
          <div className="m-auto px-6 py-12 sm:p-20 xl:w-10/12">
            <Logo />
            <Toaster position="top-center" richColors />
            {children}
            <BottomText />
          </div>
        </div>
      </div>
    </div>
  );
}
