import { RightAddOnArrowIcon } from '@repo/shared/src/components/textInput/textInputRightAddOn';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/RightAddOn/RightAddOnArrowIcon',
  component: RightAddOnArrowIcon,
} as Meta;

const Template: StoryFn = () => <RightAddOnArrowIcon />;

export const Default = Template.bind({});
