import { LeftAddOnSearchIcon } from '@shared/components';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/Elements/LeftAddOn',
  component: LeftAddOnSearchIcon,
} as Meta;

const Template: StoryFn = () => <LeftAddOnSearchIcon />;

export const leftAddOnSearchIcon = Template.bind({});
