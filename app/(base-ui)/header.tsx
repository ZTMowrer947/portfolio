import Link from 'next/link';
import LocalNavLink from '@/app/(base-ui)/local-nav-link';
import NavContainer from '@/app/(base-ui)/nav-container';

export default function Header() {
  return (
    <header className="mx-auto px-12 py-4 bg-slate-800">
      <nav className="flex flex-col md:flex-row justify-between">
        <Link href="/projects" className="md:mr-3 self-center">
          Zack Mowrer
        </Link>

        <NavContainer />
      </nav>
    </header>
  );
}
