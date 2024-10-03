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
  const [loading, setLoading] = useState(true); // Para exibir um loading enquanto os dados são carregados

  // Configuração do formulário usando react-hook-form
  const methods = useForm<ProfileFormData>();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = methods;

  // Função de envio para o backend
  const onSubmit = async (values: ProfileFormData) => {
    if (values.newPassword && values.newPassword !== values.confirmPassword) {
      toast.error('As senhas não coincidem.');
      return;
    }

    try {
      const { name, email, newPassword } = values;

      // Apenas incluir a nova senha se o campo estiver preenchido
      const dataToSend = {
        name,
        email,
        ...(newPassword && { newPassword }), // Inclui newPassword apenas se preenchido
      };

      const response = await fetch(`/api/user`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend), // Enviando os valores para a API
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

  // Função para buscar dados da sessão e preencher o formulário
  useEffect(() => {
    async function fetchUserData() {
      try {
        const sessionResponse = await fetch('/api/auth/session'); // API do NextAuth para obter sessão
        const sessionData = await sessionResponse.json();

        if (sessionData && sessionData.user) {
          setValue('name', sessionData.user.name || '');
          setValue('email', sessionData.user.email || '');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      } finally {
        setLoading(false); // Finalizar o loading quando os dados forem carregados
      }
    }

    fetchUserData();
  }, [setValue]);

  // Função para lidar com a mudança do avatar (opcional)
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
    return <Loading />; // Um simples loading enquanto os dados são carregados
  }

  return (
    <Card className="mx-auto w-full max-w-2xl">
      <CardHeader>
        <CardTitle>Editar Perfil</CardTitle>
        <CardDescription>Atualize suas informações pessoais e senha.</CardDescription>
      </CardHeader>
      <CardContent>
        {/* Envolvendo o formulário dentro de FormProvider */}
        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Campo de Nome */}
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input
                  placeholder="Seu nome"
                  {...register('name', { required: 'Nome é obrigatório', minLength: 2 })}
                />
              </FormControl>
              {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
            </FormItem>

            {/* Campo de Email */}
            <FormItem>
              <FormLabel>E-mail</FormLabel>
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
                />
              </FormControl>
              {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
            </FormItem>

            <Separator />

            {/* Seção de Alteração de Senha */}
            <div>
              <h3 className="text-lg font-medium">Mudar Senha (opcional)</h3>
              <p className="text-sm text-muted-foreground">
                Deixe em branco se não deseja alterar sua senha.
              </p>
            </div>

            {/* Campo de Nova Senha */}
            <FormItem>
              <FormLabel>Nova Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Nova senha (opcional)"
                  {...register('newPassword', {
                    minLength: { value: 8, message: 'A senha deve ter pelo menos 8 caracteres.' },
                  })}
                />
              </FormControl>
              {errors.newPassword && <FormMessage>{errors.newPassword.message}</FormMessage>}
            </FormItem>

            {/* Campo de Confirmação de Senha */}
            <FormItem>
              <FormLabel>Confirme a Senha</FormLabel>
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
                />
              </FormControl>
              {errors.confirmPassword && (
                <FormMessage>{errors.confirmPassword.message}</FormMessage>
              )}
            </FormItem>

            <Button className="text-white" type="submit">
              Salvar
            </Button>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
