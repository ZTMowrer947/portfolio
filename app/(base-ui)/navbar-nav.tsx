'use client';

import { useState } from 'react';

import CollapsibleNav from '@/app/(base-ui)/collapsible-nav';

import Navburger from './navburger.svg';

export default function NavbarNav() {
  const [isCollapsed, setCollapsed] = useState(true);

  const handleToggle = () => setCollapsed((prevCollapsed) => !prevCollapsed);

  console.log(Navburger);

  return (
    <>
      <button
        onClick={handleToggle}
        className="md:hidden self-start rounded border-2 border-slate-600 dark:border-white hover:border-black hover:text-black dark:hover:border-gray-400 dark:hover:text-gray-400 p-2"
        aria-label="Toggle"
      >
        <Navburger
          aria-label="Toggle icon"
          className="fill-slate-600 dark:fill-white hover:fill-black dark:hover:fill-gray-400"
        />
      </button>
      <div
        className={`flex flex-1 flex-col items-start md:items-center md:flex-row justify-start ${
          isCollapsed ? 'hidden md:block' : ''
        }`}
        data-testid="nav-collapse"
      >
        <CollapsibleNav />
      </div>
    </>
  );
}
