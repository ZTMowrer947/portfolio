import '../projects/styles.css';
import './header.css';

import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { userEvent, within } from '@storybook/testing-library';

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
  async play({ canvasElement }) {
    const canvas = within(canvasElement);

    const collapseToggleBtn = canvas.getByRole<HTMLButtonElement>('button', {
      hidden: true,
    });
    const collapsibleNav = canvas.getByTestId('nav-collapse');

    // Collapsible nav should start out hidden on smaller devices
    expect(collapsibleNav).toHaveClass('hidden');

    // Clicking the toggle button should unhide the nav
    await userEvent.click(collapseToggleBtn);
    expect(collapsibleNav).not.toHaveClass('hidden');

    // Clicking the button again should hide the nav again
    await userEvent.click(collapseToggleBtn);
    expect(collapsibleNav).toHaveClass('hidden');
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
