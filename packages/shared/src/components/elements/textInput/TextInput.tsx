import React, { useState } from 'react';

type TextInputProps = {
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
  icon?: boolean;
  button?: boolean;
  showLabel?: boolean;
  label?: string;
  buttonText?: string;
  placeholder?: string;
};

const TextInput: React.FC<TextInputProps> = ({
  error = false,
  errorText = '피드백이나 부가 설명이 들어갑니다.',
  disabled = false,
  icon = false,
  button = false,
  showLabel = true,
  label = '레이블',
  buttonText = '버튼',
  placeholder = '텍스트 인풋',
}) => {
  const [focused, setFocused] = useState(false);

  const inputClassName = `
    mt-3 block w-full rounded py-1.5 px-3 border text-sm text-slate-600 leading-6 caret-indigo-700
    ${disabled ? ' outline-2 border-red-500 cursor-not-allowed' : 'bg-white/5 text-white'}
    ${focused && !disabled ? 'outline-2 outline-indigo-700 border-none' : ''}
    ${error ? 'outline-2 border-red-500' : ''}
    ${!error && !focused && !disabled ? 'border-none focus:outline-none' : ''}
    ${icon ? 'pl-10' : ''}
    ${button ? 'pr-16' : ''}
  `;

  return (
    <div className="w-full max-w-md px-4">
      <div className="flex flex-col">
        {showLabel && <label className={`text-sm font-medium `}>{label}</label>}
        <div className="relative mt-3">
          {icon && <span className="absolute top-5 left-3 text-gray-400">🔍</span>}
          <input
            className={inputClassName}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            placeholder={placeholder}
          />
          {button && (
            <button
              className="absolute text-sm top-[30px] right-1 transform -translate-y-1/2 bg-none text-slate-900 font-bold px-3 py-1.5"
              disabled={disabled}
            >
              {buttonText}
            </button>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{errorText}</p>}
      </div>
    </div>
  );
};

export default TextInput;
