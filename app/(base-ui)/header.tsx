import Link from 'next/link';

export default function Header() {
  return (
    <header className="mx-auto px-12 py-4 bg-slate-800">
      <nav className="flex justify-between">
        <Link href="/projects">Zack Mowrer</Link>
      </nav>
    </header>
  );
}
