import { RightAddOnCalendarIcon } from '@shared/components/elements/textInputRightAddOn';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/Elements/RightAddOn',
  component: RightAddOnCalendarIcon,
} as Meta;

const Template: StoryFn<typeof RightAddOnCalendarIcon> = (args) => (
  <RightAddOnCalendarIcon {...args} />
);

export const rightAddOnCalendarIcon = Template.bind({});
rightAddOnCalendarIcon.args = {};
