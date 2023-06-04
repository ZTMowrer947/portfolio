import LocalNavLink from '@/app/(base-ui)/local-nav-link';

export default function CollapsibleNav() {
  return (
    <>
      <LocalNavLink href="/projects" className="md:mx-3">
        My Projects
      </LocalNavLink>
      <LocalNavLink href="/about" className="md:mx-3">
        About Me
      </LocalNavLink>

      {/* TODO: Replace text for the following external with image icons */}
      <a
        href="https://github.com/ZTMowrer947"
        rel="noreferrer noopener"
        target="_blank"
        className="hover:text-slate-800 text-gray-400 dark:hover:text-white md:mx-3"
      >
        GitHub
      </a>
    </>
  );
}
