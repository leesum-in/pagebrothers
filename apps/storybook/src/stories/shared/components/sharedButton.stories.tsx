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
        options: ['primary', 'default', 'white', 'dashed', 'textPrimary', 'textDefault'],
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

export const Primary = Template.bind({});
Primary.args = {
  variants: 'primary',
  children: '적용하기',
  disabled: false,
  size: 'medium',
};

export const Default = Template.bind({});
Default.args = {
  variants: 'default',
  children: '미리보기',
  disabled: false,
  size: 'small',
};

export const White = Template.bind({});
White.args = {
  variants: 'white',
  children: '삭제',
  disabled: false,
  size: 'large',
};

export const Dashed = Template.bind({});
Dashed.args = {
  variants: 'dashed',
  children: '추가하기 +',
  disabled: false,
  size: 'medium',
  addition: 'w-[414px]',
};

export const TextPrimary = Template.bind({});
TextPrimary.args = {
  variants: 'textPrimary',
  children: '편집',
  disabled: false,
  size: 'medium',
};

export const TextDefault = Template.bind({});
TextDefault.args = {
  variants: 'textDefault',
  children: '메뉴',
  disabled: false,
  size: 'medium',
};
