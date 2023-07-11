import type { StorybookConfig } from '@storybook/nextjs';
import { resolve } from 'path';
const config: StorybookConfig = {
  stories: ['../stories/**/*.mdx', '../stories/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/addon-styling',
    '@storybook/addon-coverage',
    '@storybook/addon-mdx-gfm',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {},
  },
  docs: {
    autodocs: 'tag',
  },
  async webpackFinal(config) {
    config.resolve.alias['@'] = resolve(__dirname, '..');

    config.module.rules = config.module.rules.map((rule) => {
      if (rule === '...' || !rule.test) return rule;

      if (/svg/.test(rule.test.toString())) {
        return {
          ...rule,
          exclude: /\.svg$/i,
        };
      }

      return rule;
    });

    config.module.rules.unshift({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};
export default config;
