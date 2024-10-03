'use client';

import useUser from '@/hooks/useUser';
import { urlB64ToUint8Array } from '@/lib/utils';
import { useQueryClient } from '@tanstack/react-query';
import { BellOff, BellRing } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const PushNotificationButton = () => {
  const { data: user, isFetching } = useUser();
  const queryClient = useQueryClient();

  const [notificationPermission, setNotificationPermission] = useState<
    'granted' | 'denied' | 'default'
  >(Notification.permission);

  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    setNotificationPermission(Notification.permission);
  }, []);

  useEffect(() => {
    // Verifica se o usuário já está inscrito
    const checkSubscription = async () => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          const subscription = await registration.pushManager.getSubscription();
          setIsSubscribed(!!subscription);
        }
      }
    };
    checkSubscription();
  }, []);

  const showNotification = async () => {
    if ('Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
        if (permission === 'granted') {
          await subscribeUser();
        } else {
          toast.info('Por favor, habilite as notificações nas configurações.');
        }
      } catch (error) {
        console.error('Erro ao solicitar permissão de notificação:', error);
      }
    } else {
      toast.info('Este navegador não suporta notificações push.');
    }
  };

  const subscribeUser = async () => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      try {
        const registration = await navigator.serviceWorker.ready; // Espera até o Service Worker estar ativo

        await generateSubscribeEndPoint(registration);
      } catch (error) {
        console.error('Erro ao registrar o Service Worker ou assinar notificações:', error);
        toast.error('Erro ao registrar o Service Worker ou assinar notificações.');
      }
    } else {
      toast.error('Service workers não são suportados neste navegador.');
    }
  };

  const generateSubscribeEndPoint = async (registration: ServiceWorkerRegistration) => {
    try {
      const applicationServerKey = urlB64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_KEY!);
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });

      // Envie o subscription para o backend
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        toast.error('Erro ao salvar a inscrição de notificações.');
      } else {
        setIsSubscribed(true);
        queryClient.invalidateQueries({ queryKey: ['user'] });
      }
    } catch (error) {
      console.error('Erro ao gerar o endpoint de inscrição:', error);
      toast.error('Erro ao gerar o endpoint de inscrição.');
    }
  };

  const removeNotification = async () => {
    setNotificationPermission('default');

    if ('serviceWorker' in navigator && 'PushManager' in window) {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          await subscription.unsubscribe();
        }
      }
    }

    // Remover a inscrição do backend
    const response = await fetch('/api/unsubscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ endpoint: user?.endpoint }), // Ajuste conforme sua necessidade
    });

    if (!response.ok) {
      toast.error('Erro ao remover a inscrição de notificações.');
    } else {
      setIsSubscribed(false);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  };

  if (isFetching) {
    return null;
  }

  return (
    <div className="cursor-pointer transition-all hover:scale-110">
      {isSubscribed ? (
        <BellRing onClick={removeNotification} />
      ) : (
        <BellOff onClick={showNotification} />
      )}
    </div>
  );
};

export default PushNotificationButton;
