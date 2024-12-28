import { ReactNode } from 'react';

interface RsvpLabelWithInputProps {
  placeholder: string;
  name: string;
  children?: ReactNode;
  readOnly?: boolean;
  type?: 'text' | 'number';
  defaultValue?: number;
}

function RsvpLabelWithInput({
  placeholder,
  name,
  children,
  readOnly = false,
  type = 'text',
  defaultValue,
}: RsvpLabelWithInputProps) {
  return (
    <label className="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200 flex-1">
      <div className="flex flex-none items-center">{children}</div>
      <input
        className="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200 "
        spellCheck={false}
        autoComplete="off"
        placeholder={placeholder}
        readOnly={readOnly}
        required
        name={name}
        type={type}
        min={type === 'number' ? 1 : undefined}
        max={type === 'number' ? 100 : undefined}
        defaultValue={defaultValue}
      />
      <div className="flex flex-none items-center"></div>
    </label>
  );
}

export default RsvpLabelWithInput;
