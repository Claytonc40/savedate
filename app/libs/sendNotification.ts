// app/libs/sendNotification.ts
import prisma from '@/app/libs/prismaDb';
import webpush from './webPush';

interface PushSubscription {
  endpoint: string;
  keys: {
    p256dh: string;
    auth: string;
  };
}

export const sendNotification = async (userId: string, payload: any) => {
  const subscriptions = await prisma.pushSubscription.findMany({
    where: { userId },
  });

  for (const sub of subscriptions) {
    try {
      const pushSubscription = {
        endpoint: sub.endpoint,
        keys: sub.keys as { p256dh: string; auth: string },
      };

      // Certifique-se de que o payload é uma string JSON válida
      const payloadString = JSON.stringify(payload);

      await webpush.sendNotification(pushSubscription, payloadString);
    } catch (error: any) {
      console.error('Erro ao enviar notificação:', error);
      // ... tratamento de erro adicional
    }
  }
};
