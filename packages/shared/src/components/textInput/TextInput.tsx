import type { ReactNode } from 'react';
import { useState } from 'react';
import { cn } from '../../utils';

interface TextInputProps {
  description?: boolean;
  descriptionText?: string;
  disabled?: boolean;
  leftAddOn?: ReactNode;
  rightAddOn?: ReactNode;
  label?: boolean;
  labelText?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

function TextInput({
  description = false,
  descriptionText = '피드백이나 부가 설명이 들어갑니다.',
  disabled = false,
  leftAddOn,
  rightAddOn,
  label = true,
  labelText = '레이블',
  placeholder = '텍스트 인풋',
  value,
  onChange,
  className,
}: TextInputProps) {
  const [focused, setFocused] = useState(false);

  const inputClassName = cn(
    'block w-full rounded pl-[3rem] pr-[3.5rem] border text-p1 text-slate-600 leading-6 caret-indigo-700 h-[3rem]',
    description ? 'border-red-500' : 'border-slate-200',
    disabled ? 'cursor-not-allowed bg-gray-100' : '',
    focused && !disabled ? 'outline-2 outline-indigo-700 border-indigo-700' : '',
    'hover:shadow-[0_4px_12px_0_rgba(19,32,57,0.1),_0_8px_20px_0_rgba(19,32,57,0.03)]',
    className,
  );

  return (
    <div className="w-full max-w-md px-4">
      <div className="flex flex-col">
        {label ? <label className="text-sm font-medium">{labelText}</label> : null}
        <div className="relative mt-3">
          {leftAddOn ? (
            <span className="absolute top-0 left-0 w-[3rem] h-full flex items-center justify-center">
              {leftAddOn}
            </span>
          ) : null}

          <input
            className={inputClassName}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />

          {rightAddOn ? (
            <span className="absolute top-0 right-0 w-[3.5rem] h-full flex items-center justify-center">
              {rightAddOn}
            </span>
          ) : null}
        </div>
        {description ? <p className="mt-2 text-p2 text-red-500">{descriptionText}</p> : null}
      </div>
    </div>
  );
}

export default TextInput;
