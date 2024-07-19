import Link from 'next/link';
import Image from 'next/image';
import NavLink from '../NavLink/NavLink';

export default function Nav() {
  return (
    <nav className='flex justify-center bg-red-600'>
      <div className='flex justify-between sm:mx-20 w-full max-w-screen-xl bg-red-600	'>
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
        <ul className='flex justify-evenly items-center text-white'>
          <NavLink href='/'>Pokedex</NavLink>
          <NavLink href='/favourites'>Ulubione</NavLink>
        </ul>
      </div>
    </nav>
  );
}
