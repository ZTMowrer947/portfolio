import ProjectCard from '@/app/projects/card';
import type { ProjectPreview } from '@/app/projects/type';

interface ProjectListProps {
  /**
   * The array of projects to display.
   */
  projects: ProjectPreview[];
}

export default function ProjectList({ projects }: ProjectListProps) {
  const cards = projects.map((project) => (
    <ProjectCard project={project} key={project.id} />
  ));

  return (
    <main className="p-12 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
      {cards}
    </main>
  );
}
