import './styles.css';

import type { Meta, StoryObj } from '@storybook/react';
import Chance from 'chance';

import ProjectCard from '@/app/projects/card';
import { generateProjectPreview } from '@/stories/projects/utils';

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

export const Standard: Story = {
  args: {
    project: generateProjectPreview(chance, {
      withLiveLink: false,
      withSourceLink: false,
    }),
  },
};

export const WithSourceLink: Story = {
  args: {
    project: generateProjectPreview(chance, {
      withLiveLink: false,
      withSourceLink: true,
    }),
  },
};

export const WithLiveLink: Story = {
  args: {
    project: generateProjectPreview(chance, {
      withLiveLink: true,
      withSourceLink: false,
    }),
  },
};

export const WithLiveAndSourceLinks: Story = {
  args: {
    project: generateProjectPreview(chance, {
      withLiveLink: true,
      withSourceLink: true,
    }),
  },
};
