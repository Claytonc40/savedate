import prisma from '@/app/libs/prismaDb';
import stripe from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';

const secret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req: Request) {
  try {
    const body = await req.text();
    const signature = headers().get('stripe-signature');

    if (!secret || !signature) {
      throw new Error('Missing secret or signature');
    }

    const event = stripe.webhooks.constructEvent(body, signature, secret);

    switch (event.type) {
      case 'checkout.session.completed':
        if (event.data.object.payment_status === 'paid') {
          const tenantId = event.data.object.metadata?.tenantId;
          const planId = event.data.object.metadata?.planId;
          console.log('Checkout completed', tenantId, planId);

          if (tenantId && planId) {
            const existingSubscription = await prisma.subscription.findUnique({
              where: { tenantId },
            });

            if (existingSubscription) {
              await prisma.subscription.update({
                where: { tenantId },
                data: {
                  planId,
                  startDate: new Date(),
                  endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                  isActive: true,
                },
              });
            } else {
              await prisma.subscription.create({
                data: {
                  tenantId,
                  planId,
                  startDate: new Date(),
                  endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
                  isActive: true,
                },
              });
            }

            console.log('Subscription created/updated successfully for tenant', tenantId);
          }
        }
        break;

      case 'checkout.session.async_payment_succeeded':
        if (event.data.object.payment_status === 'paid') {
          const tenantId = event.data.object.metadata?.tenantId;

          if (tenantId) {
            await prisma.subscription.update({
              where: { tenantId },
              data: { isActive: true },
            });

            console.log('Boleto payment confirmed', tenantId);
          }
        }
        break;

      case 'checkout.session.async_payment_failed':
        if (event.data.object.payment_status === 'unpaid') {
          const tenantId = event.data.object.metadata?.tenantId;
          console.log('Boleto payment failed', tenantId);
        }
        break;

      case 'customer.subscription.deleted':
        const subscriptionId = event.data.object.id;
        await prisma.subscription.update({
          where: { id: subscriptionId },
          data: { isActive: false },
        });

        console.log('Subscription cancelled', subscriptionId);
        break;
    }

    return NextResponse.json({ result: event, ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: `Webhook error: ${error}`, ok: false }, { status: 500 });
  }
}
