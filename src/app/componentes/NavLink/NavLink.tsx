'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavLinkProps {
  href: string;
  children: string;
}

export default function NavLink({ href, children }: NavLinkProps) {
  const path = usePathname();
  const isActive = path.startsWith(href);

  return (
    <li
      className={`mx-4 mt-2 sm:mt-0 text-xl sm:text-base duration-500 ${
        isActive ? 'text-yellow-300' : 'hover:text-yellow-300'
      }`}
    >
      <Link href={href} className={isActive ? 'active' : ''}>
        {children}
      </Link>
    </li>
  );
}
