import { LeftAddOnHttpButton } from '@shared/components/elements/textInputLeftAddOn';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/Elements/LeftAddOn',
  component: LeftAddOnHttpButton,
} as Meta;

const Template: StoryFn<typeof LeftAddOnHttpButton> = (args) => <LeftAddOnHttpButton {...args} />;

export const leftAddOnHttpButton = Template.bind({});
leftAddOnHttpButton.args = {};
