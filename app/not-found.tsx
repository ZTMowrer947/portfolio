import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="p-6">
      <h2 className="text-2xl">Well this is awkward...</h2>
      <p className="mb-2 text-center">
        It seems you&apos;ve opened a portal to an empty dimension.
      </p>
      <p className="flex justify-center">
        <Link
          href="/"
          className="border border-slate-600 dark:border-white rounded p-2 hover:text-black hover:border-black dark:hover:border-gray-400 dark:hover:text-gray-400"
        >
          Back to Reality
        </Link>
      </p>
    </main>
  );
}
