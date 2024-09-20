import { RightAddOnArrowIcon } from '@shared/components/elements/textInputRightAddOn';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/Elements/RightAddOn',
  component: RightAddOnArrowIcon,
} as Meta;

const Template: StoryFn<typeof RightAddOnArrowIcon> = (args) => <RightAddOnArrowIcon {...args} />;

export const rightAddOnArrowIcon = Template.bind({});
rightAddOnArrowIcon.args = {};
