import TextInput from '@repo/shared/src/components/textInput/TextInput';
import { Meta, StoryFn } from '@storybook/react';
import { HttpButtonAddOn, SearchIconAddOn } from './leftAddOn.stories';
import { ArrowIconAddOn, ButtonAddOn, CalendarIconAddOn } from './rightAddOn.stories';

export default {
  title: 'Shared/Components/TextInput',
  component: TextInput,
  argTypes: {
    description: { control: 'boolean' },
    descriptionText: { control: 'text' },
    disabled: { control: 'boolean' },
    label: { control: 'boolean' },
    labelText: { control: 'text' },
    placeholder: { control: 'text' },
    leftAddOn: {
      control: { type: 'select' },
      options: ['None', 'SearchIconAddOn', 'HttpButtonAddOn'],
      mapping: {
        None: null,
        SearchIconAddOn: <SearchIconAddOn />,
        HttpButtonAddOn: <HttpButtonAddOn />,
        // 새로운 옵션은 아래에 이어서 추가해주세요.
      },
    },
    rightAddOn: {
      control: { type: 'select' },
      options: ['None', 'ButtonAddOn', 'ArrowIconAddOn', 'CalendarIconAddOn'],
      mapping: {
        None: null,
        ButtonAddOn: <ButtonAddOn />,
        ArrowIconAddOn: <ArrowIconAddOn />,
        CalendarIconAddOn: <CalendarIconAddOn />,
        // 새로운 옵션은 아래에 이어서 추가해주세요.
      },
    },
  },
} as Meta<typeof TextInput>;

const Template: StoryFn<typeof TextInput> = (args) => <TextInput {...args} />;

// 기본
export const Default = Template.bind({});
Default.args = {
  labelText: '레이블',
  placeholder: '텍스트 인풋',
  label: true,
  leftAddOn: 'None',
  rightAddOn: 'None',
};

// 에러
export const WithDescription = Template.bind({});
WithDescription.args = {
  labelText: '레이블',
  placeholder: '텍스트 인풋',
  label: true,
  description: true,
  descriptionText: '피드백이나 부가 설명이 들어갑니다.',
};

// 비활성화
export const Disabled = Template.bind({});
Disabled.args = {
  labelText: '레이블',
  placeholder: '텍스트 인풋',
  label: true,
  disabled: true,
};
