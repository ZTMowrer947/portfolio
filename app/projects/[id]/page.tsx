import Chance from 'chance';

import ProjectInfo from '@/app/projects/[id]/info';
import { generateProject } from '@/stories/projects/utils';

interface ProjectDetailProps {
  params: {
    id: string;
  };
}

export default function ProjectDetail({ params }: ProjectDetailProps) {
  const chance = new Chance(params.id);
  const project = generateProject(chance);

  return <ProjectInfo project={project} />;
}
