import { Checkbox as HeadlessUiCheckbox } from '@headlessui/react';

interface CheckboxProps {
  label: 'small' | 'large' | 'none';
  checked: boolean;
  disabled?: boolean;
  labelText?: string;
  onChange: (checked: boolean) => void; // 부모로부터 반드시 전달받는 함수
}

// default, disabled, checked & disabled 상태별 스타일
const getCheckboxStateStyles = (checked: boolean, disabled: boolean) => {
  if (disabled) {
    return checked ? 'bg-indigo-100 border-none' : 'bg-slate-50 border-[0.1rem] border-slate-100';
  }
  return checked ? 'bg-indigo-500 border-none' : 'border-[0.1rem] border-slate-200';
};

// 사이즈별 체크박스 스타일
const getCheckboxSizeStyles = (label: CheckboxProps['label']) => {
  switch (label) {
    case 'small':
      return 'w-[1.125rem] h-[1.125rem] border-[0.1rem] rounded-[0.25rem] gap-0';
    case 'large':
      return 'w-[1.25rem] h-[1.25rem] border-[0.1rem] rounded-[0.25rem] gap-0';
    case 'none':
    default:
      return 'w-[1.5rem] h-[1.5rem] border-[0.1rem] rounded-[0.25rem] gap-0';
  }
};

// 사이즈별 텍스트 스타일
const getLabelSizeStyles = (label: CheckboxProps['label']) => {
  switch (label) {
    case 'small':
      return 'text-[0.875rem] font-normal leading-[1.4rem] tracking-[-0.02em] text-justify';
    case 'large':
      return 'text-[1rem] font-normal leading-[1.6rem] tracking-[-0.02em] text-justify';
    case 'none':
    default:
      return 'hidden';
  }
};

const Checkbox = ({
  label,
  checked,
  disabled = false,
  labelText = '',
  onChange,
}: CheckboxProps) => {
  return (
    <div className="flex items-center">
      <HeadlessUiCheckbox
        checked={checked}
        onChange={(value) => onChange(value)}
        disabled={disabled}
        className={`group block ${getCheckboxSizeStyles(label)} ${getCheckboxStateStyles(checked, disabled)} ${
          disabled ? 'cursor-not-allowed' : 'cursor-pointer'
        }`}
      >
        {/* 체크박스 아이콘 변경하기 */}
        <svg
          className="stroke-white opacity-0 group-data-[checked]:opacity-100"
          viewBox="0 0 14 14"
          fill="none"
        >
          <path d="M3 8L6 11L11 3.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </HeadlessUiCheckbox>
      <span
        className={`ml-2 text-slate-600 ${getLabelSizeStyles(label)} ${disabled ? 'opacity-50' : ''}`}
      >
        {labelText}
      </span>
    </div>
  );
};

export default Checkbox;
