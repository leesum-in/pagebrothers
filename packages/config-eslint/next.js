// const { resolve } = require('node:path');

// 프로젝트별 tsconfig.json 경로 명시적으로 설정
// const project = [
//   resolve(process.cwd(), 'apps/admin/tsconfig.json'),
//   resolve(process.cwd(), 'apps/invitation/tsconfig.json'),
//   resolve(process.cwd(), 'apps/storybook/tsconfig.json'),
//   resolve(process.cwd(), 'apps/www/tsconfig.json'),
// ];

// const project = resolve(process.cwd(), 'tsconfig.json');

/*
 * This is a custom ESLint configuration for use with
 * Next.js apps.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    ...[
      '@vercel/style-guide/eslint/node',
      '@vercel/style-guide/eslint/typescript',
      '@vercel/style-guide/eslint/browser',
      '@vercel/style-guide/eslint/react',
      '@vercel/style-guide/eslint/next',
    ].map(require.resolve),
    'turbo',
    'eslint:recommended',
    'plugin:import/typescript',
    'plugin:import/recommended',
    'plugin:prettier/recommended',
  ],
  // parserOptions: {
  //   project,
  // },
  plugins: ['import'],
  globals: {
    React: true,
    JSX: true,
  },
  // settings: {
  //   'import/resolver': {
  //     typescript: {
  //       project,
  //     },
  //     node: {
  //       extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx'],
  //     },
  //   },
  // },
  ignorePatterns: ['node_modules/', 'dist/'],
  // add rules configurations here
  rules: {
    'import/no-default-export': 'off',
    'unicorn/filename-case': 'off',
    // 'import/order': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        groups: [
          'builtin', // Node.js 내장 모듈
          'external', // npm 외부 모듈 (react 등)
          'internal', // 프로젝트 내부 모듈 (@/contexts 등)
          ['sibling', 'parent'], // 상대 경로 모듈
          'index', // index 파일
        ],
        alphabetize: {
          order: 'asc', // 알파벳 순서로 정렬
          caseInsensitive: true, // 대소문자 구분 없음
        },
      },
    ],
  },
};
