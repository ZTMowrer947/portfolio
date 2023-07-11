import './projects/styles.css';

import type { Meta, StoryObj } from '@storybook/react';

import NotFoundComponent from '../app/not-found';

const meta: Meta<typeof NotFoundComponent> = {
  component: NotFoundComponent,
  title: 'Not Found Page',
};
export default meta;

type Story = StoryObj<typeof NotFoundComponent>;

export const NotFoundPage: Story = {};
