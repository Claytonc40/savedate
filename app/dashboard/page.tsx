'use client';
import { useIsLogedIn } from '../admin/hooks/useIsLogedIn';
import Dashboard from './_components/Dashboard/dashboard';

export default function Home() {
  // Check if user is logged in | Add redirect logic if needed
  const logedIn = useIsLogedIn();

  return (
    <div>
      <Dashboard />
    </div>
  );
}
