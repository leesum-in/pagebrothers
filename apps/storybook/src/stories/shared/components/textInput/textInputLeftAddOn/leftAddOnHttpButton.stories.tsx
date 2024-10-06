import { LeftAddOnHttpButton } from '@shared/components';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/LeftAddOn/LeftAddOnHttpButton',
  component: LeftAddOnHttpButton,
} as Meta;

const Template: StoryFn = () => <LeftAddOnHttpButton />;
export const Default = Template.bind({});
