import Chance from 'chance';

import { Project, ResponsiveImageData } from '@/app/projects/type';

// Option types
interface GenerateProjectOptions {
  withLiveLink: boolean | 'random';
  withSourceLink: boolean | 'random';
  numImages: number;
}

interface GenerateProjectListNumberOptions {
  standard: number;
  withLive: number;
  withSource: number;
  withLiveAndSource: number;
}

interface GenerateProjectListOptions {
  num: number | GenerateProjectListNumberOptions;
  imagesPerProject: number;
}

// Default options
const generateProjectDefaultOptions: GenerateProjectOptions = {
  withLiveLink: 'random',
  withSourceLink: 'random',
  numImages: 3,
};

const generateProjectListDefaultOptions: GenerateProjectListOptions = {
  num: {
    standard: 3,
    withLive: 2,
    withSource: 2,
    withLiveAndSource: 3,
  },
  imagesPerProject: 3,
};

// Utility functions
function generateProjectImage(chance: Chance.Chance): ResponsiveImageData {
  return {
    id: chance.guid(),
    altText: chance.string(),
    smallImg: {
      src: 'https://placehold.it/640x360',
      width: 640,
      height: 360,
    },
    medImg: {
      src: 'https://placehold.it/800x450',
      width: 800,
      height: 450,
    },
    largeImg: {
      src: 'https://placehold.it/1024x576',
      width: 1024,
      height: 576,
    },
    xlargeImg: {
      src: 'https://placehold.it/1280x720',
      width: 1280,
      height: 720,
    },
  };
}

export function generateProject(
  chance: Chance.Chance,
  options = generateProjectDefaultOptions
): Project {
  const hasLiveLink =
    typeof options.withLiveLink === 'boolean'
      ? options.withLiveLink
      : chance.bool();
  const hasSourceLink =
    typeof options.withSourceLink === 'boolean'
      ? options.withSourceLink
      : chance.bool();

  return {
    id: chance.guid(),
    title: chance.sentence({ words: 3 }).slice(0, -1),
    description: chance.paragraph(),
    tags: chance.n(chance.string, 5, { length: 5 }),
    images: chance.n(generateProjectImage, options.numImages, chance),
    sourceLink: hasSourceLink ? chance.url({ protocol: 'https' }) : undefined,
    liveLink: hasLiveLink ? chance.url({ protocol: 'https' }) : undefined,
  };
}

export function generateProjectList(
  chance: Chance.Chance,
  options = generateProjectListDefaultOptions
) {
  if (typeof options.num === 'number') {
    return chance.n(generateProject, options.num, chance);
  } else {
    // Partially applying project generator for chance.n
    const boundGenerateProject = (options?: GenerateProjectOptions) =>
      generateProject(chance, options);

    const baseProjectOptions: GenerateProjectOptions = {
      ...generateProjectDefaultOptions,
      withLiveLink: false,
      withSourceLink: false,
      numImages: options.imagesPerProject,
    };

    const standardProjects = chance.n(
      boundGenerateProject,
      options.num.standard,
      baseProjectOptions
    );
    const projectsWithSourceLink = chance.n(
      boundGenerateProject,
      options.num.withSource,
      {
        ...baseProjectOptions,
        withSourceLink: true,
      }
    );

    const projectsWithLiveLink = chance.n(
      boundGenerateProject,
      options.num.withLive,
      {
        ...baseProjectOptions,
        withLiveLink: true,
      }
    );

    const projectsWithBothLinks = chance.n(
      boundGenerateProject,
      options.num.withLiveAndSource,
      {
        ...baseProjectOptions,
        withSourceLink: true,
        withLiveLink: true,
      }
    );

    return chance.shuffle([
      ...standardProjects,
      ...projectsWithSourceLink,
      ...projectsWithLiveLink,
      ...projectsWithBothLinks,
    ]);
  }
}
