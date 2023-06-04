import Chance from 'chance';

import ProjectCard from '@/app/projects/card';
import { Project, ProjectImage } from '@/app/projects/type';

function generateProjectImage(chance: Chance.Chance): ProjectImage {
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

  const cards = projects.map((project) => (
    <ProjectCard project={project} key={project.id} />
  ));

  return (
    <main className="p-12 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
      {cards}
    </main>
  );
}
