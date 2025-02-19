import widget from '@/mocks/MockWidget';
import { VideoWidgetConfigure } from '@/www/widgets/video';
import { Modal } from '@shared/components';
import { QueryProvider } from '@shared/query';
import { WidgetItem } from '@shared/types';
import { Meta, StoryFn } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { WidgetModalFooter } from 'www';
import useModalStore from 'www/src/widgets/zustand';

// useModalStore.getState().setInvitation(invitation as IInvitation);
useModalStore.getState().openModal(widget as WidgetItem);
export default {
  title: 'www/WidgetConfig/Video',
  component: VideoWidgetConfigure,
  decorators: [
    (Story, { args }) => {
      const method = useForm();
      return (
        <QueryProvider>
          <FormProvider {...method}>
            <Modal
              isModalOpen={true}
              onCloseModal={() => {}}
              onSubmit={(e) => {
                e.preventDefault();
                console.log('submit'); // 예시로 찍어봄
              }}
              modalFooter={<WidgetModalFooter widgetItem={args.widgetItem as WidgetItem} />}
            >
              <Story />
            </Modal>
          </FormProvider>
        </QueryProvider>
      );
    },
  ],
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
