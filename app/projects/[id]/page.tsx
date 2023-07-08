import { Metadata } from 'next';
import { draftMode } from 'next/headers';
import { notFound } from 'next/navigation';

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

  if (!project) notFound();

  return <ProjectInfo project={project} />;
}

export async function generateMetadata({
  params,
}: ProjectDetailProps): Promise<Metadata> {
  const { isEnabled } = draftMode();
  const project = await getProject(params.id, isEnabled);

  return {
    title: project?.title ?? 'Nonexistent Project',
  };
}
