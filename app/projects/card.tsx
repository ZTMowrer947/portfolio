import Link from 'next/link';

import { Project } from '@/app/projects/type';
import ProjectImg from '@/app/projects/image';

export interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const firstImage = project.images[0];

  return (
    <article>
      <h1>{project.title}</h1>
      <div>
        <ProjectImg image={firstImage} />
        <Link href={`/projects/${project.id}`}>Details</Link>
        {project.sourceLink && (
          <a
            href={project.sourceLink}
            target="_blank"
            rel="noreferrer noopener"
          />
        )}
        {project.liveLink && (
          <a
            href={project.liveLink}
            target="_blank"
            rel="noreferrer noopener"
          />
        )}
      </div>
    </article>
  );
}
