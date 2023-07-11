import './projects/styles.css';

import type { Meta, StoryObj } from '@storybook/react';

import ErrorComponent from '../app/error';

const meta: Meta<typeof ErrorComponent> = {
  component: ErrorComponent,
  title: 'Error Page',
};
export default meta;

type Story = StoryObj<typeof ErrorComponent>;

export const ErrorPage: Story = {
  args: {
    error: new Error(),
    reset() {},
  },
};
