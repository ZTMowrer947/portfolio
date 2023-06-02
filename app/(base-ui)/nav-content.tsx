import LocalNavLink from '@/app/(base-ui)/local-nav-link';

export default function NavContent() {
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
        className="text-gray-400 hover:text-white md:mx-3"
      >
        GitHub
      </a>
    </>
  );
}
