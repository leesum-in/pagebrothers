// const { resolve } = require('node:path');

// const project = resolve(process.cwd(), 'packages/shared/tsconfig.json');

/*
 * This is a custom ESLint configuration for use a library
 * that utilizes React.
 *
 * This config extends the Vercel Engineering Style Guide.
 * For more information, see https://github.com/vercel/style-guide
 *
 */

module.exports = {
  extends: [
    '@vercel/style-guide/eslint/browser',
    '@vercel/style-guide/eslint/typescript',
    '@vercel/style-guide/eslint/react',
  ].map(require.resolve),
  // parserOptions: {
  //   project,
  // },
  globals: {
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
  ignorePatterns: ['node_modules/', 'dist/', '.eslintrc.js', '**/*.css'],
  // add rules configurations here
  rules: {
    'import/no-default-export': 'off',
    'unicorn/filename-case': 'off', // 파일 이름 규칙 끄기
    'react/jsx-sort-props': 'off', // 컴포넌트 props 정렬 끄기
    '@typescript-eslint/explicit-function-return-type': 'off', // 함수 반환 타입 끄기
    '@typescript-eslint/prefer-string-starts-ends-with': 'off', // 문자열 startsWith, endsWith 로 바꾸라는 경고 끄기
  },
  overrides: [
    {
      files: ['*.config.js'],
      env: {
        node: true,
      },
    },
  ],
};
