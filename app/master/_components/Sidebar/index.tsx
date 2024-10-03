'use client';

import {
  AlertTriangle,
  Home,
  LayoutDashboard,
  LogOut,
  Package,
  Printer,
  Settings,
  Users,
} from 'lucide-react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (arg: boolean) => void;
}

export default function Sidebar({ sidebarOpen, setSidebarOpen }: SidebarProps) {
  const pathname = usePathname();
  const trigger = useRef<HTMLButtonElement>(null);
  const sidebar = useRef<HTMLDivElement>(null);

  const [sidebarExpanded, setSidebarExpanded] = useState(true);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ key }: KeyboardEvent) => {
      if (!sidebarOpen || key !== 'Escape') return;
      setSidebarOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.querySelector('body')?.classList.add('sidebar-expanded');
    } else {
      document.querySelector('body')?.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-meta-7 duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="flex items-center justify-between gap-2 px-4 py-5.5 lg:py-6.5">
        <Link href="/dashboard">
          <div className="flex items-center gap-2 text-white">
            {/* <FcExpired /> */}
            <Image
              className="opacity-60"
              src="/images/logo.png"
              alt="DateGuard Logo"
              width={80}
              height={80}
            />
            <h3 className="text-lg font-bold">SAVE DATE</h3>
          </div>
        </Link>
        <button
          aria-controls="sidebar"
          onClick={(e) => {
            e.stopPropagation();
            setSidebarOpen(!sidebarOpen);
          }}
          className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm dark:border-strokedark dark:bg-boxdark lg:hidden"
        >
          <span className="relative block h-5.5 w-5.5 cursor-pointer">
            <span className="du-block absolute right-0 h-full w-full">
              <span
                className={`delay-&lsqb;0.5&rsqb; relative left-0 top-0 my-1 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out dark:bg-white`}
              ></span>
              <span
                className={`delay-&lsqb;0.5&rsqb; relative left-0 top-0 my-1 block h-0.5 w-full rounded-sm bg-black delay-150 duration-200 ease-in-out dark:bg-white`}
              ></span>
              <span
                className={`delay-&lsqb;0,9&rsqb; relative left-0 top-0 my-1 block h-0.5 w-full rounded-sm bg-black delay-200 duration-200 ease-in-out dark:bg-white`}
              ></span>
            </span>
          </span>
        </button>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}

      <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
        {/* <!-- Sidebar Menu --> */}
        <nav className="mt-5 px-4 py-4 lg:mt-9 lg:px-6">
          {/* <!-- Menu Group --> */}
          <div>
            <h3 className="mb-8 ml-4 border-b font-semibold text-white">Menu Admin</h3>

            <ul className="mb-6 flex flex-col gap-1.5">
              {/* <!-- Menu Item Dashboard --> */}

              <li>
                <Link
                  href="/admin"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-meta-5 dark:hover:bg-meta-5 ${
                    pathname === '/admin' && 'bg-meta-6 text-white'
                  }`}
                >
                  <Home />
                  Admin Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/dashboard"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-meta-5 dark:hover:bg-meta-5 ${
                    pathname === '/dashboard' && 'bg-meta-6 text-white'
                  }`}
                >
                  <LayoutDashboard />
                  User Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/products"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-meta-5 dark:hover:bg-meta-5 ${
                    pathname === '/admin/products' && 'bg-meta-6 text-white'
                  }`}
                >
                  <Package />
                  Gestão de Produtos
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/alerts"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-meta-5 dark:hover:bg-meta-5 ${
                    pathname === '/admin/alerts' && 'bg-meta-6 text-white'
                  }`}
                >
                  <AlertTriangle />
                  Alertas
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-meta-5 dark:hover:bg-meta-5 ${
                    pathname === '/admin/users' && 'bg-meta-6 text-white'
                  }`}
                >
                  <Users />
                  Gestão de Usuários
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/printers"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-meta-5 dark:hover:bg-meta-5 ${
                    pathname === '/admin/printers' && 'bg-meta-6 text-white'
                  }`}
                >
                  <Printer />
                  Configurações de Impressão
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/settings"
                  className={`group relative flex items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-meta-5 dark:hover:bg-meta-5 ${
                    pathname === '/admin/settings' && 'bg-meta-6 text-white'
                  }`}
                >
                  <Settings />
                  Configurações
                </Link>
              </li>
              <li>
                <button
                  className="group relative flex w-full items-center gap-2.5 rounded-sm px-4 py-2 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-meta-5 dark:hover:bg-meta-5"
                  onClick={() => signOut()}
                >
                  <LogOut />
                  Sair
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </aside>
  );
}
