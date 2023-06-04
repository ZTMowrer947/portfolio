import Link from 'next/link';

import NavbarNav from '@/app/(base-ui)/navbar-nav';

export default function Header() {
  return (
    <header className="mx-auto px-12 py-4 bg-slate-200 dark:bg-slate-800 border-b border-slate-800 dark:border-b-0">
      <nav className="flex flex-col md:flex-row justify-between">
        <Link
          href="/projects"
          className="md:mr-3 self-center text-slate-800 dark:text-white"
        >
          Zack Mowrer
        </Link>

        <NavbarNav />
      </nav>
    </header>
  );
}
