import './styles.css';

import type { Meta, StoryObj } from '@storybook/react';
import Chance from 'chance';

import ProjectCard from '@/app/projects/card';
import type { Project } from '@/app/projects/type';

// If you get the seed string's reference, you are cultured!
// In all seriousness, provides a static seed to ensure repeatable results
const chance = new Chance("NOW'S YOUR CHANCE TO BE A [[BIG SHOT!!!!]]");

const meta: Meta<typeof ProjectCard> = {
  title: 'Projects/Project Card',
  component: ProjectCard,
  decorators: [
    (Story) => (
      <main className="p-12 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3">
        <Story />
      </main>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProjectCard>;

const baseProject: Project = {
  id: chance.guid(),
  title: chance.sentence({ words: 3 }).slice(0, -1),
  description: chance.paragraph(),
  tags: chance.n(chance.string, 5, { length: 5 }),
  images: [
    {
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
    },
  ],
};

export const Standard: Story = {
  args: {
    project: baseProject,
  },
};

export const WithSourceLink: Story = {
  args: {
    project: {
      ...baseProject,
      sourceLink: chance.url({ protocol: 'https' }),
    },
  },
};

export const WithLiveLink: Story = {
  args: {
    project: {
      ...baseProject,
      liveLink: chance.url({ protocol: 'https' }),
    },
  },
};

export const WithLiveAndSourceLinks: Story = {
  args: {
    project: {
      ...baseProject,
      sourceLink: chance.url({ protocol: 'https' }),
      liveLink: chance.url({ protocol: 'https' }),
    },
  },
};
