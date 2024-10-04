'use client';

import { loadStripe } from '@stripe/stripe-js';
import { useState } from 'react';

export default function BuyButton() {
  const [isCreatingCheckout, setIsCreatingCheckout] = useState(false);

  async function handleClick(testeId: string, assinatura: boolean) {
    try {
      setIsCreatingCheckout(true);
      const checkoutResponse = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ testeId, assinatura }),
      });

      const stripClient = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUB_KEY as string);

      if (!stripClient) {
        throw new Error('Failed to load Stripe client');
      }

      const { sessionId } = await checkoutResponse.json();
      await stripClient.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error('Failed to create checkout session', error);
      setIsCreatingCheckout(false);
    }
  }
  return (
    <div className="flex flex-col gap-5">
      <button
        className="rounded-md border px-4 py-2 disabled:opacity-50"
        onClick={() => handleClick('123', false)}
        disabled={isCreatingCheckout}
      >
        {isCreatingCheckout ? 'Criando Compra...' : 'Comprar'}
      </button>
      <button
        onClick={() => handleClick('123', true)}
        className="rounded-md border px-4 py-2 disabled:opacity-50"
        disabled={isCreatingCheckout}
      >
        {isCreatingCheckout ? 'Criando Compra...' : 'Assinar'}
      </button>
    </div>
  );
}
