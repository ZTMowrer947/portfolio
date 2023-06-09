import '../styles.css';

import type { Meta, StoryObj } from '@storybook/react';
import Chance from 'chance';

import ProjectInfo from '@/app/projects/[id]/info';
import { generateProject } from '@/stories/projects/utils';

const chance = new Chance("NOW'S YOUR CHANCE TO BE A [[BIG SHOT!!!!]]");

const meta: Meta<typeof ProjectInfo> = {
  title: 'Projects/By ID/Detailed Info',
  component: ProjectInfo,
};

export default meta;

type Story = StoryObj<typeof ProjectInfo>;

export const Standard: Story = {
  args: {
    project: generateProject(chance, {
      numImages: 3,
      withLiveLink: false,
      withSourceLink: false,
    }),
  },
};

export const WithSourceLink: Story = {
  args: {
    project: generateProject(chance, {
      numImages: 3,
      withLiveLink: false,
      withSourceLink: true,
    }),
  },
};

export const WithLiveLink: Story = {
  args: {
    project: generateProject(chance, {
      numImages: 3,
      withLiveLink: true,
      withSourceLink: false,
    }),
  },
};

export const WithLiveAndSourceLinks: Story = {
  args: {
    project: generateProject(chance, {
      numImages: 3,
      withLiveLink: true,
      withSourceLink: true,
    }),
  },
};
