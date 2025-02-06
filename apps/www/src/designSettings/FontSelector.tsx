'use client';

import type { SelectorProps } from './DesignSelector';

export default function FontSelector({
  value,
  onChange,
}: SelectorProps<'sans' | 'serif' | 'gowun'>) {
  const fonts = [
    { value: 'sans', label: '프리텐다드', className: 'font-sans' },
    { value: 'serif', label: '노토 세리프', className: 'font-serif' },
    { value: 'gowun', label: '고운 바탕', className: 'font-gowun' },
  ];

  return (
    <li className="space-y-1">
      <p className="font-bold">Font</p>
      <div className="flex items-center rounded-lg border border-slate-200 bg-slate-100 p-1 text-sm h-10">
        {fonts.map((font) => (
          <label
            key={font.value}
            aria-label={`Select ${font.value} color scheme`}
            className="group relative flex-1 cursor-pointer text-center h-8"
          >
            <input
              type="radio"
              className="peer absolute cursor-pointer opacity-0"
              name="design.font"
              value={font.value}
              checked={value === font.value}
              onChange={() => {
                onChange(font.value as 'sans' | 'serif' | 'gowun');
              }}
            />
            <span className="center-flex h-full w-full rounded-md text-slate-500 peer-checked:border peer-checked:border-slate-200 peer-checked:bg-white peer-checked:font-bold peer-checked:text-slate-600">
              <span className={`text-sm ${font.className}`}>{font.label}</span>
            </span>
          </label>
        ))}
      </div>
    </li>
  );
}
