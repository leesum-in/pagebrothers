import { RadioGroup } from '@headlessui/react';
import { useState } from 'react';

// 라벨별 스타일
const getRadioStateStyles = (label: 'small' | 'large' | 'none') => {
  switch (label) {
    case 'small':
      return 'w-[1.125rem] h-[1.125rem] p-[0.28125rem] gap-0 rounded-full border-[0.1rem] border-slate-100';
    case 'large':
      return 'w-[1.25rem] h-[1.25rem] p-[0.3125rem] gap-0 rounded-full border-[0.1rem] border-slate-100';
    case 'none':
    default:
      return 'w-[1.5rem] h-[1.5rem] p-[0.375rem] gap-0 rounded-full border-[0.1rem] border-slate-100';
  }
};

// 라벨별 텍스트 스타일
const getTextStyle = (label: 'small' | 'large' | 'none') => {
  switch (label) {
    case 'small':
      return 'text-[0.875rem] font-normal leading-[1.4rem] tracking-[-0.04em] text-justify';
    case 'large':
      return 'text-[1rem] font-normal leading-[1.6rem] tracking-[-0.04em] text-justify';
    case 'none':
    default:
      return 'hidden';
  }
};

// 선택된 상태에서 라디오 버튼 안의 작은 원의 스타일
const getSelectedCircleStyle = (label: 'small' | 'large' | 'none') => {
  switch (label) {
    case 'small':
      return 'w-[0.5625rem] h-[0.5625rem] rounded-full';
    case 'large':
      return 'w-[0.625rem] h-[0.625rem] rounded-full';
    case 'none':
    default:
      return 'w-[0.75rem] h-[0.75rem] rounded-full';
  }
};

interface RadioProps {
  label: 'small' | 'large' | 'none';
  selected?: boolean;
  disabled?: boolean;
  labelText?: string;
}

const Radio = ({ label, selected = false, disabled = false, labelText = '' }: RadioProps) => {
  const [selectedOption, setSelectedOption] = useState(selected);

  const radioStateStyles = getRadioStateStyles(label);
  const textStyle = getTextStyle(label);
  const selectedCircleStyle = getSelectedCircleStyle(label);
  const labelOpacity = disabled ? 'opacity-50' : '';

  return (
    <RadioGroup value={selectedOption} onChange={setSelectedOption} disabled={disabled}>
      <div className="flex items-center">
        <RadioGroup.Option
          value={true}
          className={`relative flex items-center justify-center ${radioStateStyles} ${
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          }`}
        >
          {({ checked }) => (
            <>
              {/* 선택된 경우 작은 원 표시 */}
              {checked && (
                <div
                  className={`absolute ${selectedCircleStyle} ${
                    disabled ? 'bg-slate-200' : 'bg-indigo-500'
                  }`}
                  style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  }}
                />
              )}
            </>
          )}
        </RadioGroup.Option>
        <RadioGroup.Label
          as="span"
          className={`ml-[0.5rem] text-slate-600 ${textStyle} ${labelOpacity}`}
        >
          {labelText}
        </RadioGroup.Label>
      </div>
    </RadioGroup>
  );
};

export default Radio;
