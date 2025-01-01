'use client';

import type { WidgetItem } from '@repo/shared';
import type { ChangeEvent } from 'react';
import { useCallback, useMemo, useState } from 'react';

import useModalStore from '@/www/widgets/zustand';

import WidgetCombobox from './components/WidgetCombobox';
import { getWidgetIndex } from './utils';

export function useWidgetIndex(widgetItem: WidgetItem | Omit<WidgetItem, 'id'>) {
  const { invitation } = useModalStore();
  return useMemo(() => getWidgetIndex(invitation, widgetItem), [invitation, widgetItem]);
}

interface UseComboboxProps {
  options: string[];
  isRounded?: boolean;
  initialSelected?: string;
  placeholder?: string;
  customOnChange?: (value: string) => void;
}

function useCombobox({
  options,
  isRounded = true,
  initialSelected,
  placeholder,
  customOnChange,
}: UseComboboxProps) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(
    initialSelected === undefined ? options[0] : initialSelected,
  );

  const filteredOptions = useMemo(
    () =>
      query === ''
        ? options
        : options.filter((option) => {
            return option.toLowerCase().includes(query.toLowerCase());
          }),
    [query, options],
  );

  const handleChangeCombobox = useCallback(
    (value: string) => {
      setSelected(value);
      customOnChange?.(value);
    },
    [customOnChange],
  );

  const handleChangeComboboxInput = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  }, []);

  const handleCloseCombobox = useCallback(() => {
    setQuery('');
  }, []);

  const Combobox = useCallback(() => {
    return (
      <WidgetCombobox
        options={filteredOptions}
        value={selected}
        onChange={handleChangeCombobox}
        onInputChange={handleChangeComboboxInput}
        onClose={handleCloseCombobox}
        isRounded={isRounded}
        placeholder={placeholder}
      />
    );
  }, [
    selected,
    handleChangeCombobox,
    handleChangeComboboxInput,
    handleCloseCombobox,
    filteredOptions,
    isRounded,
    placeholder,
  ]);

  return { selected, Combobox };
}

export default useCombobox;
