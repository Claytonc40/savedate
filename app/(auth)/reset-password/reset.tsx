'use client';

import FadeIn from '@/components/animation/FadeIn';
import { Button } from '@/components/ui/button';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { RiLockPasswordLine } from 'react-icons/ri';
import Input from '../auth/components/ui/input';
import { useAuth } from '../auth/hooks/useAuth';
import { passwordValidation } from '../auth/validation/validation';

const Reset = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm<FieldValues>({
    defaultValues: {
      password: '',
    },
  });

  const { loading, changePassword } = useAuth(setError);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const packData = { password: data.password, token };
    try {
      await changePassword(packData);
    } catch (error: any) {
      setErrorMessage(error?.message || 'Error');
    }
  };

  return (
    <FadeIn delay={0.8} direction="left">
      <p className="text-gray-500 mt-4 flex text-sm">
        <RiLockPasswordLine size={16} color="text-gray-500" className="mr-2" />
        Adicione sua nova senha!
      </p>
      <form action="" onSubmit={handleSubmit(onSubmit)} className="py-6">
        <div className="relative flex flex-col items-end">
          <Input
            label="Senha"
            register={register}
            type={showPassword ? 'text' : 'Senha'}
            id="password"
            errors={errors}
            validation={passwordValidation}
          />
          <div>
            {!showPassword ? (
              <FaEye
                className="absolute right-2 top-5 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <FaEyeSlash
                className="absolute right-2 top-5 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            )}
          </div>
          {errorMessage && (
            <div className="mb-6 mt-1 text-xs leading-3 text-rose-500">{errorMessage}</div>
          )}
          <p className="text-gray-500 mb-4 ml-2 mt-2 text-xs">
            Sua senha deve ter pelo menos 8 caracteres e incluir uma mistura de letras maiúsculas e
            minúsculas, números e caracteres especiais.
          </p>
        </div>
        <Button type="submit" size="full" disabled={loading}>
          Redefinir senha
        </Button>
      </form>
    </FadeIn>
  );
};

export default Reset;
