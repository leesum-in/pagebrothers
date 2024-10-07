import { RightAddOnCalendarIcon } from '@repo/shared/src/components/textInput/textInputRightAddOn';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/RightAddOn/RightAddOnCalendarIcon',
  component: RightAddOnCalendarIcon,
} as Meta;

const Template: StoryFn = () => <RightAddOnCalendarIcon />;

export const Default = Template.bind({});
