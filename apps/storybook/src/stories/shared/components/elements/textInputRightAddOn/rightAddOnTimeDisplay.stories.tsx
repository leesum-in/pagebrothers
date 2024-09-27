import { RightAddOnTimeDisplay } from '@shared/components/elements/textInputRightAddOn';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/Elements/RightAddOn',
  component: RightAddOnTimeDisplay,
} as Meta;

const Template: StoryFn<typeof RightAddOnTimeDisplay> = (args) => (
  <RightAddOnTimeDisplay {...args} />
);

export const rightAddOnTimeDisplay = Template.bind({});
rightAddOnTimeDisplay.args = {};
