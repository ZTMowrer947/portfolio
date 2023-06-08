import '../styles.css';

import { expect } from '@storybook/jest';
import type { Meta, StoryObj } from '@storybook/react';
import { within } from '@storybook/testing-library';
import Chance from 'chance';

import ProjectImageGallery from '@/app/projects/[id]/image-gallery';

const chance = new Chance("NOW'S YOUR CHANCE TO BE A [[BIG SHOT!!!!]]");

const meta: Meta<typeof ProjectImageGallery> = {
  title: 'Projects/By Id/Image Gallery',
  component: ProjectImageGallery,
  decorators: [
    (Story) => (
      <div className="container grid grid-cols-4">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof ProjectImageGallery>;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(() => resolve(null), ms));
}

const presentMs = 2500;
const delayMs = presentMs + 200;

export const ImageGallery: Story = {
  args: {
    images: Array.from({ length: 3 }, (_, index) => {
      const colorString = chance.string({
        length: 6,
        pool: '0123456789ABCDEF',
      });
      const textString = chance.string({ length: 3, pool: '0123456789ABCDEF' });

      return {
        id: chance.guid(),
        altText: chance.string(),
        width: 1280,
        height: 720,
        src: `https://placehold.co/1280x720/${colorString}/${textString}`,
      };
    }),
    presentMs,
  },
  async play({ canvasElement, step }) {
    const canvas = within(canvasElement);

    const images = await canvas.getAllByRole<HTMLImageElement>('img');

    await step('Sanity check for images', async () => {
      expect(images).toHaveLength(3);
      images.forEach((img) => expect(img).toBeInTheDocument());
    });

    await step('First image is active', async () => {
      expect(images[0]).toHaveClass('opacity-100');
      images.slice(1).forEach((img) => expect(img).toHaveClass('opacity-0'));
    });

    await sleep(delayMs);

    await step('Second image is active', async () => {
      expect(images[1]).toHaveClass('opacity-100');
      images
        .filter((_, idx) => idx !== 1)
        .forEach((img) => expect(img).toHaveClass('opacity-0'));
    });

    await sleep(delayMs);

    await step('Third image is active', async () => {
      expect(images[2]).toHaveClass('opacity-100');
      images.slice(0, 2).forEach((img) => expect(img).toHaveClass('opacity-0'));
    });

    await sleep(delayMs);

    await step('First image is active again', async () => {
      expect(images[0]).toHaveClass('opacity-100');
      images.slice(1).forEach((img) => expect(img).toHaveClass('opacity-0'));
    });
  },
};
