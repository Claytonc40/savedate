import stripe from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { planId, tenantId, isSubscription } = await req.json();

    if (!planId || !tenantId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const price = isSubscription
      ? process.env.STRIPE_SUBSCRIPTION_PRICE_ID
      : process.env.STRIPE_PRICE_ID;

    if (!price) {
      return NextResponse.json({ error: 'Price not found' }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price, quantity: 1 }],
      mode: isSubscription ? 'subscription' : 'payment',
      payment_method_types: ['card'],
      success_url: `${req.headers.get('origin')}/dashboard`,
      cancel_url: `${req.headers.get('origin')}/`,
      metadata: { tenantId, planId },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }
}
