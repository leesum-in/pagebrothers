import TextInput from '@shared/components/elements/textInput/TextInput';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Elements/TextInput',
  component: TextInput,
  argTypes: {
    error: { control: 'boolean' },
    errorText: { control: 'text' },
    disabled: { control: 'boolean' },
    icon: { control: 'boolean' },
    button: { control: 'boolean' },
    showLabel: { control: 'boolean' },
    label: { control: 'text' },
    buttonText: { control: 'text' },
    placeholder: { control: 'text' },
  },
} as Meta<typeof TextInput>;

const Template: StoryFn<typeof TextInput> = (args) => <TextInput {...args} />;

export const Default = Template.bind({});
Default.args = {
  label: '레이블',
  placeholder: '텍스트 인풋',
  showLabel: true,
};

// 에러
export const WithError = Template.bind({});
WithError.args = {
  label: '레이블',
  placeholder: '텍스트 인풋',
  showLabel: true,
  error: true,
  errorText: '피드백이나 부가 설명이 들어갑니다.',
};

// 비활성화
export const Disabled = Template.bind({});
Disabled.args = {
  label: '레이블',
  placeholder: '텍스트 인풋',
  showLabel: true,
  disabled: true,
};

// 아이콘 조절
export const WithIcon = Template.bind({});
WithIcon.args = {
  label: '레이블',
  placeholder: '텍스트 인풋',
  showLabel: true,
  icon: true,
};

// 버튼 조절
export const WithButton = Template.bind({});
WithButton.args = {
  label: '레이블',
  placeholder: '텍스트 인풋',
  showLabel: true,
  button: true,
  buttonText: '버튼',
};

export const AllFeatures = Template.bind({});
AllFeatures.args = {
  label: '레이블',
  placeholder: '텍스트 인풋',
  showLabel: true,
  error: true,
  disabled: false,
  icon: true,
  button: true,
  buttonText: '버튼',
};
