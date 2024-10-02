import { RightAddOnUnit } from '@repo/shared/src/components/textInput/textInputRightAddOn';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/Elements/RightAddOn',
  component: RightAddOnUnit,
} as Meta;

const Template: StoryFn<typeof RightAddOnUnit> = (args) => <RightAddOnUnit />;

export const rightAddOnUnit = Template.bind({});
rightAddOnUnit.args = {};
