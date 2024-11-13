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
  // plugins: ['import'],
  globals: {
    React: true,
    JSX: true,
    google: true,
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
    '@typescript-eslint/no-empty-function': 'off',
    'react/jsx-sort-props': 'off',
    '@typescript-eslint/consistent-type-definitions': 'off', // type과 interface 사용 강제하지 않음
    'no-console': 'off',
    '@typescript-eslint/no-misused-promises': 'off', // promise return void 강제하지 않음
    '@typescript-eslint/naming-convention': 'off', // 변수명 규칙 강제하지 않음
    'import/no-cycle': 'off', // 순환 참조 강제하지 않음
    'import/named': 'off', // uuid 사용 시 오류 발생
    '@typescript-eslint/explicit-function-return-type': 'off', // 함수 반환 타입 강제하지 않음
    'no-unused-vars': 'off', // 분명 변수 사용하고 있는데 오류 출력으로 off
    'jsx-a11y/label-has-associated-control': 'off', // label과 연동되는 컨트롤이 없어도 오류 출력으로 off
    'jsx-a11y/no-static-element-interactions': 'off', // 정적 요소에 이벤트 핸들러 사용 시 오류 출력으로 off
    'jsx-a11y/click-events-have-key-events': 'off', // 클릭 이벤트 핸들러 사용 시 오류 출력으로 off
    '@typescript-eslint/no-confusing-void-expression': 'off', // 혼란스러운 void 표현식 강제하지 않음
    'no-alert': 'off', // alert 사용 시 오류 출력으로 off
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
