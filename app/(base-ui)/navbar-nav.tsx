'use client';

import { useState } from 'react';

import CollapsibleNav from '@/app/(base-ui)/collapsible-nav';

export default function NavbarNav() {
  const [isCollapsed, setCollapsed] = useState(true);

  const handleToggle = () => setCollapsed((prevCollapsed) => !prevCollapsed);

  return (
    <>
      {/* TODO: Replace toggle button text with "hamburger" icon */}
      <button
        onClick={handleToggle}
        className="md:hidden self-start rounded border-2 p-2"
      >
        Toggle
      </button>
      <div
        className={`flex flex-1 flex-col items-start md:items-center md:flex-row justify-start ${
          isCollapsed ? 'hidden md:block' : ''
        }`}
      >
        <CollapsibleNav />
      </div>
    </>
  );
}
