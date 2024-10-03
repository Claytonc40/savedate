// app/libs/checkProductExpiry.ts
import prisma from '@/app/libs/prismaDb';
import { sendNotification } from './sendNotification';

export const checkProductExpiry = async () => {
  const hoje = new Date();

  const produtos = await prisma.product.findMany({
    include: {
      tenant: true,
      notifiedSectors: {
        include: {
          setor: {
            include: {
              users: true,
            },
          },
        },
      },
    },
  });

  for (const produto of produtos) {
    const { validity, validityUnit } = produto;

    if (!validity || !validityUnit) continue;

    let dataVencimento = new Date(produto.createdAt);

    if (validityUnit === 'days') {
      dataVencimento.setDate(dataVencimento.getDate() + validity);
    } else if (validityUnit === 'hours') {
      dataVencimento.setHours(dataVencimento.getHours() + validity);
    }

    const diff = dataVencimento.getTime() - hoje.getTime();
    const diffDays = Math.ceil(diff / (1000 * 60 * 60 * 24));

    // Se o produto vencer em 7 dias ou menos
    if (diffDays <= 7 && diffDays >= 0) {
      for (const notifiedSetor of produto.notifiedSectors) {
        const users = notifiedSetor.setor.users;
        for (const user of users) {
          // Chamada da função sendNotification
          await sendNotification(user.id, {
            title: 'Produto Próximo ao Vencimento',
            body: `O produto ${produto.name} vencerá em ${diffDays} dias.`,
          });
        }
      }
    }
  }
};
