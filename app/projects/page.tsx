import { getProjects } from '@/app/projects/api';
import ProjectList from '@/app/projects/list';

export default async function Projects() {
  const projects = await getProjects();

  return <ProjectList projects={projects} />;
}
