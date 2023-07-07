import { draftMode } from 'next/headers';

import ProjectInfo from '@/app/projects/[id]/info';
import { getProject } from '@/app/projects/api';

interface ProjectDetailProps {
  params: {
    id: string;
  };
}

export default async function ProjectDetail({ params }: ProjectDetailProps) {
  const { isEnabled } = draftMode();
  const project = await getProject(params.id, isEnabled);

  return <ProjectInfo project={project} />;
}
