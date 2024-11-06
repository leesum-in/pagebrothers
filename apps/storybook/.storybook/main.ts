import type { StorybookConfig } from '@storybook/nextjs';

import { dirname, join, resolve } from 'path';

/**
 * This function is used to resolve the absolute path of a package.
 * It is needed in projects that use Yarn PnP or are set up within a monorepo.
 */
function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-onboarding'),
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-essentials'),
    getAbsolutePath('@chromatic-com/storybook'),
    getAbsolutePath('@storybook/addon-interactions'),
  ],
  framework: {
    name: getAbsolutePath('@storybook/nextjs'),
    options: {},
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    if (config.module?.rules) {
      config.module.rules = config.module.rules.map((rule) => {
        if (
          rule !== null &&
          typeof rule === 'object' &&
          'test' in rule &&
          rule.test instanceof RegExp &&
          rule.test.test('.svg')
        ) {
          return { ...rule, exclude: /\.svg$/ };
        }
        return rule;
      });
    }
    config.module?.rules?.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@shared': resolve(__dirname, '../../packages/shared/src'),
        '@/www': resolve(__dirname, '../../apps/www/src'),
        '@/auth': resolve(__dirname, '../../apps/www/src/auth'),
        '@/ui': resolve(__dirname, '../../apps/www/src/ui'),
        '@/widgets': resolve(__dirname, '../../apps/www/src/widgets'),
        '@/utils': resolve(__dirname, '../../apps/www/src/utils'),
      };
    }
    return config;
  },
};
export default config;
