// import stripe from '@/lib/stripe';
// import { NextRequest, NextResponse } from 'next/server';

// export async function POST(req: NextRequest) {
//   const { planId, tenantId, isSubscription } = await req.json();

//   const price = isSubscription
// //     ? process.env.STRIPE_SUBSCRIPTION_PRICE_ID
//     : process.env.STRIPE_PRICE_ID;

//   try {
//     const session = await stripe.checkout.sessions.create({
//       line_items: [
//         {
//           price: price,
//           quantity: 1,
//         },
//       ],
//       mode: isSubscription ? 'subscription' : 'payment',
//       payment_method_types: ['card'],
//       success_url: `${req.headers.get('origin')}/dashboard`,
//       cancel_url: `${req.headers.get('origin')}/`,
//       metadata: {
//         tenantId,
//         planId,
//       },
//     });

//     return NextResponse.json({ sessionId: session.id });
//   } catch (err) {
//     console.error('Error creating checkout session:', err);
//     return NextResponse.error();
//   }
// }
import stripe from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { planId, tenantId } = await req.json();

  const price = process.env.STRIPE_PRICE_ID; // Only handling subscriptions

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: price,
          quantity: 1,
        },
      ],
      mode: 'subscription', // Subscription mode only
      payment_method_types: ['card'],
      success_url: `${req.headers.get('origin')}/dashboard`,
      cancel_url: `${req.headers.get('origin')}/`,
      metadata: {
        tenantId,
        planId,
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.error('Error creating subscription session:', err);
    return NextResponse.error();
  }
}
