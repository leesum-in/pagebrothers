import { ElementDescription } from '@shared/components/elements';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/Elements',
  component: ElementDescription,
} as Meta;

const Template: StoryFn<typeof ElementDescription> = (args) => <ElementDescription {...args} />;

export const elementDescription = Template.bind({});
elementDescription.args = {
  text: '피드백이나 부가 설명이 들어갑니다.',
};
