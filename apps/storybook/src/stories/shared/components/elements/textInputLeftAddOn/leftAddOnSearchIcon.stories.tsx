import { LeftAddOnSearchIcon } from '@shared/components/elements/textInputLeftAddOn';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/Elements/LeftAddOn',
  component: LeftAddOnSearchIcon,
} as Meta;

const Template: StoryFn<typeof LeftAddOnSearchIcon> = (args) => <LeftAddOnSearchIcon {...args} />;

export const leftAddOnSearchIcon = Template.bind({});
leftAddOnSearchIcon.args = {};
