'use client';

import type { Size } from '@repo/shared';

import type { SelectorProps } from './DesignSelector';

export default function TextSizeSelector({ value, onChange }: SelectorProps<Size>) {
  const sizes = [
    { value: 'sm', className: 'text-[0.75rem]' },
    { value: 'md', className: 'text-[0.875rem]' },
    { value: 'lg', className: 'text-[1rem]' },
  ];

  return (
    <li className="space-y-1">
      <p className="font-bold">Text Size</p>
      <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-1 text-sm h-10">
        {sizes.map((size) => (
          <label
            key={size.value}
            aria-label={`Select ${size.value} color scheme`}
            className="group relative flex-1 cursor-pointer text-center h-8"
          >
            <input
              type="radio"
              className="peer absolute cursor-pointer opacity-0"
              name="design.textSize"
              value={size.value}
              checked={value === size.value}
              onChange={() => {
                onChange(size.value as 'sm' | 'md' | 'lg');
              }}
            />
            <span className="center-flex h-full w-full rounded-md text-slate-500 peer-checked:border peer-checked:border-slate-200 peer-checked:bg-white peer-checked:font-bold peer-checked:text-slate-600">
              <span className={size.className}>가A</span>
            </span>
          </label>
        ))}
      </div>
    </li>
  );
}
