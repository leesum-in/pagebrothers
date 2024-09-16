import { Button } from '@repo/shared';
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Button',
  component: Button,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    variants: { control: 'color' },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
  args: {
    variants: 'primary',
    label: '적용하기',
  },
};

export const Default: Story = {
  args: {
    variants: 'default',
    label: '미리보기',
  },
};

export const White: Story = {
  args: {
    variants: 'white',
    label: '미리보기',
  },
};

export const Dashed: Story = {
  args: {
    variants: 'dashed',
    label: '위젯 추가하기',
  },
};

export const TextPrimary: Story = {
  args: {
    variants: 'textPrimary',
    label: '편집',
  },
};

export const TextDefault: Story = {
  args: {
    variants: 'textDefault',
    label: '삭제',
  },
};
