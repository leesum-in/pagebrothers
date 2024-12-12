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
}

function useCombobox({ options }: UseComboboxProps) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState(options[0]);

  const filteredOptions = useMemo(
    () =>
      query === ''
        ? options
        : options.filter((option) => {
            return option.toLowerCase().includes(query.toLowerCase());
          }),
    [query, options],
  );

  const handleChangeCombobox = useCallback((value: string) => {
    setSelected(value);
  }, []);

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
      />
    );
  }, [
    selected,
    handleChangeCombobox,
    handleChangeComboboxInput,
    handleCloseCombobox,
    filteredOptions,
  ]);

  return { selected, Combobox };
}

export default useCombobox;
