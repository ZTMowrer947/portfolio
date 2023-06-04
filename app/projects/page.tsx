import Chance from 'chance';

import ProjectList from '@/app/projects/list';
import { Project, ResponsiveImageData } from '@/app/projects/type';

function generateProjectImage(chance: Chance.Chance): ResponsiveImageData {
  return {
    id: chance.guid(),
    altText: chance.sentence(),
    smallImg: {
      src: 'https://placehold.it/640x360',
      width: 640,
    },
    medImg: {
      src: 'https://placehold.it/800x450',
      width: 800,
    },
    largeImg: {
      src: 'https://placehold.it/1024x576',
      width: 1024,
    },
    xlargeImg: {
      src: 'https://placehold.it/1280x720',
      width: 1280,
    },
  };
}

function generateProject(chance: Chance.Chance): Project {
  return {
    id: chance.guid(),
    title: chance.string({ length: 10, alpha: true }),
    description: chance.paragraph(),
    liveLink: chance.bool() ? chance.url({ protocol: 'https' }) : undefined,
    sourceLink: chance.bool() ? chance.url({ protocol: 'https' }) : undefined,
    tags: chance.unique(chance.string, 5, { alpha: true, length: 5 }),
    images: chance.n(generateProjectImage, 3, chance),
  };
}

export default function Projects() {
  const chance = new Chance();
  const projects = chance.n(generateProject, 10, chance);

  return <ProjectList projects={projects} />;
}
