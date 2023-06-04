'use client';

import Link, { LinkProps } from 'next/link';
import { usePathname } from 'next/navigation';
import { forwardRef, PropsWithChildren } from 'react';

interface PropTypes extends PropsWithChildren<LinkProps> {
  className?: string;
}

const LocalNavLink = forwardRef<HTMLAnchorElement, PropTypes>(
  function LocalNavLink(props, ref) {
    const { href, children, className, ...linkProps } = props;
    const pathname = usePathname();
    const isActive = pathname.startsWith(href.toString());
    const activeClass = isActive
      ? 'text-slate-800 dark:text-white'
      : 'hover:text-slate-800 text-gray-400 dark:hover:text-white';

    /* istanbul ignore next */
    const finalClassName = `${className ?? ''} ${activeClass}`;

    return (
      <Link href={href} className={finalClassName} ref={ref} {...linkProps}>
        {children}
      </Link>
    );
  }
);

export default LocalNavLink;
