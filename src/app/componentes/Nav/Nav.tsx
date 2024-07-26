import Link from 'next/link';
import Image from 'next/image';
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
      </div>
    </nav>
  );
}
