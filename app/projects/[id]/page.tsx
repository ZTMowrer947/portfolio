import { draftMode } from 'next/headers';

import { getProject } from '@/app/(contentful)/api';
import ProjectInfo from '@/app/projects/[id]/info';

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
