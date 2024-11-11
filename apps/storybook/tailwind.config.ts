import sharedConfig from '@repo/tailwind-config';
import type { Config } from 'tailwindcss';

const config: Pick<Config, 'content' | 'presets'> = {
  presets: [sharedConfig],
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/shared/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../apps/www/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../apps/www/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
};

export default config;
