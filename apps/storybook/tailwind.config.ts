import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

type FontStyleValue = [string, { lineHeight: string; letterSpacing: string; fontWeight: string }];

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/shared/src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      fontFamily: {
        sans: ['Pretendard'],
      },
      fontSize: {
        // Head styles
        // h - 1.5
        h1x: ['48px', { lineHeight: '65.28px', letterSpacing: '-0.03em', fontWeight: '900' }],
        h2x: ['42px', { lineHeight: '60.48px', letterSpacing: '-0.03em', fontWeight: '900' }],
        h3x: ['36px', { lineHeight: '51.84px', letterSpacing: '-0.03em', fontWeight: '900' }],
        // h - black
        h1b: ['32px', { lineHeight: '43.52px', letterSpacing: '-0.02em', fontWeight: '900' }],
        h2b: ['28px', { lineHeight: '40.32px', letterSpacing: '-0.02em', fontWeight: '900' }],
        h3b: ['24px', { lineHeight: '34.56px', letterSpacing: '-0.02em', fontWeight: '900' }],
        // h - extra bold
        h4b: ['20px', { lineHeight: '32px', letterSpacing: '-0.02em', fontWeight: '800' }],
        h5b: ['18px', { lineHeight: '28.8px', letterSpacing: '-0.02em', fontWeight: '800' }],
        // h - regular
        h1: ['32px', { lineHeight: '43.52px', letterSpacing: '-0.02em', fontWeight: '400' }],
        h2: ['28px', { lineHeight: '40.32px', letterSpacing: '-0.02em', fontWeight: '400' }],
        h3: ['24px', { lineHeight: '34.56px', letterSpacing: '-0.02em', fontWeight: '400' }],
        h4: ['20px', { lineHeight: '32px', letterSpacing: '-0.02em', fontWeight: '400' }],
        h5: ['18px', { lineHeight: '28.8px', letterSpacing: '-0.02em', fontWeight: '400' }],
        // paragraph styles
        // p - bold
        p1b: ['16px', { lineHeight: '25.6px', letterSpacing: '-0.02em', fontWeight: '700' }],
        p2b: ['14px', { lineHeight: '22.4px', letterSpacing: '-0.02em', fontWeight: '700' }],
        // p - regular
        p1: ['16px', { lineHeight: '25.6px', letterSpacing: '-0.02em', fontWeight: '400' }],
        p2: ['14px', { lineHeight: '22.4px', letterSpacing: '-0.02em', fontWeight: '400' }],
        // Caption styles
        // c - bold
        cb: ['12px', { lineHeight: '19.2px', letterSpacing: '-0.02em', fontWeight: '700' }],
        cbe: ['12px', { lineHeight: '19.2px', letterSpacing: '0.04em', fontWeight: '700' }],
        // c - regular
        c: ['12px', { lineHeight: '19.2px', letterSpacing: '-0.02em', fontWeight: '400' }],
        ce: ['12px', { lineHeight: '19.2px', letterSpacing: '0.04em', fontWeight: '400' }],
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, theme }) {
      const fontStyles = theme('fontSize') as Record<string, FontStyleValue>;
      const fontUtilities: Record<string, Record<string, string>> = {};
      Object.entries(fontStyles).forEach(([key, value]) => {
        if (Array.isArray(value) && value.length === 2 && typeof value[1] === 'object') {
          const [fontSize, styles] = value;
          fontUtilities[`.text-${key}`] = {
            fontSize,
            lineHeight: styles.lineHeight,
            letterSpacing: styles.letterSpacing,
            fontWeight: styles.fontWeight,
          };
        }
      });
      addUtilities(fontUtilities);
    }),
  ],
};
export default config;
