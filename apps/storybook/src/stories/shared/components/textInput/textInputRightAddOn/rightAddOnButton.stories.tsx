import { RightAddOnButton } from '@repo/shared/src/components/textInput/textInputRightAddOn';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/RightAddOn/RightAddOnButton',
  component: RightAddOnButton,
} as Meta;

const Template: StoryFn = () => <RightAddOnButton />;

export const Default = Template.bind({});
