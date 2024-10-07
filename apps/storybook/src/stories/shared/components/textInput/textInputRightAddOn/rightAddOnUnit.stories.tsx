import { RightAddOnUnit } from '@repo/shared/src/components/textInput/textInputRightAddOn';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/RightAddOn/RightAddOnUnit',
  component: RightAddOnUnit,
} as Meta;

const Template: StoryFn = () => <RightAddOnUnit />;

export const Default = Template.bind({});
