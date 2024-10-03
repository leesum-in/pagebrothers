import { RightAddOnCalendarIcon } from '@repo/shared/src/components/textInput/textInputRightAddOn';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/Elements/RightAddOn',
  component: RightAddOnCalendarIcon,
} as Meta;

const Template: StoryFn<typeof RightAddOnCalendarIcon> = (args) => <RightAddOnCalendarIcon />;

export const rightAddOnCalendarIcon = Template.bind({});
rightAddOnCalendarIcon.args = {};
