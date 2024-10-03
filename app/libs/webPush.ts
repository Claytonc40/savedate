// utils/webPush.ts
import webpush from 'web-push';

webpush.setVapidDetails(
  'mailto:notification@savedate.com.br',
  process.env.NEXT_PUBLIC_VAPID_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export default webpush;
