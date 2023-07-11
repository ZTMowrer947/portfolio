'use client';

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function ErrorBoundary({ reset }: ErrorProps) {
  return (
    <main className="p-6">
      <h2 className="text-2xl">Something went wrong...</h2>
      <p className="mb-2 text-center">
        Well, something seems to have broken down on our end.
      </p>
      <p className="flex justify-center">
        <button
          className="border border-slate-600 dark:border-white rounded p-2 hover:text-black hover:border-black dark:hover:border-gray-400 dark:hover:text-gray-400"
          onClick={() => reset()}
        >
          Try that again
        </button>
      </p>
    </main>
  );
}
