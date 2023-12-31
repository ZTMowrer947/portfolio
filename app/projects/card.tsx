import Image from 'next/image';
import Link from 'next/link';

import type { ProjectPreview } from '@/app/projects/type';

export interface ProjectCardProps {
  /**
   * The project to display on the card.
   */
  project: ProjectPreview;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const firstImage = project.previewImage;

  const hasSourceLink = !!project.sourceLink;
  const hasLiveLink = !!project.liveLink;

  let btnClasses =
    'text-center my-2 text-indigo-700 dark:text-gray-400 hover:text-indigo-900 dark:hover:text-white ';

  if (hasLiveLink && hasSourceLink)
    btnClasses += 'col-span-2 border-x border-indigo-900 dark:border-white';
  else if (hasLiveLink || hasSourceLink)
    btnClasses += 'col-span-3 border-x border-indigo-900 dark:border-white';
  else btnClasses += 'col-span-4 col-start-2';

  const sizes = '(min-width: 1536px) 33vw, (min-width: 768px) 50vw, 100vw';

  return (
    <article className="m-2 border-2 border-indigo-900 dark:border-white rounded flex flex-col align-center uppercase">
      <div className="relative object-contain aspect-video">
        <Image
          src={firstImage.src}
          alt={'Thumbnail for project'}
          fill
          sizes={sizes}
        />
      </div>
      <h1 className="text-center text-lg font-bold">{project.title}</h1>
      <div className="grid grid-cols-6 border-t border-indigo-900 dark:border-white">
        <Link href={`/projects/${project.id}`} className={btnClasses}>
          Details
        </Link>
        {project.sourceLink && (
          <a
            href={project.sourceLink}
            target="_blank"
            rel="noreferrer noopener"
            className={btnClasses}
          >
            Source Code
          </a>
        )}
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer noopener"
            className={btnClasses}
          >
            Live Demo
          </a>
        )}
      </div>
    </article>
  );
}
