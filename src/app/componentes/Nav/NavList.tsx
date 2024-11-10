'use client';

import { useEffect, useState } from 'react';
import NavLink from '../NavLink/NavLink';
import { usePathname, useRouter } from 'next/navigation';
import { handleLogOut } from '@/app/lib/authentication';

export default function NavList() {
  const [isOpen, setIsOpen] = useState(false);
  const [showLogOut, setShowLogOut] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname.includes('signIn') || pathname.includes('signUp'))
      setShowLogOut(false);
    else setShowLogOut(true);
  }, [pathname]);

  const handleLogingOut = async () => {
    const res = await handleLogOut();
    if (res) router.push('/signIn');
  };

  return (
    <>
      <div className='flex items-center'>
        <ul
          className={`px-10 sm:px-0 sm:pt-0 h-screen w-screen sm:h-fit sm:w-fit absolute top-20 sm:top-0 sm:left-0 sm:relative flex flex-col sm:flex-row bg-red-600 sm:bg-transparent text-white ease-in-out transition-transform duration-500 sm:duration-0	${
            isOpen ? 'left-0' : 'left-full'
          }`}
        >
          <NavLink href='/'>Pokedex</NavLink>
          <NavLink href='/favourites'>Ulubione</NavLink>
        </ul>
        {showLogOut && (
          <button
            className='w-32 h-9 mx-auto px-6 py-2 bg-yellow-200 text-slate-950 font-semibold rounded-lg'
            onClick={handleLogingOut}
          >
            Log Out
          </button>
        )}
      </div>
      <div
        className='relative flex justify-center flex-col h-5 w-7 sm:hidden cursor-pointer'
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`absolute  left-1/2 -translate-y-1/2 -translate-x-1/2  bg-white origin-center rounded-sm ${
            isOpen ? 'top-1/2 rotate-45 w-0.5 h-7' : 'top-0 w-7 h-0.5'
          }`}
        ></span>
        <span
          className={`absolute top-1/2	left-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-0.5 bg-white origin-center rounded-sm ${
            isOpen ? 'hidden' : 'top-2 w-7 h-0.5'
          }`}
        ></span>
        <span
          className={`absolute 	left-1/2 -translate-y-1/2 -translate-x-1/2 bg-white origin-center rounded-sm ${
            isOpen ? 'top-1/2 -rotate-45 w-0.5 h-7' : 'top-4 w-7 h-0.5'
          }`}
        ></span>
      </div>
    </>
  );
}
