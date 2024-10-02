import { RightAddOnButton } from '@shared/components/elements/textInputRightAddOn';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/Elements/RightAddOn',
  component: RightAddOnButton,
} as Meta;

const Template: StoryFn<typeof RightAddOnButton> = (args) => <RightAddOnButton />;

export const rightAddOnButton = Template.bind({});
rightAddOnButton.args = {};
