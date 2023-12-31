import './globals.css';

import { Inter } from 'next/font/google';

import Header from '@/app/(base-ui)/header';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    template: '%s | Portfolio',
    default: 'Portfolio',
  },
  description: "Zack Mowrer's Portfolio site",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} min-h-screen dark:text-white text-slate-600 dark:bg-slate-600`}
      >
        <Header />
        {children}
      </body>
    </html>
  );
}
