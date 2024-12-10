'use client';

import { useState } from 'react';
import { Label } from '..';
import CheckIcon from '../../assets/icons/CheckIcon';
import { cn } from '../../utils';

interface CheckboxProps {
  label?: 'small' | 'large' | 'none';
  checked?: boolean;
  disabled?: boolean;
  labelText?: string;
  onChange?: (checked: boolean) => void;
  className?: string;
  isSpan?: boolean;
}

const sizeClass: Record<'small' | 'large' | 'none', string> = {
  small: 'w-4 h-4 rounded-sm',
  large: 'w-6 h-6 rounded-sm',
  none: 'w-5 h-5 rounded-sm',
};

const getTextStyle = (label: 'small' | 'large' | 'none') => {
  switch (label) {
    case 'small':
      return 'text-xs';
    case 'large':
      return 'text-lg';
    default:
      return 'text-sm';
  }
};

export default function Checkbox({
  label = 'none',
  checked: controlledChecked,
  disabled = false,
  labelText = '',
  onChange,
  className,
  isSpan = false,
}: CheckboxProps) {
  const [internalChecked, setInternalChecked] = useState(false);

  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : internalChecked;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    if (!isControlled) {
      setInternalChecked(checked);
    }

    onChange?.(checked);
  };

  const selectedSizeClass = sizeClass[label];

  return (
    <label
      aria-label="Checkbox"
      className={cn(
        'relative flex cursor-pointer items-center gap-2 text-sm text-slate-600',
        { 'opacity-50 cursor-not-allowed': disabled },
        className,
      )}
    >
      <input
        name="isConfirmed"
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        className="no-interaction peer absolute flex-none opacity-0"
      />

      <div
        className={cn(
          'center-flex flex-none border border-slate-200 bg-white text-transparent peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:text-white peer-focus:ring peer-disabled:bg-slate-100',
          selectedSizeClass,
        )}
      >
        <CheckIcon className="text-base" />
      </div>

      {isSpan ? (
        <span className="flex-1 text-slate-400 peer-checked:text-current peer-disabled:text-slate-300">
          {labelText}
        </span>
      ) : (
        <Label label={labelText} className={`ml-2 ${getTextStyle(label)}`} />
      )}
    </label>
  );
}
