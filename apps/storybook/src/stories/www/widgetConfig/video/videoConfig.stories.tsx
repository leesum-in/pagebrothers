import { VideoWidgetConfigure } from '@/www/widgets/video';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'www/WidgetConfig/Video',
  component: VideoWidgetConfigure,
  // decorators: [
  //   (Story, { parameters }) => (
  //     <FormProvider>
  //       <Story />
  //     </FormProvider>
  //   ),
  // ],
  argTypes: {
    widgetItem: {
      control: 'object',
    },
  },
} as Meta<typeof VideoWidgetConfigure>;

const Template: StoryFn<typeof VideoWidgetConfigure> = (args) => <VideoWidgetConfigure {...args} />;

export const Default = Template.bind({});

Default.args = {
  widgetItem: {
    id: '01922814-4e02-0ae4-6113-2bd730c6dcdc',
    type: 'VIDEO',
    config: {
      url: 'https://www.youtube.com/watch?v=GJDdBbgJafU',
      aspectWidth: 16,
      aspectHeight: 9,
    },
  },
};
