import { Checkbox } from '@shared/components/checkbox';
import { useArgs } from '@storybook/addons';
import { Meta, StoryFn } from '@storybook/react';
import { useCallback } from 'react';

export default {
  title: 'Shared/Components/Checkbox',
  component: Checkbox,
  argTypes: {
    label: {
      control: { type: 'select', options: ['small', 'large', 'none'] },
      description: 'Label size: small, large, none',
    },
    checked: {
      control: 'boolean',
      description: 'Checkbox 체크 여부',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables checkbox',
    },
    labelText: {
      control: 'text',
      description: 'Checkbox 설명 Text label',
    },
  },
} as Meta<typeof Checkbox>;

const Template: StoryFn<typeof Checkbox> = (args) => {
  const [{ checked }, setChecked] = useArgs();

  const handleCheckChange = useCallback(
    (isChecked: boolean) => {
      setChecked({ checked: isChecked });
      args.onChange?.(isChecked);
    },
    [args, setChecked],
  );

  return <Checkbox {...args} checked={checked} onChange={handleCheckChange} />;
};

// Default Checkbox 스토리
export const Default = Template.bind({});
Default.args = {
  label: 'small',
  checked: false,
  disabled: false,
  labelText: '디폴트',
};

// Checked Checkbox 스토리
export const Checked = Template.bind({});
Checked.args = {
  label: 'small',
  checked: true,
  disabled: false,
  labelText: '체크됨',
};

// Disabled Checkbox 스토리
export const Disabled = Template.bind({});
Disabled.args = {
  label: 'small',
  checked: false,
  disabled: true,
  labelText: '비활성화',
};

// Checked & Disabled Checkbox 스토리
export const CheckedDisabled = Template.bind({});
CheckedDisabled.args = {
  label: 'small',
  checked: true,
  disabled: true,
  labelText: '체크 & 비활성화됨',
};
