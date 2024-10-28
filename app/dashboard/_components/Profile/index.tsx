'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
import Loading from '../Loading';

interface ProfileFormData {
  name: string;
  email: string;
  newPassword?: string;
  confirmPassword?: string;
}

export default function ProfileEdit() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const methods = useForm<ProfileFormData>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit = async (values: ProfileFormData) => {
    if (values.newPassword && values.newPassword !== values.confirmPassword) {
      toast.error('As senhas não coincidem.');
      return;
    }

    try {
      const { name, email, newPassword } = values;
      const dataToSend = {
        name,
        email,
        ...(newPassword && { newPassword }),
      };

      const response = await fetch(`/api/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (response.ok) {
        toast.success('Seu perfil foi atualizado com sucesso.');
      } else {
        toast.error('Houve um erro ao atualizar o seu perfil.');
      }
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      toast.error('Houve um erro ao atualizar o seu perfil.');
    }
  };

  useEffect(() => {
    async function fetchUserData() {
      try {
        const sessionResponse = await fetch('/api/auth/session');
        const sessionData = await sessionResponse.json();

        if (sessionData && sessionData.user) {
          setValue('name', sessionData.user.name || '');
          setValue('email', sessionData.user.email || '');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [setValue]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Card className="mx-auto w-full max-w-2xl bg-white dark:bg-boxdark">
      <CardHeader>
        <CardTitle className="text-black dark:text-bodydark">Editar Perfil</CardTitle>
        <CardDescription className="text-body dark:text-bodydark1">
          Atualize suas informações pessoais e senha.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            <FormItem>
              <FormLabel className="text-black dark:text-bodydark">Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Seu nome"
                  {...register('name', { required: 'Nome é obrigatório', minLength: 2 })}
                  className="border-stroke bg-gray-2 text-black focus:border-primary dark:border-strokedark dark:bg-boxdark dark:text-bodydark"
                />
              </FormControl>
              {errors.name && (
                <FormMessage className="text-danger">{errors.name.message}</FormMessage>
              )}
            </FormItem>

            <FormItem>
              <FormLabel className="text-black dark:text-bodydark">E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="seu.email@exemplo.com"
                  {...register('email', {
                    required: 'Email é obrigatório',
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: 'Insira um e-mail válido',
                    },
                  })}
                  className="border-stroke bg-gray-2 text-black focus:border-primary dark:border-strokedark dark:bg-boxdark dark:text-bodydark"
                />
              </FormControl>
              {errors.email && (
                <FormMessage className="text-danger">{errors.email.message}</FormMessage>
              )}
            </FormItem>

            <Separator className="bg-stroke dark:bg-strokedark" />

            <div>
              <h3 className="text-lg font-medium text-black dark:text-bodydark">
                Mudar Senha (opcional)
              </h3>
              <p className="text-sm text-body dark:text-bodydark1">
                Deixe em branco se não deseja alterar sua senha.
              </p>
            </div>

            <FormItem>
              <FormLabel className="text-black dark:text-bodydark">Nova Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nova senha (opcional)"
                  {...register('newPassword', {
                    minLength: { value: 8, message: 'A senha deve ter pelo menos 8 caracteres.' },
                  })}
                  className="border-stroke bg-gray-2 text-black focus:border-primary dark:border-strokedark dark:bg-boxdark dark:text-bodydark"
                />
              </FormControl>
              {errors.newPassword && (
                <FormMessage className="text-danger">{errors.newPassword.message}</FormMessage>
              )}
            </FormItem>

            <FormItem>
              <FormLabel className="text-black dark:text-bodydark">Confirme a Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Confirme sua nova senha (opcional)"
                  {...register('confirmPassword', {
                    minLength: {
                      value: 8,
                      message: 'A confirmação de senha deve ter pelo menos 8 caracteres.',
                    },
                  })}
                  className="border-stroke bg-gray-2 text-black focus:border-primary dark:border-strokedark dark:bg-boxdark dark:text-bodydark"
                />
              </FormControl>
              {errors.confirmPassword && (
                <FormMessage className="text-danger">{errors.confirmPassword.message}</FormMessage>
              )}
            </FormItem>

            <Button
              type="submit"
              className="bg-primary text-white hover:bg-primary/90 dark:bg-primary dark:text-white dark:hover:bg-primary/90"
            >
              Salvar
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
