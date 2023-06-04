import '../projects/styles.css';
import './header.css';

import type { Meta, StoryObj } from '@storybook/react';

import HeaderComponent from '@/app/(base-ui)/header';

const meta: Meta<typeof HeaderComponent> = {
  title: 'Base UI/Header',
  component: HeaderComponent,
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/',
      },
    },
  },
};

export default meta;

type Story = StoryObj<typeof HeaderComponent>;

export const Standard: Story = {};

export const OnProjectsPage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/projects',
      },
    },
  },
};

export const OnAboutPage: Story = {
  parameters: {
    nextjs: {
      navigation: {
        pathname: '/about',
      },
    },
  },
};
