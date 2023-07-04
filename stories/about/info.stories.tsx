import '@/stories/projects/styles.css';

import type { Meta, StoryObj } from '@storybook/react';
import Chance from 'chance';

const chance = new Chance('One does not simply walk into Mordor.');

import InfoDisplay from '@/app/about/info';

const meta: Meta<typeof InfoDisplay> = {
  title: 'About Page/Information Display',
  component: InfoDisplay,
};

export default meta;

type Story = StoryObj<typeof InfoDisplay>;

function generateLink(chance: Chance.Chance) {
  return {
    label: chance.string(),
    url: chance.url(),
  };
}

export const InformationDisplay: Story = {
  args: {
    info: {
      name: chance.name(),
      bio: chance.paragraph(),
      profileImageUrl: {
        src: 'https://placehold.co/500x500',
        width: 500,
        height: 500,
        id: 'placeholder',
        altText: 'placeholder portrait image',
      },
      externalLinks: chance.n(generateLink, 3, chance),
    },
  },
};
