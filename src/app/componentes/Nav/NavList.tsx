'use client';

import { useState } from 'react';
import NavLink from '../NavLink/NavLink';

export default function NavList() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <ul
        className={`px-10 pt-10 sm:px-0 sm:pt-0 h-screen w-screen sm:h-fit sm:w-fit absolute top-20 sm:top-0 sm:left-0 sm:relative flex flex-col sm:flex-row bg-red-600 sm:bg-transparent text-white ease-in-out transition-transform duration-500 sm:duration-0	${
          isOpen ? 'left-0' : 'left-full'
        }`}
      >
        <NavLink href='/'>Pokedex</NavLink>
        <NavLink href='/favourites'>Ulubione</NavLink>
      </ul>
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
