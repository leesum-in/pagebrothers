import { Description } from '@repo/shared';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/Elements',
  component: Description,
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: ['error', 'success', 'normal'],
      },
      description: 'description 상태: error, success, normal',
    },
  },
} as Meta;

const Template: StoryFn<typeof Description> = (args) => <Description {...args} />;

export const Default = Template.bind({});

Default.args = {
  description: '피드백이나 부가 설명이 들어갑니다.',
  state: 'normal',
};

export const Error = Template.bind({});
Error.args = {
  description: '피드백이나 부가 설명이 들어갑니다.',
  state: 'error',
};

export const Success = Template.bind({});
Success.args = {
  description: '피드백이나 부가 설명이 들어갑니다.',
  state: 'success',
};
