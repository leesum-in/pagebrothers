import { Radio } from '@shared/components/radio';
import { Meta, StoryFn } from '@storybook/react';
import { useCallback, useEffect, useState } from 'react';

export default {
  title: 'Shared/Components/Radio',
  component: Radio,
  argTypes: {
    label: {
      control: { type: 'select', options: ['small', 'large', 'none'] },
      description: 'Label size: small, large, none',
    },
    selected: {
      control: 'boolean',
      description: 'Radio 버튼 선택 여부',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables radio button',
    },
    labelText: {
      control: 'text',
      description: 'Radio 설명 Text label',
    },
  },
} as Meta<typeof Radio>;

const Template: StoryFn<typeof Radio> = (args) => {
  const [isSelected, setIsSelected] = useState(args.selected);

  useEffect(() => {
    setIsSelected(args.selected);
  }, [args.selected]);

  const handleSelectedChange = useCallback(
    (value: boolean) => {
      setIsSelected(value);
      args.onChange?.(value);
    },
    [args],
  );

  return <Radio {...args} selected={isSelected} onChange={handleSelectedChange} />;
};

// Default Radio 스토리
export const Default = Template.bind({});
Default.args = {
  label: 'small',
  selected: false,
  disabled: false,
  labelText: '디폴트',
};

// Selected Radio 스토리
export const Selected = Template.bind({});
Selected.args = {
  label: 'small',
  selected: true,
  disabled: false,
  labelText: '선택됨',
};

// Disabled Radio 스토리
export const Disabled = Template.bind({});
Disabled.args = {
  label: 'small',
  selected: false,
  disabled: true,
  labelText: '비활성화됨',
};

// Selected & Disabled Radio 스토리
export const SelectedDisabled = Template.bind({});
SelectedDisabled.args = {
  label: 'small',
  selected: true,
  disabled: true,
  labelText: '선택됨 & 비활성화됨',
};
