import Link from 'next/link';
import LocalNavLink from '@/app/(base-ui)/local-nav-link';

export default function Header() {
  return (
    <header className="mx-auto px-12 py-4 bg-slate-800">
      <nav className="flex justify-between">
        <Link href="/projects">Zack Mowrer</Link>
        <LocalNavLink href="/projects">My Projects</LocalNavLink>
        <LocalNavLink href="/about">About Me</LocalNavLink>

        {/* TODO: Replace text for the following external with image icons */}
        <a
          href="https://github.com/ZTMowrer947"
          rel="noreferrer noopener"
          target="_blank"
          className="text-gray-400 hover:text-white"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
