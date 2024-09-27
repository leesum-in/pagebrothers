// tailwind config is required for editor support

import sharedConfig from '@repo/tailwind-config';
import type { Config } from 'tailwindcss';

const config: Pick<Config, 'content' | 'presets'> = {
  content: [
    // app content
    'app/**/*.{js,ts,jsx,tsx}',
    `src/**/*.{js,ts,jsx,tsx}`,
    // include packages if not transpiling
    '../../packages/shared/*.{js,ts,jsx,tsx}',
  ],
  presets: [sharedConfig],
};

export default config;
