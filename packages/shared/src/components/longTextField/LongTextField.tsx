'use client';

import { useState } from 'react';
import { Description, Label } from '..';
import { cn } from '../../utils';

interface LongTextFieldProps {
  status: 'default' | 'error';
  disabled?: boolean;
  label?: boolean;
  labelText?: string;
  description?: boolean;
  descriptionText?: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function LongTextField({
  status = 'default',
  disabled = false,
  label = true,
  labelText = '',
  description = true,
  descriptionText = '',
  placeholder = '',
  value: controlledValue,
  onChange,
  className,
}: LongTextFieldProps) {
  const [internalValue, setInternalValue] = useState('');

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    onChange?.(newValue);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <Label label={labelText} />}
      <textarea
        className={cn(
          'w-full h-[8rem] p-4 rounded-md border resize-none text-slate-600',
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
      {description && (
        <Description
          state={status === 'error' ? 'error' : 'normal'}
          description={descriptionText}
        />
      )}
    </div>
  );
}
