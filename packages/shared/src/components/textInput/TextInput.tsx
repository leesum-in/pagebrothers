'use client';

import { useState } from 'react';
import { Description, Label } from '..';
import { cn } from '../../utils';

interface TextInputProps {
  status: 'default' | 'error';
  description?: boolean;
  descriptionText?: string;
  disabled?: boolean;
  leftAddOn?: React.ReactNode;
  rightAddOn?: React.ReactNode;
  label?: boolean;
  labelText?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

function TextInput({
  status = 'default',
  description = false,
  descriptionText = '',
  disabled = false,
  leftAddOn,
  rightAddOn,
  label = false,
  labelText = '',
  placeholder = '',
  value: controlledValue,
  onChange,
  className,
}: TextInputProps) {
  const [internalValue, setInternalValue] = useState('');

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(value);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <Label label={labelText} />}
      <div className="relative">
        {leftAddOn && <div className="absolute left-3 flex items-center">{leftAddOn}</div>}
        <input
          className={cn(
            'block w-full h-[3rem] px-4 rounded-md border text-slate-600',
            leftAddOn && 'pl-10',
            rightAddOn && 'pr-10',
            disabled
              ? 'bg-slate-100 border-slate-200 text-slate-300'
              : 'bg-white border-slate-200 focus:ring',
            status === 'error' && 'border-red-500',
            className,
          )}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          disabled={disabled}
        />
        {rightAddOn && <div className="absolute right-3 flex items-center">{rightAddOn}</div>}
      </div>
      {description && (
        <Description
          state={status === 'error' ? 'error' : 'normal'}
          description={descriptionText}
        />
      )}
    </div>
  );
}

export default TextInput;
