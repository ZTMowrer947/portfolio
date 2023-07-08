import './styles.css';

import type { Meta, StoryObj } from '@storybook/react';
import Chance from 'chance';

import ProjectList from '@/app/projects/list';
import { generateProjectList } from '@/stories/projects/utils';

const chance = new Chance("Despite everything, it's still you.");

const meta: Meta<typeof ProjectList> = {
  title: 'Projects/Project List',
  component: ProjectList,
};

export default meta;

type Story = StoryObj<typeof ProjectList>;

export const TenProjects: Story = {
  args: {
    projects: generateProjectList(chance),
  },
};

export const FiftyProjects: Story = {
  args: {
    projects: generateProjectList(chance, { num: 50 }),
  },
};
