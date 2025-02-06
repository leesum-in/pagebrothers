'use client';

import { COLOR_HIGHLIGHTS } from '@repo/shared';

import type { SelectorProps } from './DesignSelector';

export default function ColorSelector({
  value,
  onChange,
}: SelectorProps<keyof typeof COLOR_HIGHLIGHTS>) {
  return (
    <li className="space-y-1">
      <p className="font-bold">Color Scheme</p>
      <ul className="grid grid-cols-4 gap-1">
        {Object.entries(COLOR_HIGHLIGHTS).map(([colorName, theme]) => (
          <li key={colorName} className={`flex-none ${theme.join(' ')}`}>
            <label
              aria-label={`Select ${colorName} color scheme`}
              className="block cursor-pointer text-center"
            >
              <input
                type="radio"
                className="peer hidden"
                name="design.brandColor"
                value={colorName}
                checked={value === colorName}
                onChange={() => {
                  onChange(colorName);
                }}
              />
              <div className="space-y-2 rounded-sm pt-3 pb-2 peer-checked:bg-white peer-checked:shadow-violet peer-checked:ring-slate-200">
                <div className="mx-auto flex h-8 w-8 rotate-45 flex-col overflow-hidden rounded-full border border-theme-colored bg-white shadow-md">
                  <div className="h-full w-full bg-theme-colored/10" />
                  <div className="h-full w-full bg-theme-inter/70" />
                  <div className="h-full w-full bg-theme-black/60" />
                </div>
                <p className="scale-90 whitespace-nowrap text-xs font-bold leading-none tracking-wider text-theme-colored">
                  {colorName.toUpperCase()}
                </p>
              </div>
            </label>
          </li>
        ))}
      </ul>
    </li>
  );
}
