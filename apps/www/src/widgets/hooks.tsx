'use client';

import type { IInvitation, WidgetItem } from '@repo/shared';
import { format, isSameDay } from 'date-fns';
import type { ChangeEvent, Dispatch, SetStateAction } from 'react';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

import useModalStore from '@/www/widgets/zustand';

import WidgetCombobox from './components/WidgetCombobox';
import { getCombinedDateTime, getWidgetIndex } from './utils';

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
  isInputError?: boolean;
}

export function useCombobox({
  options,
  isRounded = true,
  initialSelected,
  placeholder,
  customOnChange,
  isInputError = false,
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
        isInputError={isInputError}
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
    isInputError,
  ]);

  return { selected, Combobox };
}

const InputErrorContext = createContext<{
  isInputError: number;
  setIsInputError: Dispatch<SetStateAction<number>>;
} | null>(null);

const initialInputErrorContext = {
  isInputError: 0,
  setIsInputError: () => {},
};

export function useInputErrorContext() {
  return useContext(InputErrorContext) ?? initialInputErrorContext;
}

export function InputErrorProvider({ children }: { children: React.ReactNode }) {
  const [isInputError, setIsInputError] = useState<number>(0);
  return (
    <InputErrorContext.Provider value={{ isInputError, setIsInputError }}>
      {children}
    </InputErrorContext.Provider>
  );
}

interface UseCalendarSelectionProps {
  invitation: IInvitation;
  setValue: (name: string, value: string) => void;
}

export function useCalendarSelection({ invitation, setValue }: UseCalendarSelectionProps) {
  const [selectedDay, setSelectedDay] = useState<Date | undefined>(new Date(invitation.eventAt));
  const [selectedTime, setSelectedTime] = useState<Date | undefined>(new Date(invitation.eventAt));
  const [isTimeClicked, setIsTimeClicked] = useState<boolean>(false);

  const { closeMultiModal } = useModalStore();

  const handleOnChange = (date: Date | null) => {
    if (date) setSelectedDay(date);
  };

  const handleOnChangeTime = (date: Date | null) => {
    if (date) setSelectedTime(date);
    setIsTimeClicked(true);
  };

  const originDate = useMemo(() => {
    return getCombinedDateTime(new Date(invitation.eventAt), new Date(invitation.eventAt));
  }, [invitation]);

  const combinedDateTime = useMemo(() => {
    if (!selectedDay || !selectedTime) return;
    return getCombinedDateTime(selectedDay, selectedTime);
  }, [selectedDay, selectedTime]);

  useEffect(() => {
    const selectedTimeToCenter = document.querySelector(
      '.react-datepicker__time-list-item--selected',
    );
    if (selectedTimeToCenter) {
      selectedTimeToCenter.scrollIntoView({
        behavior: 'instant',
        block: 'center',
        inline: 'center',
      });
    }
  }, [selectedTime]);

  useEffect(() => {
    if (selectedDay && selectedTime && combinedDateTime) {
      const datesAreEqual = isSameDay(originDate, combinedDateTime);
      if (!datesAreEqual || !isTimeClicked) {
        const formatted = format(combinedDateTime, "yyyy-MM-dd'T'HH:mm:ss");
        setValue('invitation.eventAt', formatted);
        if (isTimeClicked) {
          closeMultiModal();
          return;
        }
      }
      if (isTimeClicked) {
        closeMultiModal();
      }
    }
  }, [
    selectedDay,
    selectedTime,
    setValue,
    closeMultiModal,
    isTimeClicked,
    originDate,
    combinedDateTime,
    invitation,
  ]);

  // useEffect(() => {
  //   return () => {
  //     if (!combinedDateTime) return;
  //     const formatted = format(combinedDateTime, "yyyy-MM-dd'T'HH:mm:ss");
  //     setValue('invitation.eventAt', formatted);
  //   };
  // }, [setValue, isTimeClicked, combinedDateTime]);

  return {
    selectedDay,
    selectedTime,
    handleOnChange,
    handleOnChangeTime,
    originDate,
    combinedDateTime,
  };
}
