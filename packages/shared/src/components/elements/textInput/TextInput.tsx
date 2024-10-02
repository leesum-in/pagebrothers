import { ReactNode, useState } from 'react';
// import { LeftAddOnHttpButton, LeftAddOnSearchIcon } from '../textInputLeftAddOn';
// import {
//   RightAddOnArrowIcon,
//   RightAddOnButton,
//   RightAddOnCalendarIcon,
//   RightAddOnTimeDisplay,
//   RightAddOnUnit,
// } from '../textInputRightAddOn';

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
  iconType?: 'search' | 'http';
  rightAddOnType?: 'arrow' | 'button' | 'calendar' | 'time' | 'unit'; // Right add-on 타입 추가
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
  iconType = 'search',
  rightAddOnType = 'arrow', // 기본 right add-on은 arrow로 설정
}) => {
  const [focused, setFocused] = useState(false);

  const inputClassName = `
    block w-full rounded pl-[48px] pr-[56px] border text-sm text-slate-600 leading-6 caret-indigo-700 h-[48px]
    ${disabled ? ' outline-2 border-red-500 cursor-not-allowed' : 'bg-white/5'}
    ${focused && !disabled ? 'outline-2 outline-indigo-700 border-none' : ''}
    ${error ? 'outline-2 border-red-500' : ''}
    ${!error && !focused && !disabled ? 'border-none focus:outline-none' : ''}
  `;

  return (
    <div className="w-full max-w-md px-4">
      <div className="flex flex-col">
        {showLabel && <label className={`text-sm font-medium `}>{label}</label>}
        <div className="relative mt-3">
          {/* Left Add-On: 48px 너비 */}
          {icon && iconType === 'search' && (
            <span className="absolute top-0 left-0 w-[48px] h-full flex items-center justify-center text-gray-400">
              <LeftAddOnSearchIcon />
            </span>
          )}
          {icon && iconType === 'http' && (
            <span className="absolute top-0 left-0 w-[48px] h-full flex items-center justify-center">
              <LeftAddOnHttpButton />
            </span>
          )}

          {/* Input 필드 */}
          <input
            className={inputClassName}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            disabled={disabled}
            placeholder={placeholder}
          />

          {/* Right Add-On: button이 true일 경우에만 렌더링 */}
          {button && (
            <span className="absolute top-0 right-0 w-[56px] h-full flex items-center justify-center">
              {rightAddOnType === 'arrow' && <RightAddOnArrowIcon />}
              {rightAddOnType === 'button' && <RightAddOnButton />}
              {rightAddOnType === 'calendar' && <RightAddOnCalendarIcon />}
              {rightAddOnType === 'time' && <RightAddOnTimeDisplay />}
              {rightAddOnType === 'unit' && <RightAddOnUnit />}
            </span>
          )}
        </div>
        {error && <p className="mt-2 text-sm text-red-500">{errorText}</p>}
      </div>
    </div>
  );
};

export default TextInput;
