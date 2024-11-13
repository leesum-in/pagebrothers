import invitation from '@/mocks/MockInvitation';
import widget from '@/mocks/MockWidget';
import { Modal } from '@shared/components';
import { QueryProvider } from '@shared/query';
import { IInvitation, WidgetItem } from '@shared/types';
import { Meta, StoryFn } from '@storybook/react';
import { FormProvider, useForm } from 'react-hook-form';
import { IntroWidgetConfigure, WidgetModalFooter } from 'www';
import useModalStore from 'www/src/widgets/zustand';

useModalStore.getState().setInvitation(invitation as IInvitation);
useModalStore.getState().openModal(widget as WidgetItem);
export default {
  title: 'www/WidgetConfig/Intro',
  component: IntroWidgetConfigure,
  decorators: [
    (Story, { args }) => {
      console.log(args);
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
} as Meta<typeof IntroWidgetConfigure>;

const Template: StoryFn<typeof IntroWidgetConfigure> = (args) => <IntroWidgetConfigure {...args} />;

export const Default = Template.bind({});

Default.args = {
  widgetItem: {
    id: '0192f4c1-06e7-febe-0b8a-5b21d7252f3f',
    type: 'INTRO',
    config: {
      align: 'LEFT',
      title: '신랑 오은333, 신부 은오222',
      subTitle: '222wedding day222',
      layoutKey: 'IMAGE_ROUND_FRAME',
      coverImage: {
        id: '0192f4bc-1bb2-adc5-5d49-37e64d58ab3c',
        url: 'https://yy-static.pagesisters.cc/invitations/0192f4af-3602-04c4-9888-2bba5a4be126/0192f4bc-1bb2-adc5-5d49-37e64d58ab3c',
        dimensions: {
          width: 1280,
          height: 832,
        },
      },
      dateFormatKey: 'KO',
      customTextColor: '',
      showEventInformation: true,
    },
  },
};
