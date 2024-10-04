'use client';
import PricingCard from '@/app/dashboard/_components/PricingCard';
import { loadStripe } from '@stripe/stripe-js';
import { useSession } from 'next-auth/react';
import router from 'next/router';
import { useEffect, useState } from 'react';

export default function PricingPage() {
  const { data: session } = useSession();
  const tenantId = session?.user?.tenantId; // Retrieve tenant ID from session
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

  const isSubscriptionValid = session?.user?.subscription?.isActive;

  useEffect(() => {
    if (isSubscriptionValid) {
      // Exibe modal de assinatura ou redireciona
      router.push('/dashboard'); // Alternativamente, redirecion
    }
  }, [isSubscriptionValid]);

  const handleClick = async (planId: string, isSubscription: boolean) => {
    try {
      setIsCreatingCheckout(true);
      const checkoutResponse = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ planId, tenantId, isSubscription }),
      });

      const stripeClient = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string);

      if (!stripeClient) throw new Error('Failed to load Stripe client');

      const { sessionId } = await checkoutResponse.json();
      await stripeClient.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Failed to create checkout session', error);
      setIsCreatingCheckout(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-grow bg-gradient-to-br text-graydark dark:text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="mb-8 text-center text-4xl font-bold">Planos e Preços</h1>
          <p className="mb-12 text-center text-xl">Escolha o plano perfeito para o seu negócio</p>
          <div className="grid grid-cols-1 items-center justify-center gap-8 md:grid-cols-3">
            {/* <PricingCard
              title="STANDARD"
              price="99"
              features={[
                '5 Usuários',
                '150 Cadastro de Produtos',
                'Alerta por e-mail',
                'Dashboard Multitenant',
              ]}
              onClick={() => handleClick('standard-plan-id', true)}
              disabledFeatures={[
                'Alerta pelo WhatsApp',
                'Suporte a impressão',
                'Sua marca nas etiquetas',
              ]}
            /> */}
            <PricingCard
              title="PREMIUM"
              price="199"
              isRecommended={true}
              features={[
                '10 Usuários',
                'Ilimitado Cadastro de Produtos',
                'Alerta por e-mail',
                'Alerta pelo WhatsApp',
                'Suporte a impressão',
                'Sua marca nas etiquetas',
                'Suporte Prioritário',
              ]}
              onClick={() => handleClick('premium-plan-id', true)}
            />
            <PricingCard
              title="ELITE"
              price="Personalizado"
              features={[
                'Todas as Funcionalidades Premium',
                'Implementar Novas Funcionalidades',
                'Integração Personalizada',
                'Suporte 24/7',
                'Treinamento Dedicado',
                'SLA Garantido',
              ]}
              onClick={() => handleClick('elite-plan-id', true)}
              ctaText="ENTRAR EM CONTATO"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
