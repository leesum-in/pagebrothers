'use client';

import { cn } from '@repo/shared';
import { type UseFormRegister } from 'react-hook-form';

import type { HookFormValues } from '@/www/widgets/types';

interface WidgetLabelWithInputProps {
  defaultValue?: string;
  register?: UseFormRegister<HookFormValues>;
  registerOption?: string;
  isTextarea?: boolean;
  inputType?: string;
  inputValue?: string;
  inputChecked?: boolean;
  inputDefaultChecked?: boolean;
  children?: React.ReactNode;
  labelClassName?: string;
  textareaClassName?: string;
  inputClassName?: string;
  onInputClick?: () => void;
  onInputChange?: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  readonly?: boolean;
  placeholder?: string;
  textareaPlaceholder?: string;
}

function WidgetLabelWithInput({
  defaultValue,
  register,
  registerOption,
  isTextarea = false,
  inputType = 'text',
  inputValue,
  inputChecked,
  inputDefaultChecked,
  children,
  labelClassName,
  textareaClassName,
  inputClassName,
  onInputClick,
  onInputChange,
  readonly = false,
  placeholder,
  textareaPlaceholder,
}: WidgetLabelWithInputProps) {
  return (
    <label className={labelClassName}>
      <div className="flex items-center" />
      {isTextarea ? (
        <textarea
          className={cn(
            'block w-full resize-none bg-white px-4 py-3 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-300',
            textareaClassName,
          )}
          spellCheck="false"
          autoComplete="off"
          defaultValue={defaultValue}
          rows={3}
          placeholder={textareaPlaceholder}
          {...(register ? register(registerOption as keyof HookFormValues) : undefined)}
          onChange={onInputChange}
        />
      ) : (
        <input
          className={inputClassName}
          type={inputType}
          spellCheck={inputType === 'text' ? true : undefined}
          autoComplete={inputType === 'text' ? 'off' : undefined}
          value={inputValue}
          defaultValue={defaultValue}
          checked={inputChecked}
          defaultChecked={inputDefaultChecked}
          onClick={onInputClick}
          onChange={onInputChange}
          {...(register ? register(registerOption as keyof HookFormValues) : undefined)}
          readOnly={readonly}
          placeholder={placeholder}
        />
      )}
      {children}
    </label>
  );
}

export default WidgetLabelWithInput;
