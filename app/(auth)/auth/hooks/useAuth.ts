import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';

import { Method, makeRequest } from '@/app/utils/fetch';

type ErrorCb = (type: string, data: any) => void;

export const useAuth = (errorCb?: ErrorCb) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingGoogle, setLoadingGoogle] = useState<boolean>(false);
  const [loadingFacebook, setLoadingFacebook] = useState<boolean>(false);

  const router = useRouter();

  const socialActions = (action: string) => {
    if (action === 'facebook') setLoadingFacebook(true);
    if (action === 'google') setLoadingGoogle(true);

    signIn(action, { redirect: false }).then((cb) => {
      if (cb?.error) {
   
      }
      if (cb?.ok && !cb?.error) {
        router.push('/dashboard');
      }
    });
  };

  const activateUser = async (token: string) => {
    setLoading(true);
    try {
      const data = await makeRequest('/api/auth/confirmation', Method.POST, { token });
      setLoading(false);
      return data;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const changePassword = async (data: FieldValues) => {
    setLoading(true);
    try {
      await makeRequest('/api/auth/change-password', Method.POST, data);
      router.push('/auth');
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const passwordReset = async (data: FieldValues) => {
    setLoading(true);
    try {
      const res = await makeRequest('/api/auth/reset', Method.POST, data);
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const register = async (data: FieldValues) => {
    setLoading(true);
    try {
      const res = await makeRequest('/api/auth/register', Method.POST, data);
      setLoading(false);
      return res;
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  const signin = async (data: FieldValues) => {
    setLoading(true);
    signIn('credentials', {
      ...data,
      redirect: false,
    })
      .then((cb) => {
        if (cb?.error) {
          // Verifica o erro retornado e exibe mensagem apropriada
          if (cb.error === 'CredentialsSignin') {
            errorCb &&
              errorCb('password', {
                type: 'backend',
                message: 'Senha incorreta. Tente novamente ou redefina sua senha.',
              });
          } else if (cb.error === 'email') {
            errorCb &&
              errorCb('email', {
                type: 'backend',
                message: 'As credenciais fornecidas não correspondem aos nossos registros.',
              });
          }
          if (cb.error === 'google') {
            errorCb &&
              errorCb('email', {
                type: 'backend',
                message:
                  'Este endereço de e-mail já está sendo usado com o login do Google. Use o login do Google novamente!',
              });
          }
          if (cb.error === 'not_confirmed') {
            errorCb &&
              errorCb('email', {
                type: 'backend',
                message: 'Por favor, confirme seu endereço de e-mail para fazer login.',
              });
          }
        }
        if (cb?.ok && !cb?.error) {
          router.push('/dashboard');
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return {
    loading,
    loadingGoogle,
    loadingFacebook,
    socialActions,
    register,
    signin,
    passwordReset,
    changePassword,
    activateUser,
  };
};
