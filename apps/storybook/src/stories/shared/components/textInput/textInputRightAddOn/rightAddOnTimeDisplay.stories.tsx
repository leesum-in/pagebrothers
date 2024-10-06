import { RightAddOnTimeDisplay } from '@repo/shared/src/components/textInput/textInputRightAddOn';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/RightAddOn/RightAddOnTimeDisplay',
  component: RightAddOnTimeDisplay,
} as Meta;

const Template: StoryFn = () => <RightAddOnTimeDisplay />;

export const Default = Template.bind({});
