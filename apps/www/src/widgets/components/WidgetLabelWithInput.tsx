'use client';

import { cn } from '@repo/shared';
import type { RegisterOptions, UseFormRegister } from 'react-hook-form';

import type { HookFormValues } from '@/www/widgets/types';

interface WidgetLabelWithInputProps {
  defaultValue?: string;
  register?: UseFormRegister<HookFormValues>;
  registerOption?: string | { name: string; options: RegisterOptions<HookFormValues> };
  isTextarea?: boolean;
  inputType?: string;
  inputValue?: string;
  inputChecked?: boolean;
  inputDefaultChecked?: boolean;
  children?: React.ReactNode;
  labelClassName?: string;
  textareaClassName?: string;
  inputClassName?: string;
  onInputClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onInputChange?: (
    e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  readonly?: boolean;
  placeholder?: string;
  textareaPlaceholder?: string;
  id?: string;
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
  id,
}: WidgetLabelWithInputProps) {
  if (!register) {
    throw new Error('register is required');
  }
  return (
    <label className={labelClassName}>
      <div className="flex items-center" />
      {isTextarea ? (
        <textarea
          id={id}
          className={cn(
            'block w-full resize-none bg-white px-4 py-3 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-300',
            textareaClassName,
          )}
          spellCheck="false"
          autoComplete="off"
          defaultValue={defaultValue}
          rows={3}
          placeholder={textareaPlaceholder}
          {...(typeof registerOption === 'string'
            ? register(registerOption as keyof HookFormValues)
            : register(
                registerOption!.name as keyof HookFormValues,
                registerOption!.options as RegisterOptions<HookFormValues, keyof HookFormValues>,
              ))}
          onChange={onInputChange as (e: React.ChangeEvent<HTMLTextAreaElement>) => void}
        />
      ) : (
        <input
          id={id}
          className={inputClassName}
          type={inputType}
          spellCheck={inputType === 'text' ? true : undefined}
          autoComplete={inputType === 'text' ? 'off' : undefined}
          value={inputValue}
          defaultValue={defaultValue}
          checked={inputChecked}
          defaultChecked={inputDefaultChecked}
          onClick={onInputClick as (e: React.MouseEvent<HTMLInputElement>) => void}
          {...(typeof registerOption === 'string'
            ? register(registerOption as keyof HookFormValues)
            : register(
                registerOption!.name as keyof HookFormValues,
                registerOption!.options as RegisterOptions<HookFormValues, keyof HookFormValues>,
              ))}
          onChange={
            typeof registerOption === 'string'
              ? (onInputChange as (e: React.ChangeEvent<HTMLInputElement>) => void)
              : undefined
          }
          readOnly={readonly}
          placeholder={placeholder}
        />
      )}
      {children}
    </label>
  );
}

export default WidgetLabelWithInput;
