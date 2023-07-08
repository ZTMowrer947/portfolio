import { Metadata } from 'next';

import { getProjects } from '@/app/(contentful)/api';
import ProjectList from '@/app/projects/list';

export default async function Projects() {
  const projects = await getProjects();

  return <ProjectList projects={projects} />;
}

export const metadata: Metadata = {
  title: 'Projects',
};
