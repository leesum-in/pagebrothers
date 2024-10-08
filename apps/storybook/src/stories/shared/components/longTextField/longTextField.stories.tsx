import { LongTextField } from '@repo/shared';
import { useArgs } from '@storybook/addons';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/LongTextField',
  component: LongTextField,
  argTypes: {
    status: {
      control: {
        type: 'select',
        options: ['default', 'hover', 'focused', 'completed', 'error', 'disabled'],
      },
      description: 'Textarea 상태: default, hover, focused, completed, error, disabled',
    },
    label: {
      control: 'boolean',
      description: '레이블 표시 여부',
    },
    description: {
      control: 'boolean',
      description: 'Textarea 아래에 표시될 설명 표시 여부',
    },
    labelText: {
      control: 'text',
      description: '레이블 텍스트',
    },
    placeholder: {
      control: 'text',
      description: 'Textarea에 표시할 placeholder',
    },
    descriptionText: {
      control: 'text',
      description: 'Textarea 아래에 표시될 설명 텍스트',
    },
  },
} as Meta<typeof LongTextField>;

const Template: StoryFn<typeof LongTextField> = (args) => {
  const [{ value }, setValue] = useArgs();

  const handleValueChange = (newValue: string) => {
    setValue({ value: newValue });
  };

  return <LongTextField {...args} value={value} onChange={handleValueChange} />;
};

// Default 스토리
export const Default = Template.bind({});
Default.args = {
  status: 'default',
  label: true,
  description: true,
  labelText: '디폴트',
  placeholder: '기본 Placeholder',
  descriptionText: '이것은 기본 설명입니다.',
  value: '',
};

// Hover 스토리
export const Hover = Template.bind({});
Hover.args = {
  status: 'hover',
  label: true,
  description: true,
  labelText: '호버 상태',
  placeholder: '호버 상태 Placeholder',
  descriptionText: '호버 상태 설명입니다.',
  value: '',
};

// Focused 스토리
export const Focused = Template.bind({});
Focused.args = {
  status: 'focused',
  label: true,
  description: true,
  labelText: '포커스됨',
  placeholder: '포커스됨 Placeholder',
  descriptionText: '포커스된 상태 설명입니다.',
  value: '',
};

// Completed 스토리
export const Completed = Template.bind({});
Completed.args = {
  status: 'completed',
  label: true,
  description: true,
  labelText: '완료됨',
  placeholder: '완료됨 Placeholder',
  descriptionText: '완료된 상태 설명입니다.',
  value: '',
};

// Error 스토리
export const Error = Template.bind({});
Error.args = {
  status: 'error',
  label: true,
  description: true,
  labelText: '오류',
  placeholder: '오류 Placeholder',
  descriptionText: '오류 설명입니다.',
  value: '',
};

// Disabled 스토리
export const Disabled = Template.bind({});
Disabled.args = {
  status: 'disabled',
  label: true,
  description: true,
  labelText: '비활성화됨',
  placeholder: '비활성화됨 Placeholder',
  descriptionText: '비활성화된 상태 설명입니다.',
  value: '',
};
