import { getProjects } from '@/app/(contentful)/api';
import ProjectList from '@/app/projects/list';

export default async function Projects() {
  const projects = await getProjects();

  return <ProjectList projects={projects} />;
}
