'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { href: '/', label: 'Home' },
    { href: '/meetings', label: 'All Meetings' },
    { href: '/meetings/current', label: 'Current Meeting' }
  ];

  return (
    <nav className="bg-gray-200 p-4">
      <ul className="flex gap-4 max-w-6xl mx-auto">
        {links.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`px-3 py-2 rounded ${
                pathname === link.href
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-300'
              }`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}