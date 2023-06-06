import ProjectInfo from '@/app/projects/[id]/info';
import { getProject } from '@/app/projects/api';

interface ProjectDetailProps {
  params: {
    id: string;
  };
}

export default async function ProjectDetail({ params }: ProjectDetailProps) {
  const project = await getProject(params.id);

  return <ProjectInfo project={project} />;
}
