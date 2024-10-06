import { Label } from '@repo/shared';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/Label',
  component: Label,
  argTypes: {
    label: { control: 'text' },
    helpText: { control: 'text' },
  },
} as Meta;

const Template: StoryFn<typeof Label> = (args) => <Label {...args} />;

export const Default = Template.bind({});

Default.args = {
  helpText: '(선택)',
  label: '레이블',
};
