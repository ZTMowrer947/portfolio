'use client';

import { useState } from 'react';
import NavContent from '@/app/(base-ui)/nav-content';

export default function NavContainer() {
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
        <NavContent />
      </div>
    </>
  );
}
