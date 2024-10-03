// app/hook/useUser.tsx
'use client';

import { useSession } from 'next-auth/react';

export type IUser = {
  name: string | null;
  email: string | null;
  image: string | null;
};

export default function useUser() {
  const { data: session, status } = useSession();

  const user = session?.user;

  return {
    data: user,
    isFetching: status === 'loading',
  };
}
