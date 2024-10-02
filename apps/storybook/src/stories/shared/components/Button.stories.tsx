import { Button } from '@repo/shared';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/Button',
  component: Button,
  argTypes: {
    children: {
      control: 'text',
      description: '버튼 내부에 들어갈 text 및 아이콘',
    },
    variants: {
      control: {
        type: 'select',
        options: [
          'fill_primary',
          'fill_secondary',
          'fill_white',
          'ghost',
          'text_primary',
          'text_secondary',
        ],
      },
      description: '버튼 Style',
    },
    size: {
      control: {
        type: 'select',
        options: ['small', 'medium', 'large'],
      },
      description: '버튼 Size',
    },
    addition: {
      control: 'text',
      description: '버튼 추가적인 Style 지정 가능 속성',
    },
    disabled: {
      control: 'boolean',
      description: '버튼 disabled 여부 지정',
    },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => {
  return (
    <>
      <Button {...args}>{args.children}</Button>
    </>
  );
};

export const Fill_primary = Template.bind({});
Fill_primary.args = {
  variants: 'fill_primary',
  children: '적용하기',
  disabled: false,
  size: 'medium',
};

export const Fill_secondary = Template.bind({});
Fill_secondary.args = {
  variants: 'fill_secondary',
  children: '미리보기',
  disabled: false,
  size: 'small',
};

export const Fill_white = Template.bind({});
Fill_white.args = {
  variants: 'fill_white',
  children: '삭제',
  disabled: false,
  size: 'large',
};

export const Ghost = Template.bind({});
Ghost.args = {
  variants: 'ghost',
  children: '추가하기 +',
  disabled: false,
  size: 'medium',
  className: 'w-[414px]',
};

export const Text_primary = Template.bind({});
Text_primary.args = {
  variants: 'text_primary',
  children: '편집',
  disabled: false,
  size: 'medium',
};

export const Text_secondary = Template.bind({});
Text_secondary.args = {
  variants: 'text_secondary',
  children: '메뉴',
  disabled: false,
  size: 'medium',
};
