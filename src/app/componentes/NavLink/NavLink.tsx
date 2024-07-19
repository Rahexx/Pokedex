'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: string;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const path = usePathname();

  return (
    <li className='mx-4'>
      <Link href={href} className={path.startsWith(href) ? 'active' : ''}>
        {children}
      </Link>
    </li>
  );
}
