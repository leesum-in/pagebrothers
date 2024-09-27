import { ElementLabel } from '@shared/components/elements';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/Elements',
  component: ElementLabel,
} as Meta;

const Template: StoryFn<typeof ElementLabel> = (args) => <ElementLabel {...args} />;

export const elementLabel = Template.bind({});
elementLabel.args = {
  text: '레이블',
};
