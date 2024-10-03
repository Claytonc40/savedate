// server/schedule.ts
import { checkProductExpiry } from '@/app/libs/checkProductExpiry';
import cron from 'node-cron';

cron.schedule('0 9 * * *', () => {
  console.log('Executando verificação de produtos às 9h diariamente');
  checkProductExpiry();
});
