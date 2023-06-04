import Chance from 'chance';

import ProjectList from '@/app/projects/list';
import { generateProjectList } from '@/stories/projects/utils';

export default function Projects() {
  const chance = new Chance();
  const projects = generateProjectList(chance);

  return <ProjectList projects={projects} />;
}
