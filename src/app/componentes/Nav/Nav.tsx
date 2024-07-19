import Link from 'next/link';
import Image from 'next/image';
import NavLink from '../NavLink/NavLink';
import NavList from './NavList';

export default function Nav() {
  return (
    <nav className='flex justify-center bg-red-600'>
      <div className='flex justify-between items-center mx-10 sm:mx-20 w-full max-w-screen-xl bg-red-600	'>
        <header>
          <Link href='/'>
            <Image
              src='/pokemon-logo.png'
              className='my-6'
              alt='Title of Pokemon series'
              width={104}
              height={78}
            />
          </Link>
        </header>
        <NavList />
        {/* <ul className='px-10 pt-10 sm:px-0 h-screen w-screen sm:h-fit absolute top-20 right-full sm:top-0 sm:right-0 sm:relative flex flex-col sm:flex-row bg-red-600 sm:bg-transparent text-white duration-500'>
          <NavLink href='/'>Pokedex</NavLink>
          <NavLink href='/favourites'>Ulubione</NavLink>
        </ul>
        <div className='relative flex justify-center flex-col h-5 w-7 sm:hidden cursor-pointer'>
          <span className='absolute top-1/2	left-1/2 -translate-y-1/2 -translate-x-1/2 w-0.5 h-7 rotate-45	bg-white origin-center'></span>
          <span className='hidden absolute top-1/2	left-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-0.5 bg-white origin-center'></span>
          <span className='absolute top-1/2	left-1/2 -translate-y-1/2 -translate-x-1/2 w-0.5 h-7 -rotate-45 bg-white origin-center'></span>
        </div> */}
      </div>
    </nav>
  );
}
