import { Video } from '@shared/components';
import { Meta, StoryFn } from '@storybook/react';
import { WidgetWrapper } from '@/www/widgets/components';

export default {
  title: 'Shared/Components/Widgets/Video',
  component: Video,
  decorators: [
    (Story) => (
      <WidgetWrapper>
        <Story />
      </WidgetWrapper>
    ),
  ],
  argTypes: {
    videoWidgetConfig: {
      url: { control: 'text' },
      aspectWidth: { control: 'number' },
      aspectHeight: { control: 'number' },
    },
  },
} as Meta<typeof Video>;

const Template: StoryFn<typeof Video> = (args) => <Video {...args} />;

export const Default = Template.bind({});
Default.args = {
  videoWidgetConfig: {
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    aspectWidth: 16,
    aspectHeight: 9,
  },
};
