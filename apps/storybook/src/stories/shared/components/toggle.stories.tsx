import { Toggle } from '@shared/components/toggle';
import { useArgs } from '@storybook/addons';
import { Meta, StoryFn } from '@storybook/react';

export default {
  title: 'Shared/Components/Toggle',
  component: Toggle,
  argTypes: {
    label: {
      control: { type: 'select', options: ['left', 'right', 'none'] },
      description: 'Label 위치: left, right 또는 none',
    },
    toggleOn: {
      control: 'boolean',
      description: 'Toggle이 켜져있는지 여부',
    },
    disabled: {
      control: 'boolean',
      description: '비활성화 여부',
    },
    labelText: {
      control: 'text',
      description: '레이블 텍스트',
    },
  },
} as Meta<typeof Toggle>;

const Template: StoryFn<typeof Toggle> = (args) => {
  const [{ toggleOn, ...restArgs }, setToggleOn] = useArgs();

  const handleToggleChange = (value: boolean) => {
    setToggleOn({ toggleOn: value });
    restArgs.onChange?.(value);
  };

  return <Toggle {...restArgs} toggleOn={toggleOn} onChange={handleToggleChange} />;
};

// Default Toggle 스토리
export const Default = Template.bind({});
Default.args = {
  label: 'left',
  toggleOn: false,
  disabled: false,
  labelText: '디폴트',
};

// Toggle On 스토리
export const ToggleOn = Template.bind({});
ToggleOn.args = {
  label: 'left',
  toggleOn: true,
  disabled: false,
  labelText: '켜짐',
};

// Disabled Toggle 스토리
export const Disabled = Template.bind({});
Disabled.args = {
  label: 'left',
  toggleOn: false,
  disabled: true,
  labelText: '비활성화됨',
};

// Toggle On & Disabled 스토리
export const ToggleOnDisabled = Template.bind({});
ToggleOnDisabled.args = {
  label: 'left',
  toggleOn: true,
  disabled: true,
  labelText: '켜짐 & 비활성화됨',
};
