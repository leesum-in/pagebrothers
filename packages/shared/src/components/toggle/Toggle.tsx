import { useState } from 'react';
import { cn } from '../../utils';
import { Label } from '..';

interface ToggleProps {
  label?: 'left' | 'right' | 'none';
  toggled?: boolean;
  disabled?: boolean;
  labelText?: string;
  onChange?: (checked: boolean) => void;
  className?: string;
}

export default function Toggle({
  label = 'none',
  toggled: controlledToggled,
  disabled = false,
  labelText = '',
  onChange,
  className,
}: ToggleProps) {
  const [internalToggled, setInternalToggled] = useState(false);

  const isControlled = controlledToggled !== undefined;
  const isToggled = isControlled ? controlledToggled : internalToggled;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    if (!isControlled) {
      setInternalToggled(isChecked);
    }

    onChange?.(isChecked);
  };

  return (
    <div className={cn('flex items-center', { 'cursor-not-allowed': disabled }, className)}>
      {label === 'left' && labelText ? <Label label={labelText} className="mr-5" /> : null}
      <label
        aria-label="Toggle Button"
        className={cn('center-flex relative flex cursor-pointer gap-2 text-sm leading-5', {
          'opacity-50 cursor-not-allowed': disabled,
        })}
      >
        <input
          type="checkbox"
          checked={isToggled}
          onChange={handleChange}
          disabled={disabled}
          className="no-interaction peer absolute flex-none opacity-0"
        />

        <div
          className={cn(
            'relative h-6 w-12 rounded-full border border-slate-200 bg-slate-100 transition-[background-color]',
            'after:ml-[-1px] after:mt-[-1px] after:block after:h-6 after:w-6 after:rounded-full',
            'after:border after:border-slate-300 after:bg-white after:transition-[background-color,transform]',
            'peer-checked:border-indigo-600 peer-checked:bg-indigo-600 peer-checked:after:translate-x-full',
            'peer-checked:after:border-indigo-600 peer-focus:ring',
          )}
        />
      </label>
      {label === 'right' && labelText ? <Label label={labelText} className="ml-5" /> : null}
    </div>
  );
}
