import { ReactNode, useState } from 'react';

interface TextInputProps {
  error?: boolean;
  errorText?: string;
  // error가 description
  disabled?: boolean;
  leftAddOn?: ReactNode;
  rightAddOn?: ReactNode;
  label?: boolean;
  labelText?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}

const TextInput = ({
  error = false,
  errorText = '피드백이나 부가 설명이 들어갑니다.',
  disabled = false,
  leftAddOn,
  rightAddOn,
  label = true,
  labelText = '레이블',
  placeholder = '텍스트 인풋',
  value,
  onChange,
}: TextInputProps) => {
  const [focused, setFocused] = useState(false);

  const inputClassName = `
    block w-full rounded pl-[48px] pr-[56px] border text-sm text-slate-600 leading-6 caret-indigo-700 h-[48px]
    ${disabled ? ' outline-2 border-red-500 cursor-not-allowed' : 'bg-white/5'}
    ${focused && !disabled ? 'outline-2 outline-indigo-700 border-none' : ''}
    ${error ? 'outline-2 border-red-500' : ''}
    ${!error && !focused && !disabled ? 'border-none focus:outline-none' : ''}
    hover:shadow-[0_4px_12px_0_rgba(19,32,57,0.1),_0_8px_20px_0_rgba(19,32,57,0.03)]
  `;

  return (
    <div className="w-full max-w-md px-4">
      <div className="flex flex-col">
        {label && <label className={`text-sm font-medium `}>{labelText}</label>}
        <div className="relative mt-3">
          {leftAddOn && (
            <span className="absolute top-0 left-0 w-[48px] h-full flex items-center justify-center">
              {leftAddOn}
            </span>
          )}

          <input
            className={inputClassName}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            placeholder={placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />

          {rightAddOn && (
            <span className="absolute top-0 right-0 w-[56px] h-full flex items-center justify-center">
              {rightAddOn}
            </span>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{errorText}</p>}
      </div>
    </div>
  );
};

export default TextInput;
