import Chance from 'chance';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import ProjectImage from '@/app/projects/image';
import { generateProject } from '@/stories/projects/utils';

interface ProjectDetailProps {
  params: {
    id: string;
  };
}

export default function ProjectDetail({ params }: ProjectDetailProps) {
  const chance = new Chance(params.id);
  const project = generateProject(chance);

  return (
    <main className="p-12">
      <header className="flex justify-start align-center mb-2">
        <h1 className="me-2 text-4xl">{project.title}</h1>

        <nav className="flex justify-start items-center">
          <Link
            href="/projects"
            className="me-2 border rounded p-1 dark:hover:text-slate-300 dark:hover:border-slate-300"
          >
            &lt; Back
          </Link>
          {project.sourceLink && (
            <a
              href={project.sourceLink}
              rel="noreferrer noopener"
              target="_blank"
              className="me-2 border rounded p-1 dark:hover:text-slate-300 dark:hover:border-slate-300"
            >
              Source Code
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              rel="noreferrer noopener"
              target="_blank"
              className="border rounded p-1 dark:hover:text-slate-300 dark:hover:border-slate-300"
            >
              Live Demo
            </a>
          )}
        </nav>
      </header>

      <article className="grid md:max-xl:grid-cols-3 grid-cols-4 grid-flow-row">
        <section className="col-span-4 md:col-span-2 xl:col-span-3 md:me-2">
          <ProjectImage image={project.images[0]} />
        </section>
        <aside className="order-last md:order-none text-center col-start-2 col-end-4 sm:col-span-1">
          <h3 className="text-xl">Tags</h3>
          <ul className="border-t">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </aside>

        <section className="col-span-4 sm:max-xl:col-span-3">
          <ReactMarkdown>{project.description}</ReactMarkdown>
        </section>
      </article>
    </main>
  );
}
