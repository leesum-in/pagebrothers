import Modal from '@shared/components/modals/Modal';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/Modals',
  component: Modal, //연결할 컴포넌트
} as Meta;

const Template: StoryFn = () => <Modal />;

export const Default = Template.bind({});
