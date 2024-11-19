'use client';

import { useState } from 'react';
import { cn } from '../../utils';
import { Label } from '..';

interface RadioProps {
  label?: 'small' | 'large' | 'none';
  selected?: boolean;
  disabled?: boolean;
  labelText?: string;
  onChange?: (value: boolean) => void;
  className?: string;
}

// 라벨별 스타일
const getRadioStateStyle = (label: 'small' | 'large' | 'none') => {
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

// 라벨별 라벨 텍스트 스타일
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

export default function Radio({
  label = 'none',
  selected: controlledSelected,
  disabled = false,
  labelText = '',
  onChange,
  className,
}: RadioProps) {
  const [internalSelected, setInternalSelected] = useState(false);

  const isControlled = controlledSelected !== undefined;
  const isSelected = isControlled ? controlledSelected : internalSelected;

  const handleClick = () => {
    if (disabled) return;
    if (!isControlled) {
      setInternalSelected(!isSelected);
    }
    onChange?.(!isSelected);
  };

  return (
    <div
      className={cn(
        'flex items-center cursor-pointer',
        { 'opacity-50 cursor-not-allowed': disabled },
        className,
      )}
      onClick={handleClick}
      aria-label="Radio Button"
    >
      <div
        className={cn('relative flex items-center justify-center', getRadioStateStyle(label), {
          'cursor-not-allowed': disabled,
          'cursor-pointer': !disabled,
        })}
      >
        {isSelected && (
          <div
            className={cn(
              'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2',
              getSelectedCircleStyle(label),
              { 'bg-slate-200': disabled, 'bg-indigo-500': !disabled },
            )}
          />
        )}
      </div>
      <Label
        label={labelText}
        className={cn('text-p1 ml-[0.5rem] text-slate-600', getTextStyle(label))}
      />
    </div>
  );
}
