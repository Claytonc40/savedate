'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  // Verificar o estado do tema no localStorage ao carregar a página
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Atualizar o localStorage e a classe 'dark' no HTML
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      if (newMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      return newMode;
    });
  };

  return (
    <nav className="bg-teal-800 p-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-white">
          Save Date
        </Link>
        <Link href="/auth" passHref>
          <Button
            variant="outline"
            className="border-white text-white hover:bg-teal-700 hover:text-white"
          >
            Login
          </Button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
