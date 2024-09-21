import { Checkbox as HeadlessUiCheckbox } from '@headlessui/react';
import { useState } from 'react';

interface CheckboxProps {
  label: 'small' | 'large' | 'none';
  checked?: boolean;
  disabled?: boolean;
  labelText?: string;
}

const Checkbox = ({
  label,
  checked = false,
  disabled = false,
  labelText = '레이블',
}: CheckboxProps) => {
  const [enabled, setEnabled] = useState(checked);

  const handleChange = (value: boolean) => {
    if (!disabled) {
      setEnabled(value);
    }
  };

  // default, disabled, checked & disabled 상태별 스타일
  const checkboxStateStyles = disabled
    ? checked
      ? 'bg-indigo-100 border-none'
      : 'bg-slate-50 border-[0.1rem] border-slate-100'
    : checked
      ? 'bg-indigo-500 border-none'
      : 'border-[0.1rem] border-slate-200';

  // 각 사이즈별 체크박스 스타일
  const checkboxSizeStyles =
    label === 'small'
      ? 'w-[1.125rem] h-[1.125rem] border-[0.1rem] rounded-[0.25rem] gap-0'
      : label === 'large'
        ? 'w-[1.25rem] h-[1.25rem] border-[0.1rem] rounded-[0.25rem] gap-0'
        : 'w-[1.5rem] h-[1.5rem] border-[0.1rem] rounded-[0.25rem] gap-0';

  // 각 사이즈별 텍스트 스타일
  const labelSizeStyles =
    label === 'small'
      ? 'text-[0.875rem] font-normal leading-[1.4rem] tracking-[-0.02em] text-justify'
      : label === 'large'
        ? 'text-[1rem] font-normal leading-[1.6rem] tracking-[-0.02em] text-justify'
        : 'hidden';

  const labelOpacity = disabled ? 'opacity-50' : '';

  return (
    <div className="flex items-center">
      <HeadlessUiCheckbox
        checked={enabled}
        onChange={handleChange}
        disabled={disabled}
        // ============== cva, clsx 설치 후 tailwind css custom 방식으로 수정 필요 ===============
        className={`group block ${checkboxSizeStyles} ${checkboxStateStyles} ${
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
      <span className={`ml-2 text-slate-600 ${labelSizeStyles} ${labelOpacity}`}>{labelText}</span>
    </div>
  );
};

export default Checkbox;
