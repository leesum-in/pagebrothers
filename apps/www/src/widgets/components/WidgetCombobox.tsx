'use client';

import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from '@headlessui/react';
import type { ChangeEvent } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

interface WidgetComboboxProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onClose: () => void;
}

function WidgetCombobox({ options, value, onChange, onInputChange, onClose }: WidgetComboboxProps) {
  return (
    <Combobox value={value} onChange={onChange} onClose={onClose}>
      <div className="relative">
        <ComboboxButton className="w-full">
          <label className="relative flex items-center overflow-hidden rounded-md border bg-white focus-within:ring border-slate-200">
            <div className="flex flex-none items-center" />

            <ComboboxInput
              className="peer block h-12 w-full bg-white px-4 text-slate-600 placeholder:text-slate-300 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-200"
              displayValue={(option: string) => option}
              spellCheck={false}
              autoComplete="off"
              type="text"
              onChange={onInputChange}
            />
            <div className="flex flex-none items-center">
              <div className="center-flex absolute right-0 px-2 text-slate-400">
                <IoIosArrowDown className="text-xl" />
              </div>
            </div>
          </label>
        </ComboboxButton>
        <div className="opacity-100">
          <ComboboxOptions
            portal={false}
            modal={false}
            transition
            className="absolute top-14 z-10 max-h-40 min-w-full max-w-xs overflow-auto whitespace-nowrap rounded-md border border-slate-200 bg-white py-1.5 shadow-xl"
            as="ul"
          >
            {options.map((option) => (
              <ComboboxOption key={option} value={option}>
                <div className="flex cursor-pointer items-center py-1.5 px-4 text-bold bg-slate-10">
                  {option}
                </div>
              </ComboboxOption>
            ))}
          </ComboboxOptions>
        </div>
      </div>
    </Combobox>
  );
}

export default WidgetCombobox;
