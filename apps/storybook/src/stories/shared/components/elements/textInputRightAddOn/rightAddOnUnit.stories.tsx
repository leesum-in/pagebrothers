import { RightAddOnUnit } from '@shared/components/elements/textInputRightAddOn';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/Elements/RightAddOn',
  component: RightAddOnUnit,
} as Meta;

const Template: StoryFn<typeof RightAddOnUnit> = (args) => <RightAddOnUnit {...args} />;

export const rightAddOnUnit = Template.bind({});
rightAddOnUnit.args = {};
