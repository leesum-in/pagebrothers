import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

type FontStyleValue = [string, { lineHeight: string; letterSpacing: string; fontWeight: string }];

// We want each package to be responsible for its own content.
const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'var(--font-pretendard)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          "'Segoe UI'",
          'Roboto',
          "'Helvetica Neue'",
          'Arial',
          "'Noto Sans'",
          'sans-serif',
          "'Apple Color Emoji'",
          "'Segoe UI Emoji'",
          "'Segoe UI Symbol'",
          "'Noto Color Emoji'",
        ],
        serif: [
          'var(--font-gowunBatang)',
          'var(--font-notoSerifKr)',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          "'Segoe UI'",
          'Roboto',
          "'Helvetica Neue'",
          'Arial',
          "'Noto Sans'",
          'sans-serif',
          "'Apple Color Emoji'",
          "'Segoe UI Emoji'",
          "'Segoe UI Symbol'",
          "'Noto Color Emoji'",
        ],
        noto: [
          'var(--font-notoSerifKr)',
          'serif',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          "'Segoe UI'",
          'Roboto',
          "'Helvetica Neue'",
          'Arial',
          "'Noto Sans'",
          'sans-serif',
          "'Apple Color Emoji'",
          "'Segoe UI Emoji'",
          "'Segoe UI Symbol'",
          "'Noto Color Emoji'",
        ],
      },
      fontWeight: {
        thin: '100',
        extralight: '200',
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
        black: '900',
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
        // ??????? 이건 왜 다르죠??
        xl: ['1.25rem', { lineHeight: '1.6' }],
        sm: ['.875rem', { lineHeight: '1.6' }],
      },
      backgroundImage: {
        gradient: 'linear-gradient(90deg, #4338CA 0%, #EF4444 100%)',
        'gradient-white-bot2top':
          'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #FFFFFF 100%)',
        'gradient-slate-bot2top':
          'linear-gradient(180deg, rgba(248, 250, 252, 0) 0%, #F8FAFC 100%)',
      },
      backgroundColor: {
        'theme-black': 'rgb(15,23,42)',
      },
      screens: {
        desktop: '820px',
      },
      maxWidth: {
        sm: '24rem',
      },
    },
    'no-interaction': {
      pointerEvents: 'none',
      touchAction: 'none',
      webkitUserSelect: 'none',
      mozUserSelect: 'none',
      userSelect: 'none',
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
      const customUtilities: Record<string, Record<string, string>> = {
        '.text-em-xs': {
          fontSize: '.75em',
          lineHeight: '1.6',
        },
        '.text-em-xl': {
          fontSize: '1.25em',
          lineHeight: '1.6',
        },
        '.center-flex': {
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        },
        '.no-interaction': {
          'pointer-events': 'none',
          'touch-action': 'none',
          '-webkit-user-select': 'none',
          '-moz-user-select': 'none',
          '-ms-user-select': 'none',
          'user-select': 'none',
        },
      };
      addUtilities(fontUtilities);
      addUtilities(customUtilities);
    }),
  ],
};
export default config;
