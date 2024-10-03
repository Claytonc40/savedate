'use client';

import { getSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FiSettings } from 'react-icons/fi';
import { LuLogOut } from 'react-icons/lu';
import { RiAdminFill, RiArrowDownWideLine } from 'react-icons/ri';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const trigger = useRef<HTMLAnchorElement>(null);
  const dropdown = useRef<HTMLDivElement>(null);
  const [session, setSession] = useState<any>(null);

  useEffect(() => {
    // Fetch session on the client side
    const loadSession = async () => {
      const session = await getSession();
      setSession(session);
    };

    loadSession();
  }, []);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current || !trigger.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      ) {
        return;
      }
      setDropdownOpen(false);
    };

    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [dropdownOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  }, [dropdownOpen]);

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4 px-1 py-2 hover:text-boxdark dark:hover:text-white lg:gap-3.5 lg:text-base"
        href="#"
      >
        <span className="hidden text-right lg:block">{session?.user?.name}</span>
        <span className="h-12 w-12 rounded-full">
          {session?.user?.image ? (
            <Image
              className="rounded-full border border-boxdark hover:border-4"
              width={40}
              height={40}
              src={session?.user?.image}
              alt={'User Avatar'}
            />
          ) : (
            <Image
              className="rounded-full border-boxdark hover:border-4"
              width={40}
              height={40}
              src={'/images/user/user-01.png'}
              alt={'User Avatar'}
            />
          )}
        </span>
        <RiArrowDownWideLine width={50} height={50} />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          {session?.user?.role === 'admin' && (
            <li>
              <Link
                href="/admin"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <RiAdminFill />
                Admin
              </Link>
            </li>
          )}
          <li>
            <Link
              href="/dashboard/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-meta-2 lg:text-base"
            >
              <CgProfile />
              Meu Perfil
            </Link>
          </li>
          <li>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-meta-2 lg:text-base"
            >
              <FiSettings />
              Configuração
            </Link>
          </li>
        </ul>
        <button
          className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-meta-2 lg:text-base"
          onClick={() => signOut()}
        >
          <LuLogOut />
          Sair
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
